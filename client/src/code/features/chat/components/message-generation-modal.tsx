import Dialog from '@mui/material/Dialog';
import {BaseDialogProps} from '@/shared/models/props.model';
import {Button, DialogActions, DialogContent} from '@mui/material';
import Input from '@/shared/ui/Input';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SCHEMAS} from '@/validation/schemas';
import {useTranslations} from 'next-intl';
import OpenAI from 'openai';
import {Message} from '@/store/chat/types';
import {useAppSelector} from '@/store/store';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from 'react';

const client = new OpenAI({
   maxRetries: 0,
   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
   dangerouslyAllowBrowser: true
});

export function MessageGenerationModal({onClose, isOpen, onSent, messages}: BaseDialogProps & {
   messages: Message[];
   onSent: (message: string) => void
}) {
   const t = useTranslations();
   const [isMessageGenerated, setIsMessageGenerated] = useState(false);
   const {user} = useAppSelector(state => state.auth);
   
   const {control, watch, setError, reset, setValue, handleSubmit, getValues} = useForm({
      resolver: yupResolver(SCHEMAS(t).generateMessage),
      defaultValues: {
         messageLimit: 0,
         instructions: '',
         generatedMessage: '',
      },
   });
   
   async function onGenerateMessage() {
      const {messageLimit, instructions} = getValues();
      // const chatCompletion = await client.chat.completions.create({
      //    model: 'gpt-4o-mini',
      //    messages: [
      //       {role: 'developer', content: 'You are a meant to analyze the conversation and summarize it in friendly and insightful manner.'},
      //       {role: 'user', content: generatePrompt(messageLimit ?? 1, instructions)},
      //    ],
      //    max_completion_tokens: 300,
      // });
      setValue('generatedMessage', /*chatCompletion.choices[0].message.content ??*/ 'test val');
      setIsMessageGenerated(true)
   }
   
   const generatePrompt = (messagesLimit: number, instructions = '') => {
      let context = 'Ось історія повідомлень:\n';
      messages.slice(-messagesLimit).forEach((msg, index) => {
         context += `${index + 1}. Дата - ${msg.date.toString()}. Автор ${msg.author.username === user?.username ? 'Я' : msg.author.username}: ${msg.content}\n`;
      });
      if (instructions) {
         context += `\nДодаткові інструкції: ${instructions}`;
      }
      context += '\n\nЗгенеруй відповідь для цього діалогу.';
      return context;
   };
   
   const generatedMessage = watch('generatedMessage');
   
   useEffect(() => {
      if (!generatedMessage) {
         setError('generatedMessage', {message: t('FieldError.required'), type: 'required'});
      }
   }, [generatedMessage]);
   
   return (
       <Dialog sx={{
          '& .MuiDialog-paper': {
             width: '100%',
          }
       }} open={isOpen} onClose={() => {
          onClose();
          setTimeout(() => {
             reset();
             setIsMessageGenerated(false);
          }, 300);
       }}>
          <DialogTitle>
             {isMessageGenerated ? 'Редагування повідомлення' : 'Генерація повідомлення'}
          </DialogTitle>
          <DialogContent className="gap-3 grid" sx={{pt: 0, pb: '5px'}}>
             {!isMessageGenerated ? (
                 <form>
                    <Input
                        control={control}
                        name="messageLimit"
                        type="number"
                        label="Кількість повідомлень (пусте значення = всі)"/>
                    <Input
                        multiline
                        control={control}
                        name="instructions"
                        type="number"
                        label="Додаткові інструкції"/>
                    <DialogActions>
                       <Button
                           variant="contained"
                           color="secondary"
                           fullWidth
                           onClick={handleSubmit(onGenerateMessage)}
                           className="mt-4 text-white font-bold bg-emerald-600 hover:bg-indigo-600"
                       >
                          {t('Common.generate')}
                       </Button>
                    </DialogActions>
                 </form>
             ) : (
                 <form>
                    <Input
                        control={control}
                        autoFocus
                        name="generatedMessage"
                        label="Фінальний варіант повідомлення"
                        multiline
                    />
                    <DialogActions>
                       <Button
                           onClick={handleSubmit(() => onSent(generatedMessage!))}
                           disabled={!generatedMessage}
                           variant="contained"
                           color="success"
                           className="mt-2 w-full bg-purple-500 hover:bg-purple-600"
                       >
                          {t('Common.send')}
                       </Button>
                    </DialogActions>
                 </form>
             )}
          </DialogContent>
       </Dialog>
   );
}

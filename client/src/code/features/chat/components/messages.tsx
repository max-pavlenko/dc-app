'use client';

import {FC, useEffect, useRef, useState} from 'react';
import Message from '@/code/features/chat/components/message';
import {Button, IconButton, Typography} from '@mui/material';
import {useAppSelector} from '@/store/store';
import {emitUserTypingMessage, sendDirectMessage} from '@/api/socket.io/connection';
import TextSeparator from '@/shared/ui/TextSeparator';
import AnimateVisibilityChange from '@/shared/ui/AnimateVisibilityChange';
import {getTimeFormatter} from '@/shared/utils/time';
import {SubmitHandler, useForm} from 'react-hook-form';
import Input from '@/shared/ui/Input';
import {useTranslations} from 'next-intl';
import {AutoAwesome} from '@mui/icons-material';
import {MessageGenerationModal} from '@/code/features/chat/components/message-generation-modal';
import { yupResolver } from '@hookform/resolvers/yup';
import {SCHEMAS} from '@/validation/schemas';

type Props = {};

const HEIGHTS = {
   NAVBAR: 48,
   PADDING_Y: 24,
   INPUT: 40,
   MARGIN_BETWEEN_INPUT: 8,
};

const Messages: FC<Props> = ({}) => {
   const {chat: {messages, chat: {friend, currentlyTypingData: {isTyping, username}}}} = useAppSelector(state => state);
   const t = useTranslations();
   const {handleSubmit, reset, control, watch} = useForm({
      defaultValues: {
         message: '',
      },
      resolver: yupResolver(SCHEMAS(t).sendMessage),
      mode: 'onSubmit',
   });
   const messagesListRef = useRef<HTMLDivElement>(null);
   const message = watch('message');
   const [isGenerateModalOpen, setIsGenerateMessageOpen] = useState(false);
   
   if (!friend) return null;
   
   useEffect(() => {
      if (messages.length === 0) return;
      messagesListRef.current?.scrollTo({behavior: 'smooth', top: messagesListRef.current.scrollHeight});
   }, [messages, length]);
   
   useEffect(() => {
      emitUserTypingMessage({friendID: friend.userID});
   }, [message]);
   
   const handleMessageSubmit: SubmitHandler<{ message: string }> = ({message}) => {
      sendDirectMessage({
         message: {
            receiverID: friend.userID,
            content: message,
         }
      });
   };
   
   return (
       <div className="py-3 w-full flex flex-col">
          <div ref={messagesListRef} style={{maxHeight: `calc(100vh - ${Object.values(HEIGHTS).reduce((prev, curr) => prev + curr, 0)}px`,}}
               className="flex overflow-y-auto flex-col flex-grow">
             <div className="mb-6 px-6">
                <Typography variant="h4" className="w-full font-bold">{friend.username}</Typography>
                <Typography className="text-[#b9bbbe]">
                   {t('Pages.Dashboard.beginningOfConversation', {
                      friend: friend.username
                   })}
                </Typography>
             </div>
             <AnimateVisibilityChange withScaling={false} isVisible={messages.length > 0}>
                <ul className="flex px-6 pb-4 flex-col gap-2">
                   {messages.map((message, i) => {
                      const date = new Date(message.date);
                      const formattedDate = getTimeFormatter({
                         weekday: 'short',
                         month: 'long',
                         day: 'numeric',
                         year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                      }).format(date);
                      const previousMessage = i > 0 && messages[i - 1];
                      const isMessageWrittenSameDayAsPrevious = previousMessage && date.toDateString() === new Date(previousMessage.date).toDateString();
                      const writtenBySameAuthorAsPrevious = previousMessage && message.author.username === previousMessage.author.username;
                      
                      return (
                          <li key={message._id}>
                             <AnimateVisibilityChange className="overflow-hidden" isVisible={!isMessageWrittenSameDayAsPrevious || i === 0}>
                                <TextSeparator>
                                   {formattedDate}
                                </TextSeparator>
                             </AnimateVisibilityChange>
                             <Message message={{
                                ...message,
                                writtenBySameAuthorAsPrevious,
                                date,
                                isMessageWrittenSameDayAsPrevious,
                             }}/>
                          </li>);
                   })}
                </ul>
             </AnimateVisibilityChange>
          </div>
          <form className="mt-2 relative flex justify-between gap-2 px-6" onSubmit={handleSubmit(() => {
             handleMessageSubmit({message});
             reset();
          })}>
             <AnimateVisibilityChange withScaling={false} className="absolute translate-y-[-50%] top-0 left-[5%]" isVisible={isTyping}>
                <div className="text-[12px] rounded-md py-1 px-2 bg-[#2F3136] h-[100%]">
                   {t('Pages.Dashboard.someoneIsTyping', {
                      friend: username
                   })}
                </div>
             </AnimateVisibilityChange>
             <Input control={control} name="message" autoFocus className="flex-grow w-full"/>
             <IconButton
                 size="medium"
                 color="primary"
                 onClick={() => setIsGenerateMessageOpen(true)}
                 className="h-10 rounded-md bg-blue-700 text-violet-400 hover:bg-blue-500 hover:text-blue-800"
             >
                <AutoAwesome className='size-4' />
             </IconButton>
             <MessageGenerationModal messages={messages} isOpen={isGenerateModalOpen} onClose={() => setIsGenerateMessageOpen(false)} onSent={(message) => {
                handleMessageSubmit({message});
             }}/>
          </form>
       </div>
   );
};

export default Messages;

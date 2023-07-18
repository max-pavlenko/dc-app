import {ChangeEventHandler, FC, FormEventHandler, useEffect, useRef, useState} from "react";
import Message from "@/app/features/chat/components/Message";
import Input from "@/app/shared/ui/Input";
import {Typography} from "@mui/material";
import {useAppSelector} from "@/store/store";
import {emitUserTypingMessage, sendDirectMessage} from "@/api/socket.io/connection";
import TextSeparator from "@/app/shared/ui/TextSeparator";
import {getTimeFormatter} from "@/utils/timeFormatter";
import AnimateVisibilityChange from "@/app/shared/ui/AnimateVisibilityChange";

type Props = {};

const HEIGHTS = {
   NAVBAR: 48,
   PADDING_Y: 24,
   INPUT: 40,
   MARGIN_BETWEEN_INPUT: 8,
};

const Messages: FC<Props> = ({}) => {
   const {chat: {messages, chat: {friend, currentlyTypingData: {isTyping, username}}}} = useAppSelector(state => state);
   const [formValues, setFormValues] = useState({message: ""});
   const messagesListRef = useRef<HTMLDivElement>(null);

   if (!friend) return null;

   useEffect(() => {
      if (messages.length === 0) return;
      messagesListRef.current?.scrollTo({behavior: "smooth", top: messagesListRef.current.scrollHeight})
   }, [messages, length]);

   const handleMessageSubmit: FormEventHandler = (e) => {
      e.preventDefault();

      sendDirectMessage({
         receiverID: friend.userID,
         content: formValues.message,
      });
      resetFormValues();
   };

   function resetFormValues() {
      const resettedFormValues = Object.keys(formValues).reduce((previousValue, next) => ({
         ...previousValue,
         [next]: ""
      }), {} as Record<keyof typeof formValues, "">);
      setFormValues(resettedFormValues);
   }

   const handleMessageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setFormValues({
         ...formValues,
         message: e.target.value,
      });
      emitUserTypingMessage({friendID: friend.userID});
   }

   return (
       <div className="py-3 w-full flex flex-col">
          <div ref={messagesListRef} style={{maxHeight: `calc(100vh - ${Object.values(HEIGHTS).reduce((prev, curr) => prev + curr, 0)}px`,}}
               className="flex overflow-y-auto flex-col flex-grow">
             <div className="mb-6 px-6">
                <Typography variant="h4" className="w-full font-bold">{friend.username}</Typography>
                <Typography className="text-[#b9bbbe]">This is the beginning of your conversation with {friend.username}</Typography>
             </div>
             <AnimateVisibilityChange shouldApplyScaling={false} isVisible={messages.length > 0}>
                <ul className="flex px-6 pb-4 flex-col gap-2">
                   {messages.map((message, i) => {
                      const date = new Date(message.date);
                      const formattedDate = getTimeFormatter({
                         weekday: "short",
                         month: "long",
                         day: "numeric",
                         year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined
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
          <form className="mt-2 relative px-6" onSubmit={handleMessageSubmit}>
             <AnimateVisibilityChange shouldApplyScaling={false} className='absolute translate-y-[-50%] top-0 left-[5%]' isVisible={isTyping}>
                <div className='text-[12px] rounded-md py-1 px-2 bg-[#2F3136] h-[100%]'>{username} is typing...</div>
             </AnimateVisibilityChange>
             <Input value={formValues.message}
                    onChange={handleMessageChange} autoFocus className="flex-grow-0"/>
          </form>
       </div>
   );
};

export default Messages;

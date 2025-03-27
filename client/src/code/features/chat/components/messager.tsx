'use client';

import {FC} from 'react'
import {useAppSelector} from "@/store/store";
import Messages from "@/code/features/chat/components/messages";
import WelcomeMessage from "@/code/features/chat/components/welcome-message";

type Props = {};

const Messager: FC<Props> = ({}) => {
   const {friend} = useAppSelector(state => state.chat.chat);

   return (
       <section className='flex-1 bg-[#36393f] flex'>
          {!!friend ? <Messages/> : <WelcomeMessage/>}
       </section>
   );
};

export default Messager;

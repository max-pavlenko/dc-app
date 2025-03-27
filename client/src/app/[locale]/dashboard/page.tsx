'use client';

import {FC,} from 'react';
import Messager from '@/code/features/chat/components/messager';
import SideBar from '@/shared/ui/layout/SideBar';
import NavBar from '@/shared/ui/layout/NavBar';
import FriendsSidebar from '@/code/features/friends/ui/friends-sidebar';
import {useAppSelector} from '@/store/store';
import Room from '@/code/features/rtc/components/Room';

type Props = {};

const DashboardPage: FC<Props> = ({}) => {
   const {user: {isInRoom}} = useAppSelector(state => state.room);
   
   return (
       <div className="w-full min-h-screen flex">
          <SideBar/>
          <FriendsSidebar/>
          <div className="flex flex-col w-full">
             <NavBar/>
             <Messager/>
          </div>
          {isInRoom && <Room/>}
       </div>
   );
};

export default DashboardPage;

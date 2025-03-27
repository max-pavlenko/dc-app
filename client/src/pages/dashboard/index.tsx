import {FC,} from 'react'
import Messager from "@/app/features/chat/components/Messager";
import SideBar from "@/app/shared/components/layout/SideBar";
import NavBar from "@/app/shared/components/layout/NavBar";
import FriendsSidebar from "@/app/features/friends/components/FriendsSidebar";
import AuthCheck from "@/app/features/auth/components/AuthCheck";
import {useAppSelector} from "@/store/store";
import Room from "@/app/features/videoRooms/components/Room";

type Props = {};

const DashboardPage: FC<Props> = ({}) => {
   const {user: {isInRoom}} = useAppSelector(state => state.room)

   return (
       <AuthCheck>
          <main className='w-full min-h-screen flex'>
             <SideBar/>
             <FriendsSidebar/>
             <div className='flex flex-col w-full'>
                <NavBar/>
                <Messager/>
             </div>
             {isInRoom && <Room/>}
          </main>
       </AuthCheck>
   );
};

export default DashboardPage;

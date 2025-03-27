import {FC} from 'react'
import MenuDropdown from "@/app/shared/ui/MenuDropdown";
import {MenuItem} from "@mui/material";
import {useActions, useAppSelector} from "@/store/store";
import NavHeading from "@/app/shared/components/layout/NavHeading";

type Props = {};

const NavBar: FC<Props> = ({}) => {
   const {LOG_OUT, SET_AUDIO_ONLY} = useActions();
   const {audioOnly} = useAppSelector(state => state.room);

   function handleLogoutClick() {
      LOG_OUT();
   }

   function handleAudioOnlyClick() {
      SET_AUDIO_ONLY(!audioOnly);
   }

   const audioOnlyStatus = audioOnly ? 'enabled': 'disabled';
   return (
       <nav className='h-12 border-b border-[#202225] bg-[#36393f] flex items-center justify-between px-4'>
          <NavHeading/>

          <MenuDropdown>
             <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
             <MenuItem onClick={handleAudioOnlyClick}>Audio only {audioOnlyStatus}</MenuItem>
          </MenuDropdown>
       </nav>
   );
};

export default NavBar;

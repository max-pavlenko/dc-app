import {FC} from 'react';
import MenuDropdown from '@/shared/ui/MenuDropdown';
import {ListItemIcon, MenuItem} from '@mui/material';
import {useActions, useAppSelector} from '@/store/store';
import NavHeading from '@/shared/ui/layout/NavHeading';
import LogoutIcon from '@mui/icons-material/Logout';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LanguageSwitch from '@/shared/ui/language-switch';
import {Link, useRouter} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

type Props = {};

const NavBar: FC<Props> = ({}) => {
   const {LOG_OUT, SET_AUDIO_ONLY} = useActions();
   const {audioOnly} = useAppSelector(state => state.room);
   const {user} = useAppSelector(state => state.auth);
   const t = useTranslations();
   const router = useRouter();
   
   function handleLogoutClick() {
      router.push('/login');
      LOG_OUT();
   }
   
   function handleAudioOnlyClick() {
      SET_AUDIO_ONLY(!audioOnly);
   }
   
   const audioOnlyStatus = audioOnly ? 'enabled' : 'disabled';
   return (
       <nav className="h-12 border-b border-[#202225] bg-[#36393f] flex items-center justify-between px-4">
          <NavHeading/>
          
          <div className="flex gap-2">
             <LanguageSwitch/>
             <MenuDropdown menuIcon={<MoreVertIcon/>}>
                
                <Link href={`/profile`}><MenuItem>
                   <ListItemIcon>
                      <AssignmentIndIcon fontSize="small"/>
                   </ListItemIcon>
                   {t('Common.account')}
                </MenuItem>
                </Link>
                <MenuItem onClick={handleAudioOnlyClick}>
                   <ListItemIcon>
                      <HeadphonesIcon fontSize="small"/>
                   </ListItemIcon>
                   Toggle audio only ({audioOnlyStatus})
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                   <ListItemIcon>
                      <LogoutIcon fontSize="small"/>
                   </ListItemIcon>
                   {t('Common.logOut')}
                </MenuItem>
             </MenuDropdown>
          </div>
       </nav>
   );
};

export default NavBar;

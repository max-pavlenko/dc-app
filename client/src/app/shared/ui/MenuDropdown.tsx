import {FC, MouseEventHandler, PropsWithChildren, useState} from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {IconButton, Menu} from "@mui/material";

type Props = {};

const MenuDropdown: FC<PropsWithChildren<Props>> = ({children}) => {
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const isOpen = Boolean(anchorEl);

   const handleMenuOpen: MouseEventHandler = (event) => {
      setAnchorEl(event.currentTarget as HTMLButtonElement);
   };
   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   return (
       <div>
          <IconButton onClick={handleMenuOpen} style={{color: "white"}}>
             <MoreVertIcon/>
          </IconButton>

          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleMenuClose}
          >
             {children}
          </Menu>
       </div>
   );
};

export default MenuDropdown;

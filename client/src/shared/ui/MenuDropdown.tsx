'use client';

import {FC, MouseEventHandler, PropsWithChildren, ReactNode, useState} from 'react';
import {IconButton, Menu} from "@mui/material";

type Props = {
   menuIcon: ReactNode
};

const MenuDropdown: FC<PropsWithChildren<Props>> = ({children, menuIcon }) => {
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
             {menuIcon}
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

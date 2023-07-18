import {ComponentProps, FC} from 'react'
import {Alert, AlertColor, Snackbar} from "@mui/material";
import {useActions, useAppSelector} from "@/store/store";

type Props = {
   snackbarProps?: ComponentProps<typeof Snackbar>,
} & ComponentProps<typeof Alert>;

const OUTLINE_COLORS: Record<AlertColor, string> = {
   info: 'cyan',
   error: 'orange',
   warning: 'orange',
   success: 'violet',
}

const AlertNotification: FC<Props> = ({snackbarProps, ...props}) => {
   const {metadata: {message, isVisible, type}} = useAppSelector(state => state.alerts);
   const {HIDE: hideAlert} = useActions();

   function handleClose() {
      hideAlert();
   }

   return (
       <Snackbar anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
       }} open={isVisible} onClose={handleClose} autoHideDuration={3000} {...snackbarProps}>
          <Alert variant='filled' sx={{outline: `3px solid rgba(var(--${OUTLINE_COLORS[type!] || 'lime'}-rgb), 0.8)`}} severity={type} {...props}>{message}</Alert>
       </Snackbar>
   );
};

export default AlertNotification;

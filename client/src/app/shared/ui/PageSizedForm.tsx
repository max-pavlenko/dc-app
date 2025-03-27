import {FC, PropsWithChildren} from 'react'
import styles from '../../../styles/PageSizedForm.module.scss'
import {Box} from "@mui/material";

type Props = {};

const PageSizedForm: FC<PropsWithChildren<Props>> = ({children}) => {


   return (
       <div className={styles.pageWrapper}>
          <Box className={`${styles.formBox}`}>
             {children}
          </Box>
       </div>
   );
};

export default PageSizedForm;

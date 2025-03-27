import {FC, PropsWithChildren} from 'react'
import styles from '../../styles/PageSizedForm.module.scss'
import {Box} from "@mui/material";
import LanguageSwitch from '@/shared/ui/language-switch';

type Props = {};

const PageSizedForm: FC<PropsWithChildren<Props>> = ({children}) => {


   return (
       <div className={styles.pageWrapper}>
          <Box className={`${styles.formBox}`}>
             {children}
             <div className='absolute top-5 right-5'>
                <LanguageSwitch />
             </div>
          </Box>
       </div>
   );
};

export default PageSizedForm;

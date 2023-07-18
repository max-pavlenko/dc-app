import {FC, PropsWithChildren} from 'react'
import {useLoginWithToken} from "@/hooks/useLoginWithToken";

type Props = {};

const MainLayout: FC<PropsWithChildren<Props>> = ({children}) => {
   useLoginWithToken();

   return (
       <div style={{minHeight: '100vh'}}>
          {children}
       </div>
   );
};

export default MainLayout;

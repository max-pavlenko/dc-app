import {FC, PropsWithChildren, useEffect} from 'react'
import {useAppSelector} from "@/store/store";
import {useRouter} from "next/router";

type Props = {};

const AuthCheck: FC<PropsWithChildren<Props>> = ({children}) => {
   const {user} = useAppSelector(state => state.auth)
   const {push} = useRouter();

   useEffect(() => {
      if (!user) push('/login');
   }, []);

   if (!user) return null;

   return (
       <>
          {children}
       </>
   );
};

export default AuthCheck;

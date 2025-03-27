import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {useMemo} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import getDesignTokens from "@/utils/getDesignTokens";
import AlertNotification from "@/app/shared/ui/AlertNotification";
import MainLayout from "@/app/shared/components/layout/MainLayout";

export default function App({Component, pageProps}: AppProps) {
   const theme = useMemo(() => createTheme(getDesignTokens("dark")), []);

   return <ThemeProvider theme={theme}>
      <Provider store={store}>
         <MainLayout>
            <Component {...pageProps} />
            <AlertNotification className="text-center"/>
         </MainLayout>
      </Provider>
   </ThemeProvider>;
}

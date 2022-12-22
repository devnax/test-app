import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { withThemex } from 'mui-themex'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline"
import { LayerView } from '@libs/Layer'
import { DropdownView } from '@libs/Dropdown'
import Toast, { ToastView } from '@libs/Toast'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ApiConfig } from '@src/Routers'
import System from '@src/System';
import Cookie from '@helpers/Cookie'
import { withStore } from 'state-range'
import FinishPaymentProcess from '@src/components/PaymentBox/FinishPaymentProcess';


NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
ApiConfig.set("api_url", process.env.NEXT_PUBLIC_API_URL)
ApiConfig.set("guard", process.env.NEXT_PUBLIC_APP_SECRET)
ApiConfig.set("onFaild", (err: any) => {
  let message = err.message
  message = err.response?.data?.message || err.message
  if (message.toLowerCase() === 'token expired') {

  }
  Toast.show({
    type: "error",
    title: "Faild",
    content: message
  })
})
// const MessengerCustomerChat = require("react-messenger-customer-chat");
const App = ({ isAuth, Component, pageProps, theme }: AppProps & { theme: any, isAuth: boolean; }) => {
  FinishPaymentProcess()

  useEffect(() => {
    (async () => {
      // Load User Courses
      await System.getUserCoursesInfo()
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} isAuth={isAuth} />
      <LayerView />
      <ToastView />
      <DropdownView />
      {/* <MessengerCustomerChat
        pageId="1049847162159224"
        appId="<APP_ID>"
        htmlRef="<REF_STRING>"
      /> */}
    </ThemeProvider>
  );
};



const Main: any = withThemex(withStore(App) as any, 'light', () => {
  return {
    palette: {
      primary: {
        main: "#bf2d93",
        light: "#e144b2"
      }
    }
  }
})


Main.getInitialProps = async ({ ctx }: any) => {
  const isAuth = Cookie.get('keep-rest', ctx)

  return { isAuth }
}

export default Main
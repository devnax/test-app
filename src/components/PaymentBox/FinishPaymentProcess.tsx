import { useRouter } from 'next/router'
import { useEffect } from 'react'
import CheckoutRouter from '@src/Routers/Checkout'
import Alert from '@libs/Alert'
import System from '@src/System';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import Typography from '@mui/material/Typography'

const FinishPaymentProcess = () => {
   const router = useRouter()
   const trans_key = router.query?.trans_key

   useEffect(() => {
      if (trans_key) {
         (async () => {
            const res = await CheckoutRouter.post("/complete", {
               data: {
                  trans_key
               },
               timeout: 50000
            })

            if (res) {
               const response: any = res.data
               if (!response.data) {
                  if (response.pay_status === 'payment_faild') {
                     Alert.open("enroll_process", {
                        title: <Typography fontSize={20}>Error</Typography> as any,
                        content: <Typography fontSize={18}>{response.message}</Typography> as any,
                        icon: <ErrorRoundedIcon sx={{ fontSize: 70 }} />,
                        type: "error",
                        centerContent: true,
                        buttonText: ['Close', '']
                     });
                  }
                  router.push(router.asPath.split("?")[0])
               } else {
                  const courses: any = System.getMeta("user_courses") || []
                  System.setMeta("user_courses", [...courses, res.data.data])
                  router.push(router.asPath.split("?")[0])
                  setTimeout(() => {
                     router.reload()
                  }, 100)
               }
            } else {
               router.push(router.asPath.split("?")[0])
            }
         })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [trans_key])
}

export default FinishPaymentProcess
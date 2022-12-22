import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import MuiLink from '@mui/material/Link'
import Modal from '@libs/Modal'
import { useForm } from '@src/libs/Form/useForm'
import Card from '@libs/Card'
import System from '@src/System'
import MethodCard from './MethodCard'
import Promocode from './Promocode'
import { FormType, PaymentBoxProps } from './types'
import CheckoutRouter from '@src/Routers/Checkout'
import Toast from '@libs/Toast'
import { useBkash } from 'react-bkash';
import { useRouter } from 'next/router'


const PaymentBox = (props: PaymentBoxProps) => {
   const router = useRouter()
   const form = useForm<FormType>()
   const formState = form.getState()
   const formData = form.getData()
   const countryInfo = System.getUserCountry()
   const { product, amount, disablePromocode } = props
   const { promocodeData } = formState
   let totla_amount: any = amount
   if (promocodeData && promocodeData.discount) {
      totla_amount -= promocodeData.discount.normal
      totla_amount = totla_amount < 0 ? 0 : totla_amount
   }

   const amount_formate = System.formatePrice(totla_amount)


   const bkash = useBkash({
      onSuccess: () => { },
      onClose: () => {
         const res = form.getState().response
         router.push(`${location.origin + location.pathname}?trans_key=${res.trans_keys.cancel}`)
      },
      bkashScriptURL: process.env.NEXT_PUBLIC_BKASH_JS_URL as any,
      amount: amount_formate.local,
      onCreatePayment: async () => {
         Modal.close()
         return form.getState().response?.create
      },
      onExecutePayment: async () => {
         const res = form.getState().response
         router.push(`${location.origin + location.pathname}?trans_key=${res.trans_keys.success}`)
      },
   } as any);

   const createPayment = async () => {

      try {
         const res: any = await CheckoutRouter.create({
            course_id: product.id,
            product_title: product.title,
            amount: amount_formate.normal,
            // currency: countryInfo.symbol,
            method: formData.method.toLowerCase() as any,
            returnUrl: location.origin + location.pathname
         }, { timeout: 50000 });

         if (res) {
            form.setState({ response: res })
            switch (formData.method) {
               case "Bkash":
                  bkash.triggerBkash()
                  break;
               case "Paypal":
                  window.location.href = res.url
                  break;
               case "Others":
                  window.location.href = res.url
                  break;
            }
         }

      } catch (err: any) {
         Toast.show({
            title: "Error",
            content: err.message,
            type: "error"
         })
      }
   }

   return (
      <Stack
         p={2}
         bgcolor="background.paper"
         borderRadius={2}
         boxShadow={10}
         width={450}
      >
         <Card
            inline
            imageSize={100}
            imageEffect={false}
            imagePadded
            ml={-1}
            imageProps={{
               sx: {
                  borderRadius: 0,
                  '& *': { borderRadius: 0 }
               }
            }}
            titleProps={{
               fontSize: 15,
            }}
            title={product.title}
            image={product.image}
            content={<Typography fontSize={20} fontWeight={600} color="#333">{countryInfo.symbol}{amount_formate.local}</Typography>}
         />
         {
            promocodeData && <Stack mt={1}>
               <Typography variant="body1" >code: {promocodeData.code}</Typography>
               <Typography variant="body1" >discount: {countryInfo.symbol}{promocodeData.discount.local}</Typography>
               <Box>
                  <MuiLink
                     mb={2}
                     pt={0}
                     sx={{ cursor: "pointer", display: "inline-block" }}
                     onClick={() => {
                        form.setState({ promocodeData: null, promocodeError: false })
                        form.delete('promocode')
                     }}
                  >
                     change
                  </MuiLink>
               </Box>
            </Stack>
         }

         {
            (!disablePromocode && !promocodeData) && <>
               {
                  formState.activePromocode ? <Promocode form={form} /> : <Stack direction="row">
                     <MuiLink
                        mb={2}
                        py={1}
                        sx={{ cursor: "pointer", display: "inline-block" }}
                        onClick={() => {
                           form.setState({ activePromocode: true, promocodeError: false })
                           form.delete('promocode')
                        }}
                     >
                        enter promocode
                     </MuiLink>
                  </Stack>
               }
            </>
         }


         <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
         >
            <Typography variant="h6" color="#333">Total Amount</Typography>
            <Typography variant="h5" color="#333">{countryInfo.symbol}{amount_formate.local}</Typography>
         </Stack>
         <Stack mb={3} spacing={1}>
            {
               countryInfo.code === 'BD' && <MethodCard
                  form={form}
                  icon="/images/bkash-icon.jpg"
                  title="Bkash"
               />
            }

            <MethodCard
               form={form}
               icon="/images/paypal.png"
               title="Paypal"
            />
            <MethodCard
               form={form}
               icon="/images/payment-mthods.png"
               title="Others"
            />
         </Stack>
         <Typography variant="subtitle1" color="#333" mb={1} fontSize={13}>Order note: Select your favorite social network and share our icons with your contacts or friends, if you do not have these social networks copy the link</Typography>
         <LoadingButton
            loading={formState.loading}
            variant="contained"
            size="large"
            disabled={!formData.method || formState.promocodeChecking}
            onClick={async () => {
               form.setState({ loading: true })
               await createPayment()
               form.setState({ loading: false })
            }}
         >
            Continue payment
         </LoadingButton>
         <MuiLink
            underline="none"
            textAlign="center"
            mt={2}
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => Modal.close()}
         >
            Cancel
         </MuiLink>
      </Stack>
   )
}

export default PaymentBox
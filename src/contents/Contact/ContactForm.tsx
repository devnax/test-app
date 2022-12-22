import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Field from '@src/libs/Form/Field';
import TextField from '@src/libs/Form/TextField';
import { useForm } from '@src/libs/Form/useForm'
import Typography from '@mui/material/Typography'
import Loader from '@src/libs/Loader';
import { ContactRouter } from '@src/Routers';

interface FormProps {
   name: string;
   email: string;
   phone: string;
   message: string;
}

const BookFreeClassForm = () => {
   const form = useForm<FormProps>()
   const state = form.getState()

   return (
      <Loader loading={form.isLoading()}>
         <Stack

            p={4}
            borderRadius={2}
         >
            {
               state.isSend && <Stack spacing={2} alignItems="center" justifyContent="center">
                  <picture>
                     <img src="/images/success-check.png" alt="Mail sent success" />
                  </picture>
                  <Typography variant="h4" fontWeight={500} color="#00E8D3">
                     Thank You!
                  </Typography>
                  <Typography variant="body2" fontWeight={500} >
                     Message has been sent
                  </Typography>
               </Stack>
            }

            {
               !state.isSend && <>

                  <Typography variant="h4" mb={2} textAlign="center">
                     Send Us a Message
                  </Typography>
                  <Field>
                     <TextField
                        form={form}
                        name="name"
                        label="Name"
                        require
                        schema={s => s.required().min(3).max(100)}
                     />
                  </Field>
                  <Field>
                     <TextField
                        form={form}
                        name="email"
                        label="Email"
                        require
                        schema={s => s.required().min(3).email()}
                     />
                  </Field>
                  <Field>
                     <TextField
                        form={form}
                        name="phone"
                        label="Phone"
                        require
                        schema={s => s.required().min(11).number()}
                     />
                  </Field>
                  <Field>
                     <TextField
                        multiline
                        form={form}
                        name="message"
                        label="Message"
                        require
                        schema={s => s.required().min(11).max(250)}
                        rows={6}
                     />
                  </Field>
                  <Field mt={2}>
                     <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={async () => {
                           const { name, email, phone, message } = form.getData()
                           if (form.validate()) {
                              form.loading()
                              form.setState({ isSend: false })
                              await ContactRouter.post('/', {
                                 data: {
                                    name,
                                    email,
                                    phone,
                                    message
                                 }
                              })
                              form.loading(false)
                              form.setState({ isSend: true })
                           }
                        }}
                     >SEND REQUEST</Button>
                  </Field>
               </>
            }


         </Stack>
      </Loader>
   )
}

export default BookFreeClassForm

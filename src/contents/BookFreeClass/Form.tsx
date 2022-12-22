import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Field from '@src/libs/Form/Field';
import TextField from '@src/libs/Form/TextField';
import { useForm } from '@src/libs/Form/useForm'
import Typography from '@mui/material/Typography'
import Select from '@src/libs/Form/Select';
import Loader from '@src/libs/Loader';
import { FreeClassRouter } from '@src/Routers';

interface FormProps {
   name: string;
   email: string;
   phone: string;
   courses: "IELTS" | "GED" | "SAT" | "GRE" | "IBA-BBA/MBA"
}

const BookFreeClassForm = () => {
   const form = useForm<FormProps>()
   const state = form.getState()

   return (
      <Loader loading={form.isLoading()}>
         <Stack
            bgcolor="background.paper"
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
                     Your request has been sent
                  </Typography>
               </Stack>
            }

            {
               !state.isSend && <>

                  <Typography variant="h5" mb={2} textAlign="center">
                     That&apos;s a Great Decision! Let&apos;s Get Started.
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
                     <Typography variant="subtitle1" mb={1}>Select the Courses you want to join and very soon one of our specialists will contact you.</Typography>

                     <Select
                        label="Select Course"
                        form={form}
                        name="courses"
                        placeholder='Select...'
                        disableClearable
                        multiple
                        require
                        schema={s => s.required()}
                        options={[
                           { label: "IELTS", value: "IELTS" },
                           { label: "GED", value: "GED" },
                           { label: "SAT", value: "SAT" },
                           { label: "GRE", value: "GRE" },
                           { label: "IBA-BBA/MBA", value: "IBA-BBA/MBA" },
                        ]}
                     />
                  </Field>

                  <Field mt={2}>
                     <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={async () => {
                           const { name, email, phone, courses } = form.getData()
                           if (form.validate()) {
                              form.loading()
                              form.setState({ isSend: false })
                              await FreeClassRouter.post('/', {
                                 data: {
                                    name,
                                    email,
                                    phone,
                                    courses
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

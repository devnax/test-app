import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Field from '@src/libs/Form/Field';
import TextField from '@src/libs/Form/TextField';
import { useForm } from '@src/libs/Form/useForm'
import Typography from '@mui/material/Typography'
import Select from '@src/libs/Form/Select';
import Loader from '@src/libs/Loader';
import { ConsulationRouter } from '@src/Routers';
import Label from '@src/libs/Form/Label';
import Radio from '@src/libs/Form/Radio';

interface FormProps {
   name: string;
   email: string;
   phone: string;
   country: "USA" | "UK" | "Malaysia" | "Canada" | "Australia"
   apply_for: "undergraduate Studies" | "Master's"
}

const ConsulationForm = () => {
   const form = useForm<FormProps>()
   const state = form.getState()

   useEffect(() => {
      form.set("apply_for", "undergraduate Studies")
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Loader loading={form.isLoading()} width={500}>
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
                  <Typography variant="h5" mb={1} >
                     Book a Free 30-minute Consultation with Our Study Abroad Experts
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
                     <Select
                        label="Country you are interested to study"
                        form={form}
                        name="country"
                        placeholder='Select...'
                        disableClearable
                        multiple
                        require
                        schema={s => s.required()}
                        options={[
                           { label: "USA", value: "USA" },
                           { label: "UK", value: "UK" },
                           { label: "Canada", value: "Canada" },
                           { label: "Malaysia", value: "Malaysia" },
                           { label: "Australia", value: "Australia" },
                        ]}
                     />
                  </Field>
                  <Field >
                     <Label>Apply For?</Label>
                     <Radio
                        form={form}
                        name="apply_for"
                        label="undergraduate Studies"
                        value="undergraduate Studies"
                        vertical
                        items={[
                           { label: "Master's", value: "Master's" }
                        ]}
                     />
                  </Field>

                  <Field mt={2}>
                     <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={async () => {
                           const { name, email, phone, country, apply_for } = form.getData()
                           if (form.validate()) {
                              form.loading()
                              form.setState({ isSend: false })
                              await ConsulationRouter.post('/', {
                                 data: {
                                    name,
                                    email,
                                    phone,
                                    country,
                                    apply_for
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

export default ConsulationForm

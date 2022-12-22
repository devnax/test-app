import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Field from '@src/libs/Form/Field'
import Input from '@src/libs/Form/TextField'
import Avatar from '@src/libs/Form/Avatar'
import { useForm } from '@src/libs/Form/useForm'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import Modal from '@src/libs/Modal'
import { AuthRouter, MediaRouter, UserMetaRouter } from '@src/Routers'
import Auth from '@src/System/Auth'
import LoadingBox from "@libs/Loader"


interface FormFields {
   name: string | null;
   email: string | null;
   phone: string | null;
   photo: string | null;
   photo_id: number;
   country: string | null;
   city: string | null;
   address: string | null;
}


const ProfileEdit = () => {
   const form = useForm<FormFields>()
   const [auth, setAuth] = useState<any>()
   useEffect(() => {
      const _auth = Auth.getAuth()

      setAuth(_auth);

      (async () => {
         form.loading()
         const user = await AuthRouter.getAuth({
            include: {
               photo: {
                  select: {
                     id: true,
                     url: true
                  }
               },
               user_metas: {
                  select: {
                     key: true,
                     value: true
                  }
               },
            }
         })

         form.loading(false)
         if (user) {
            form.set("name", user.firstname)
            form.set("email", user.email)
            form.set("phone", user.phone)

            if ((user as any).photo) {
               form.set("photo", (user as any).photo.url)
               form.set("photo_id", (user as any).photo.id)
            }

            for (let meta of (user as any).user_metas) {
               if (meta.key === 'country') {
                  form.set("country", meta.value)
               } else if (meta.key === 'city') {
                  form.set("city", meta.value)
               } else if (meta.key === 'address') {
                  form.set("address", meta.value)
               }
            }
         }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (!auth) {
      return <></>
   }

   return (
      <LoadingBox loading={form.isLoading()}>
         <Stack
            bgcolor="background.paper"
            p={2}
            borderRadius={2}
            boxShadow={14}
            width={500}
            maxWidth={700}
         >
            <Typography variant="h6" mb={2}>Edit Profile</Typography>
            <Field>
               <Avatar
                  form={form}
                  name="photo"
               />
            </Field>
            <Field>
               <Input
                  label="Name"
                  form={form}
                  name="name"
                  require
                  schema={s => s.min(3).max(50)}
               />
            </Field>
            <Field>
               <Input
                  disabled
                  label="Phone"
                  form={form}
                  name="phone"
                  schema={s => s.optional().min(3).max(100)}
               />
            </Field>
            <Field>
               <Input
                  disabled
                  label="Email"
                  form={form}
                  name="email"
                  schema={s => s.optional().min(3).max(100)}
               />
            </Field>
            <Field container p={.5}>
               <Field size={6}>
                  <Input
                     label="Country"
                     form={form}
                     name="country"
                     schema={s => s.optional().min(3).max(50)}
                  />
               </Field>
               <Field size={6}>
                  <Input
                     label="City"
                     form={form}
                     name="city"
                     schema={s => s.optional().min(3).max(50)}
                  />
               </Field>
            </Field>
            <Field>
               <Input
                  label="Address"
                  form={form}
                  name="address"
                  schema={s => s.optional().min(3).max(100)}
               />
            </Field>

            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
               <Button color="inherit" onClick={() => {
                  Modal.close()

               }}>CLOSE</Button>
               <Button
                  variant="contained"
                  onClick={async () => {
                     if (form.validate()) {
                        form.loading()

                        let { name, photo, photo_id, country, city, address } = form.getData()
                        if ((photo as any) instanceof File) {
                           if (photo_id) {
                              await MediaRouter.delete({ id: photo_id })
                           }
                           const media = await MediaRouter.create({ file: (photo as any) })
                           if (media) {
                              photo_id = media.id
                              form.set("photo", media.url)
                              form.set("photo_id", media.id)
                           }
                        }

                        if (!photo) {
                           if (photo_id) {
                              await MediaRouter.delete({ id: photo_id })
                           }
                           photo_id = null as any
                        }

                        await AuthRouter.update({
                           firstname: name as string,
                           photo_id
                        }, { id: auth.id })



                        country && await UserMetaRouter.create({
                           value: country,
                           key: 'country',
                           user_id: auth.id
                        })

                        city && await UserMetaRouter.create({
                           value: city,
                           key: 'city',
                           user_id: auth.id
                        })

                        address && await UserMetaRouter.create({
                           value: address,
                           key: 'address',
                           user_id: auth.id
                        })

                        await Auth.setAuth()
                        form.loading(false)

                     }
                  }}
               >SAVE</Button>
            </Stack>
         </Stack>
      </LoadingBox>
   )
}

export default ProfileEdit
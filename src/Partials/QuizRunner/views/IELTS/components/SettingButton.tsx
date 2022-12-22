import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import React from 'react'
import Button from './Button'
import Stack from '@mui/material/Stack'
import monitorIcon from '../Images/monitor.png'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { withMemo, withStore } from 'state-range'



const Radio = ({ label, checked, onClick }: { label: string, checked: boolean; onClick: () => void }) => {
   return (
      <Stack
         direction="row"
         alignItems="center"
         spacing={1}
         sx={{ cursor: "pointer" }}
         onClick={onClick}
      >
         <input type="radio" checked={checked} onChange={() => { }} style={{ verticalAlign: "middle" }} />
         <Typography fontWeight="bold">{label}</Typography>
      </Stack>
   )
}


const _Modal = () => {
   const typography_setting: any = QuizHandler.getMeta("typography_setting") || {}

   return <Stack p={2}>
      <Typography variant="body1" >If you wish, you can change these settings to make the test easier to read</Typography>
      <Grid container mt={4}>
         <Grid item xs={12} md={6}>
            <Stack>
               <Typography variant="h5" >Text size</Typography>
               <Stack spacing={1} mt={2}>
                  <Radio
                     label="Standard"
                     checked={!typography_setting.fontSize}
                     onClick={() => {
                        QuizHandler.setMeta("typography_setting", {
                           color: "",
                           bgcolor: "",
                           ...typography_setting,
                           fontSize: ""
                        })
                     }}
                  />
                  <Radio
                     label="Large"
                     checked={typography_setting.fontSize === 18}
                     onClick={() => {
                        QuizHandler.setMeta("typography_setting", {
                           color: "",
                           bgcolor: "",
                           ...typography_setting,
                           fontSize: 18
                        })
                     }}
                  />
                  <Radio
                     label="Extra large"
                     checked={typography_setting.fontSize === 22}
                     onClick={() => {
                        QuizHandler.setMeta("typography_setting", {
                           color: "",
                           bgcolor: "",
                           ...typography_setting,
                           fontSize: 22
                        })
                     }}
                  />
               </Stack>
            </Stack>
         </Grid>
         <Grid item xs={12} md={6}>
            <Stack>
               <Typography variant="h5" >Colours</Typography>
               <Stack spacing={1} mt={2}>
                  <Radio
                     label="Standard"
                     checked={!typography_setting.color}
                     onClick={() => {
                        QuizHandler.setMeta("typography_setting", {
                           fontSize: "",
                           ...typography_setting,
                           color: "",
                           bgcolor: ""
                        })
                     }}
                  />
                  <Radio
                     label="Yellow on black"
                     checked={typography_setting.bgcolor === "#000"}
                     onClick={() => {
                        QuizHandler.setMeta("typography_setting", {
                           fontSize: "",
                           ...typography_setting,
                           color: "yellow",
                           bgcolor: "#000"
                        })
                     }}
                  />
                  <Radio
                     label="Blue on white"
                     checked={typography_setting.bgcolor === "#fff"}
                     onClick={() => {
                        QuizHandler.setMeta("typography_setting", {
                           fontSize: "",
                           ...typography_setting,
                           color: "blue",
                           bgcolor: "#fff"
                        })
                     }}
                  />
                  <Radio
                     label="Blue on cream"
                     checked={typography_setting.bgcolor === "#F7F5C9"}
                     onClick={() => {
                        QuizHandler.setMeta("typography_setting", {
                           fontSize: "",
                           ...typography_setting,
                           color: "blue",
                           bgcolor: "#F7F5C9"
                        })
                     }}
                  />
               </Stack>
            </Stack>
         </Grid>
      </Grid>
   </Stack>
}


const Modal = withStore(_Modal)

const SettingButton = () => {
   return (
      <Button
         onClick={() => {
            QuizHandler.setMeta("showModal", {
               title: <Stack direction="row" alignItems="center" spacing={1} >
                  <picture>
                     <img src={monitorIcon.src} alt="" />
                  </picture>
                  <Typography variant="h6" color="#fff">Settings</Typography>
               </Stack>,
               content: <Modal />,
               dialog: true,
               width: 600,
               height: 330,
            })
         }}
      >
         Settings
      </Button>
   )
}

export default withMemo(SettingButton, () => {
   const typography_setting: any = QuizHandler.getMeta("typography_setting")
   return [typography_setting]
})
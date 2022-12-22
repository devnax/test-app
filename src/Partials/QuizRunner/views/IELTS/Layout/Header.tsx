import React, { memo } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TimeReminingButton from '../components/TimeReminingButton'
import HelpButton from '../components/HelpButton'
import SettingButton from '../components/SettingButton'
import HideButton from '../components/HideButton'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import Button from '../components/Button'
import userIcon from '../Images/user.png'
import VolumeSlider from '../components/VolumSlider'
import CalculatorButton from '../components/CalculatorButton'



const Header = () => {
   const auth = QuizHandler.getAuth()
   const screen = QuizHandler.getMeta("screen")
   const reportMode = QuizHandler.getMeta("reportMode")
   let player = QuizHandler.getAudioPlayer()
   return (
      <Stack width="100%" sx={{ userSelect: "none" }}>
         <Stack
            direction={{
               md: "row",
               xs: "column"
            }}
            justifyContent={{
               md: "space-between",
               xs: "center"
            }}
            alignItems="center"
            width="100%"
            height={{
               xs: 120,
               md: 35
            }}
            bgcolor="#000"
            color="#fff"
            px={{
               xs: 1,
               md: 2
            }}
            spacing={{
               md: 0,
               xs: 1
            }}
         >
            <Stack ml={-1} direction="row" alignItems="center" justifyContent={{
               md: "flex-start",
               xs: "center"
            }} spacing={1} width={{ xs: '100%', md: 500 }}>
               <picture style={{ display: "inherit" }}>
                  <img src={userIcon.src} alt="" />
               </picture>
               <Typography variant="body1" fontSize={15} color="#d1f0ce">{auth.firstname}</Typography>
            </Stack>
            <Stack flex={1} direction="row" alignItems="center" justifyContent="center">
               <TimeReminingButton />
            </Stack>
            <Stack
               direction="row"
               alignItems="center"
               justifyContent={{
                  md: "flex-end",
                  xs: "center"
               }}
               spacing={1}
               width={{ xs: '100%', md: 500 }}
               flexWrap="wrap"
            >
               {
                  !reportMode && screen === "quiz" ? <>
                     <Button
                        onClick={() => {
                           const is = window.confirm("You have selected to end this section of the test, click OK to progress to the next section or Cancel to return to the test")
                           if (is) {
                              QuizHandler.finishQuiz()
                           }
                        }}
                        sx={{
                           px: 1
                        }}
                     >Finish section</Button>
                     <SettingButton />
                     <HelpButton />
                     <HideButton />
                     <CalculatorButton />

                  </> : <>
                     {
                        reportMode ? <Button
                           onClick={() => {
                              QuizHandler.reset()
                              QuizHandler.setMeta("finished", true)
                           }}
                        >Back To Score</Button> : <Button
                           onClick={() => {
                              QuizHandler.exit()
                           }}
                        >Exit test</Button>
                     }

                  </>
               }
               {
                  (!reportMode && player) && <VolumeSlider />
               }
            </Stack>
         </Stack>
      </Stack>
   )
}

export default memo(Header)
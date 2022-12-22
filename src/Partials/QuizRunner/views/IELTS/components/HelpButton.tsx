/* eslint-disable @next/next/no-img-element */
import React, { useState, memo } from 'react'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import Button from './Button'
import ShadowButton from './ShadowButton'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import helpModalIcon from '../Images/help-modal.png'
import Typography from '@mui/material/Typography'
import { withStore } from 'state-range'
import helpIcon from '../Images/help.png'


import testhelp1Icon from '../Images/test-help1.png'
import testhelp2Icon from '../Images/test-help2.png'
import testhelp3Icon from '../Images/test-help3.png'
import testhelp4Icon from '../Images/test-help4.png'
import testhelp5Icon from '../Images/test-help5.png'
import testhelp6Icon from '../Images/test-help6.png'
import testhelp7Icon from '../Images/test-help7.png'
import testhelp8Icon from '../Images/test-help8.png'
import testhelp9Icon from '../Images/test-help9.png'
import testhelp10Icon from '../Images/test-help10.png'

import taskhelp1Icon from '../Images/taskhelp1.png'
import taskhelp2Icon from '../Images/taskhelp2.png'
import taskhelp3Icon from '../Images/taskhelp3.png'
import taskhelp4Icon from '../Images/taskhelp4.png'
import taskhelp5Icon from '../Images/taskhelp5.png'
import taskhelp6Icon from '../Images/taskhelp6.png'
import taskhelp7Icon from '../Images/taskhelp7.png'
import IELTSInfoScreen from '../../InfoContent/IELTS'
import SATInfoScreen from '../../InfoContent/SAT'


const Information = () => {
   const settings = QuizHandler.getSettings()
   const course_type = settings.course_type
   const infoContent = settings.information

   let infoTmp = <IELTSInfoScreen />
   switch (course_type) {
      case "SAT":
         infoTmp = <SATInfoScreen />
         break;
   }

   return (
      <Stack
         width="100%"
         color="#222"
      >
         {
            infoContent ? <div dangerouslySetInnerHTML={{ __html: infoContent }} /> : infoTmp
         }
      </Stack>
   )
}



const TestHelp = () => {
   return (
      <Stack alignItems="flex-start" spacing={2.5}>
         <Typography variant="h4">At the top of the screen you can see:</Typography>
         <img src={testhelp1Icon.src} alt="" />
         <Typography variant="body1">Your name and candidate number.</Typography>
         <img src={testhelp2Icon.src} alt="" />
         <Typography variant="body1">A clock, which tells you how much time you have left. When you hover over the time you can see the seconds.</Typography>
         <Stack direction="row" spacing={1}>
            <img src={testhelp3Icon.src} alt="" />
            <Typography variant="body1" >Click to view the help.</Typography>
         </Stack>
         <Stack direction="row" spacing={1}>
            <img src={testhelp4Icon.src} alt="" />
            <Typography variant="body1" >Click to hide the screen content temporarily.</Typography>
         </Stack>
         <Divider sx={{ my: 2 }} />
         <Typography variant="h4" >Volume</Typography>
         <Typography variant="body1" >If you want to change the volume of the Listening test, click on the volume slider.</Typography>
         <img src={testhelp5Icon.src} alt="" />

         <Typography variant="h4" >Navigation</Typography>
         <Typography variant="body1" >At the bottom of the screen you can see the navigation bar</Typography>
         <img src={testhelp6Icon.src} alt="" />

         <Typography variant="body1" >Click on a number to go to that question.</Typography>
         <Stack direction="row" spacing={1}>
            <img src={testhelp7Icon.src} alt="" />
            <Typography variant="body1" >Click to go to the next question</Typography>
         </Stack>
         <Stack direction="row" spacing={1}>
            <img src={testhelp8Icon.src} alt="" />
            <Typography variant="body1" >Click to go to the previous question</Typography>
         </Stack>
         <Stack direction="row" spacing={1}>
            <img src={testhelp9Icon.src} alt="" />
            <Typography variant="body1" >Click if you want to look at this question again later. The question number in the navigation bar will</Typography>
         </Stack>
         <Typography variant="body1" >turn into a circle.</Typography>
         <img src={testhelp10Icon.src} alt="" />
      </Stack>
   )
}


const TaskHelp = () => {
   return (
      <Stack alignItems="flex-start" spacing={2.5}>
         <Typography variant="body1">To choose a question either click on the question number at the bottom of the screen or click on the question.</Typography>
         <Divider />
         <Typography variant="h4">Multiple choice questions in an accordion</Typography>
         <Typography variant="body1">Choose your question by clicking on it.</Typography>
         <img src={taskhelp1Icon.src} alt="" />
         <Typography variant="body1">Click on the answer you think is right.</Typography>
         <Typography variant="body1">If you change your mind, click on a different answer.</Typography>
         <Typography variant="body1">If you want to leave the question unanswered, click on your answer again.</Typography>
         <Divider />
         <Typography variant="h4">Multiple choice questions where there is more than one answer</Typography>
         <Typography variant="body1">Some questions may ask you to choose two or three answers. Make sure you read the instructions and questions carefully.</Typography>
         <img src={taskhelp2Icon.src} alt="" />
         <Typography variant="body1">Click on the answers you think are right.</Typography>
         <Typography variant="body1">If you change your mind, click on a different answer.</Typography>
         <Typography variant="body1">If you want to leave the question unanswered, click on your answer again.</Typography>
         <Divider />
         <Typography variant="h4">Gap fill questions</Typography>
         <Typography variant="body1">To answer some questions, you need to write words or numbers in a gap. To answer these questions, click in the gap and write your answer. Some questions may ask you to write your answer in a table, flow-chart or diagram.</Typography>
         <img src={taskhelp3Icon.src} alt="" />
         <Divider />
         <Typography variant="h4">Matching questions using a table</Typography>
         <Typography variant="body1">To select a question, click on the question number in the table. The column will become shaded.</Typography>
         <img src={taskhelp4Icon.src} alt="" />
         <Typography variant="body1">Select the correct option by clicking on a space in the table. A tick will appear.</Typography>
         <img src={taskhelp5Icon.src} alt="" />
         <Typography variant="body1">If you want to change your answer, click on another space.</Typography>
         <Typography variant="body1">If you want to leave the question unanswered, click on the space again.</Typography>
         <img src={taskhelp6Icon.src} alt="" />
         <Typography variant="body1">To answer a question, click on the answer and move it into the gap.</Typography>
         <img src={taskhelp7Icon.src} alt="" />
         <Typography variant="body1">If you want to change your answer, move another answer into the gap.</Typography>
         <Typography variant="body1">If you want to leave the question unanswered, move the answer back.</Typography>
         <Typography variant="body1">Don&apos;t forget! You may need to scroll to see all the Reading text and all the questions.</Typography>
      </Stack>
   )
}


const _Modal = () => {

   const [tab, setTab] = useState("Information")
   const sx = {
      fontWeight: "bold",
      color: "#000!important",
      textTransform: "initial",
      border: 1,
      borderColor: "divider",
      borderRadius: "12px 12px 0 0",
      mr: 1,
      opacity: .6,
      '&:hover': {
         opacity: 1,
         color: "#40a9ff!important"
      }
   }

   let tmp = <Information />

   switch (tab) {
      case "Test help":
         tmp = <TestHelp />
         break;
      case "Task help":
         tmp = <TaskHelp />
         break;
   }

   return <Stack >
      <Stack
         borderBottom={1}
         borderColor="divider"
         mt={1}
         p={1}
         pb={0}
      >
         <Tabs
            sx={{
               '& .MuiTabs-indicator': {
                  bgcolor: "#fff"
               }
            }}
            value={tab}
            onChange={(_e, v) => setTab(v)}
         >
            <Tab
               disableRipple
               label="Information"
               value="Information"
               sx={sx}
            />
            <Tab
               disableRipple
               label="Test help"
               value="Test help"
               sx={sx}
            />
            <Tab
               disableRipple
               label="Task help"
               value="Task help"
               sx={sx}
            />
         </Tabs>

      </Stack>
      <Stack p={1.5}>
         {tmp}
      </Stack>
   </Stack>
}

const Modal = withStore(_Modal, () => [])

const HelpButton = () => {
   return (
      <Button
         onClick={() => {
            QuizHandler.setMeta("showModal", {
               title: <Stack direction="row" alignItems="center" spacing={1} >
                  <picture>
                     <img src={helpModalIcon.src} alt="" />
                  </picture>
                  <Typography variant="h6" color="#fff">Help</Typography>
               </Stack>,
               footer: <Stack direction="row" alignItems="center" justifyContent="center" py={3}>
                  <ShadowButton onClick={() => {
                     QuizHandler.deleteMeta("showModal")
                  }}>Ok</ShadowButton>
               </Stack>,
               content: <Modal />,
               dialog: true,
               draggable: false,
               width: 800,
               height: 600,
            })
         }}
      >
         <Stack direction="row" alignItems="center" spacing={2}>
            Help
            <picture style={{ display: "inherit" }}>
               <img src={helpIcon.src} alt="" />
            </picture>
         </Stack>
      </Button>
   )
}

export default memo(HelpButton)
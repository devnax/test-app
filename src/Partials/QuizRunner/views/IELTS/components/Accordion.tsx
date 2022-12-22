import React, { ReactElement } from 'react'
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler';
import Anotation from '../../Anotation';

interface Props {
   qindex: number;
   children: ReactElement;
}


const Accordion = ({ children, qindex }: Props) => {
   const answer = QuizHandler.findFirst({ qindex })
   const activeQuestion = QuizHandler.getMeta("activeQuestion")
   if (!answer) {
      return <></>
   }

   const active = activeQuestion === answer.qindex
   const isCollapsible = answer.data.collapsible
   let sx = {}
   if (isCollapsible) {
      sx = {
         border: "1px solid #e6e6e6",
         padding: "12px 12px",
         cursor: "pointer",
         background: active ? "#b4dbf7" : "#faf6f6",
         borderRadius: "8px",
         '& p': {
            p: 0,
            m: 0
         }
      }
   }

   return (
      <Stack>
         <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            onClick={() => {
               if (isCollapsible) {
                  QuizHandler.update({ collapse: false }, { collapse: true })
                  QuizHandler.update({ collapse: !answer.collapse }, answer._id)
               }
            }}
            sx={{
               cursor: "pointer",
               background: active ? "#b4dbf7" : "transparent",
               color: "#333",
               width: "100%",

               '& p': {
                  p: 0,
                  m: 0
               },
               ...sx
            }}
         >
            <b>{qindex}.</b>
            {answer.data.questionContent && <Anotation id={answer.data.qid} content={answer.data.questionContent} />}
         </Stack>
         <Collapse in={!isCollapsible ? true : answer.collapse}>
            <Stack pt={2}>
               {children}
            </Stack>
         </Collapse>
      </Stack>
   )
}

export default Accordion
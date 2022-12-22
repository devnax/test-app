import React, { useMemo, useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import Stack from '@mui/material/Stack';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QuizReportProps } from './types'
import * as piece from 'json-piece'
import { GEDReportBox } from '@src/Partials/QuizRunner/views/GED/Screens/Report'
import { IELTSReportBox } from '@src/Partials/QuizRunner/views/IELTS/Screens/Report'
import moment from 'moment';
import Button from '@mui/lab/LoadingButton';
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'

interface ReportsProps {
   reports: QuizReportProps[];
   courseId: number;
}


const ReportItem = (report: QuizReportProps & { courseId: number }) => {
   const [report_items, setReportItems] = useState<any[]>([])
   const [resumable, setResumable] = useState(false)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      try {
         const formated = []
         for (let merge of report.merge_items) {
            if (!merge.reports) {
               setResumable(true)
               break;
            }

            formated.push(piece.parse(merge.reports))
         }
         setReportItems(formated)
      } catch (err) {
         console.log(err);
      }
      // eslint-disable-next-line
   }, [])

   // eslint-disable-next-line 
   const date = useMemo(() => moment(report.created_at).format('MMMM Do YYYY, h:mm A'), [])

   if (!report_items.length) {
      return (<Stack>
         <Accordion disableGutters elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
               <Typography >
                  Invalid Report
               </Typography>
            </AccordionSummary>
         </Accordion>
         <Divider />
      </Stack>)
   }


   return (
      <Stack>
         <Accordion disableGutters elevation={0}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
            >
               <Typography >
                  <b>#Report:</b> {date}
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Stack spacing={2}>
                  {
                     report_items.map((r, idx) => {
                        if (r.course_type === "IELTS") {
                           return <IELTSReportBox key={idx} reports={r} />
                        }
                        return <GEDReportBox key={idx} reports={r} />
                     })
                  }
               </Stack>
               {
                  resumable && <Stack direction="row" justifyContent="center" p={1}>
                     <Button
                        variant="outlined"
                        loading={loading}
                        onClick={async () => {
                           setLoading(true)
                           await QuizHandler.resumeQuiz(report.id, report.courseId)
                           setLoading(false)
                        }}
                     >
                        Continue and Finish
                     </Button>
                  </Stack>
               }
            </AccordionDetails>
         </Accordion>
         <Divider />
      </Stack>

   );
}


const QuizReports = ({ reports, courseId }: ReportsProps) => {
   return (
      <Stack>
         <Typography variant="h6" mb={2}>Quiz Reports</Typography>
         <Stack
            borderRadius={2}
            border={1}
            borderColor="divider"
            overflow="hidden"
         >
            {
               reports.map((report: QuizReportProps) => {
                  return <ReportItem key={report.id} {...report} courseId={courseId} />
               })
            }
         </Stack>
      </Stack>
   )
}

export default QuizReports
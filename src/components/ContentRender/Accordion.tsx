import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Renderar from './'
import { ContentData } from './types'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

const AccordionView = ({ childs, data }: ContentData) => {
   const [active, setActive] = useState(Object.keys(data.accordions)[0])

   return <Box
      borderRadius={2}
      border={1}
      borderColor="divider"
   >
      {
         childs.map((item: any, idx: number) => {
            const { title } = data.accordions[item.accordionId] || {}
            const expanded = active === item.accordionId
            return <Box key={idx}>
               <Accordion
                  sx={{
                     bgcolor: "transparent",
                     '&:before': {
                        display: "none"
                     }
                  }}
                  disableGutters
                  elevation={0}

                  expanded={expanded}
                  onChange={() => {
                     setActive(expanded ? "" : item.accordionId)
                  }}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                  >
                     <Typography fontSize={16} fontWeight={500} color={expanded ? "#bf2d93" : "inherit"}>
                        {title}
                     </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 1 }}>
                     {
                        Renderar.set(item.childs)
                     }
                  </AccordionDetails>
               </Accordion>
               {childs[idx + 1] && <Divider />}
            </Box>
         })
      }
   </Box>
}

export default AccordionView
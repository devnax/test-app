import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PartnerCard, { PartnerCardProps } from './PartnerCard'


interface Props {
   title: string;
   items: PartnerCardProps[]
}

const PartnerSection = ({ title, items }: Props) => {
   return (
      <Stack borderRadius={2} >
         <Typography variant="h4" fontWeight={600} fontSize={30} color="#333" mb={2}>{title}</Typography>
         <Stack direction="row" alignItems="center" flexWrap="wrap" >
            {
               items.map((item, idx) => <Stack key={idx} p={.7}>
                  <PartnerCard
                     {...item}
                  />
               </Stack>)
            }
         </Stack>
      </Stack>
   )
}

export default PartnerSection
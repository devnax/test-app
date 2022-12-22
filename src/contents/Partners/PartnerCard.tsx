import React from 'react';
import Stack, { StackProps } from '@mui/material/Stack'


export interface PartnerCardProps extends StackProps {
   src: string;
}


const PartnerCard = ({ src, ...rest }: PartnerCardProps) => {
   return (
      <Stack
         p={2}
         bgcolor="background.paper"
         borderRadius={2}
         height={120}
         alignItems="center"
         justifyContent="center"
         overflow="hidden"
         width={200}
         border={1}
         borderColor="divider"
         {...rest}
      >
         <picture>
            <img width="90%" src={src} alt="" />
         </picture>
      </Stack>
   )
}


export default PartnerCard
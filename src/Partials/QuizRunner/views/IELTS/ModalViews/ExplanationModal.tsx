import React from 'react'
import Typography from '@mui/material/Typography'
interface Props {
   content: string
}

const ExplanationModal = ({ content }: Props) => {
   return (
      <Typography
         p={1}
         dangerouslySetInnerHTML={{
            __html: content
         }}
      />
   )
}

export default ExplanationModal
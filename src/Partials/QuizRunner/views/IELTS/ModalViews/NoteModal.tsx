import React, { useState } from 'react'
import InputBase from '@mui/material/InputBase'
import Stack from '@mui/material/Stack'
import { NoteFactory } from '@src/Partials/QuizRunner/handlers/NoteFactory';

interface Props {
   noteId: string;
}

const NoteModal = ({ noteId }: Props) => {
   const note = NoteFactory.get(noteId)
   const [v, setV] = useState(note?.content || "")
   if (!note) {
      return <>Invalid Note</>
   }

   return (
      <Stack height="100%">
         <InputBase
            multiline
            fullWidth
            minRows={10}
            maxRows={10}
            value={v}
            onChange={(e) => {
               setV(e.target.value)
               NoteFactory.set(noteId, {
                  ...note,
                  content: e.target.value
               })
            }}
         />
      </Stack>
   )
}

export default NoteModal
import React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CloseRounded from '@mui/icons-material/CloseRounded'

const Searchbar = () => {
   return (
      <Stack flex={1} maxWidth={500}>
         <TextField
            fullWidth
            size="small"
            placeholder='Search...'
            InputProps={{
               endAdornment: <InputAdornment position="end">
                  <CloseRounded />
               </InputAdornment>
            }}
         />
      </Stack>
   )
}

export default Searchbar
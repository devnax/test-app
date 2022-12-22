import { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import CourseGrid from '@src/Partials/Courses/CourseGrid'
import Typography from '@mui/material/Typography'
import CourseCategoryDropdown from '@src/Partials/Courses/CourseCategoryDropdown'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import timerAction from 'timer-action'
import SearchIcon from '@mui/icons-material/SearchRounded';


const Courses: NextPage = () => {
   const [searchText, setSearchText] = useState<string>("")
   const [q, setQ] = useState<string>("")
   const [cat, setCat] = useState<string>()

   return (
      <Layout title="Courses">
         <Typography
            variant="h2"
            fontSize={34}
            fontWeight={300}
            textAlign="center"
            p={3}
            bgcolor="background.default"
         >Courses</Typography>
         <Stack bgcolor="background.paper">
            <Container maxWidth="lg" sx={{ py: 6 }}>
               <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p={1}
                  mb={2}
               >
                  <CourseCategoryDropdown
                     value={cat}
                     onChange={(term) => {
                        if (term !== 'all') {
                           setCat(term.slug)
                        } else {
                           setCat('')
                        }
                     }}
                  />
                  <TextField
                     spellCheck={false}
                     size="small"
                     placeholder='Find course...'
                     value={searchText}
                     InputProps={{
                        startAdornment: <InputAdornment position="start">
                           <SearchIcon />
                        </InputAdornment>
                     }}
                     inputProps={{
                        autoCorrect: "false",
                     }}
                     onChange={(e: any) => {
                        setSearchText(e.target.value)
                        timerAction("search_course", () => {
                           setQ(e.target.value)
                        })
                     }}
                  />
               </Stack>
               <CourseGrid
                  hideCategory
                  category={cat}
                  search={q}
                  loadMore
               />
            </Container>
         </Stack>
      </Layout>
   )
}

export default Courses

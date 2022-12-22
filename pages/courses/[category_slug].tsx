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
import { useRouter } from 'next/router'


const Courses: NextPage = () => {
   const router = useRouter()
   const category_slug: any = router.query.category_slug || ""
   const [searchText, setSearchText] = useState<string>("")
   const [q, setQ] = useState<string>("")

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
                     value={category_slug}
                     onChange={(term) => {
                        if (term !== 'all') {
                           router.push(`/courses/${term.slug}`)
                        } else {
                           router.push(`/courses`)
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
                  category={category_slug}
                  search={q}
                  loadMore
               />
            </Container>
         </Stack>
      </Layout>
   )
}

export default Courses

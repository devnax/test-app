import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import CourseCarousel from '@src/Partials/Courses/CourseCarousel'
import Typography from '@mui/material/Typography'

const AmericanDiploma = () => {
   return (
      <Stack bgcolor="background.paper" minHeight={600} py={10}>
         <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h2" fontSize={35} fontWeight={600} mb={1}>GED - American High School Diploma</Typography>
            <Typography variant="body2" mb={1} fontSize={18} sx={{ opacity: .8 }}>The GED test, which consists of four subject tests, is an alternative to the US and Canadian high school diploma.</Typography>
            <CourseCarousel
               hideCategory
               category='GED'
            />
         </Container>
      </Stack>
   )
}

export default AmericanDiploma

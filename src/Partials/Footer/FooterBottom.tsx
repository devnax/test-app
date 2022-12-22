import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'

const FooterBottom = () => {
   return (
      <Stack p={1} >
         <Container>
            <Grid container spacing={2} alignItems="center">
               <Grid item xs={12} md={4}>
                  <Box>
                     <Typography
                        variant="h4"
                        fontWeight={600}
                        fontSize={14}
                        color="#fff"
                        textAlign="center"
                        sx={{ opacity: .8 }}
                     >
                        Copyright © 2021 PIE Academy
                     </Typography>
                  </Box>
               </Grid>
               <Grid item xs={12} md={8} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                  <Link href="/terms-condition">
                     <Button href="/terms-condition" sx={{ color: "#fff", opacity: .7, "&:hover": { opacity: 1 } }}>Terms & Condition</Button>
                  </Link>
                  <Link href="/privacy-policy">
                     <Button href="/privacy-policy" sx={{ color: "#fff", opacity: .7, "&:hover": { opacity: 1 } }}>Privacy Policy</Button>
                  </Link>
                  <Link href="/refund-policy">
                     <Button href="/refund-policy" sx={{ color: "#fff", opacity: .7, "&:hover": { opacity: 1 } }}>Refund Policy</Button>
                  </Link>
               </Grid>
            </Grid>
         </Container>
      </Stack >
   )
}


export default FooterBottom
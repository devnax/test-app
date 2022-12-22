import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialButtons = () => {
   return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
         <IconButton
            sx={{ bgcolor: 'rgba(0,0,0,.2)!important' }}
            href="https://www.facebook.com/PiEBDOfficial"
            target="_blank"
         >
            <FacebookIcon sx={{ color: "#fff" }} />
         </IconButton>
         <IconButton
            sx={{ bgcolor: 'rgba(0,0,0,.2)!important' }}
            href="https://www.youtube.com/channel/UCc7Nq-G9O5sNPo4BAu4xscw"
            target="_blank"
         >
            <YouTubeIcon sx={{ color: "#fff" }} />
         </IconButton>
         <IconButton
            sx={{ bgcolor: 'rgba(0,0,0,.2)!important' }}
            href="mailto:info@piebd.com"
         >
            <MailIcon sx={{ color: "#fff" }} />
         </IconButton>
         <IconButton
            sx={{ bgcolor: 'rgba(0,0,0,.2)!important' }}
            href="https://api.whatsapp.com/send?phone=+8801407054460"
            target="_blank"
         >
            <WhatsAppIcon sx={{ color: "#fff" }} />
         </IconButton>
         <IconButton
            sx={{ bgcolor: 'rgba(0,0,0,.2)!important' }}
            href="https://www.instagram.com/pie.internationaledu/"
            target="_blank"
         >
            <InstagramIcon sx={{ color: "#fff" }} />
         </IconButton>

         <IconButton
            sx={{ bgcolor: 'rgba(0,0,0,.2)!important' }}
            href="https://www.linkedin.com/company/pie-international-education"
            target="_blank"
         >
            <LinkedInIcon sx={{ color: "#fff" }} />
         </IconButton>
      </Stack>
   )
}


export default SocialButtons
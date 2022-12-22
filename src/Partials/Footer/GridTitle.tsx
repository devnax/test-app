import Typography from '@mui/material/Typography'
interface Props {
   label: string;
}
const GridTitle = ({ label }: Props) => {
   return (
      <Typography variant="h6" color="#fff" textTransform="uppercase" mb={2} sx={{ opacity: .9 }}>
         {label}
      </Typography>
   )
}


export default GridTitle
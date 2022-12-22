import Divider from '@mui/material/Divider';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'
import Link from 'next/link'

type LinkItemProps = {
   href: string;
   label: string;
} & ListItemButtonProps

const LinkItem = ({ href, label, divider, ...rest }: LinkItemProps) => {
   divider = divider === undefined || divider

   return <>
      <Link href={href}>
         <ListItemButton
            href={href}
            sx={{
               color: "#fff",
               borderRadius: 2,
               opacity: .7,
               '&:hover': {
                  opacity: 1
               }
            }}
            {...rest as any}
         >
            {label}
         </ListItemButton>
      </Link>
      {divider && <Divider />}
   </>
}

export default LinkItem
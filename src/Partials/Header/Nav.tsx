import React from 'react'
import Stack from '@mui/material/Stack'
import Button, { ButtonProps } from '@mui/material/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'


type LinkViewProps = {
   href: string,
   label: string;
   active?: boolean
} & ButtonProps

const LinkView = ({ href, label, active, ...btnProps }: LinkViewProps) => <Link href={href}>
   <Button href={href} color={active ? "primary" : "inherit"}  {...btnProps}>
      {label}
   </Button>
</Link>



interface Props {
   list?: boolean;
}

const Navbar = ({ list }: Props) => {
   const { pathname } = useRouter()

   return (
      <Stack
         direction={list ? "column" : "row"}
         alignItems="center"
         spacing={list ? 0 : 1}
         component="nav"
      >
         <LinkView
            fullWidth={list}
            href="/"
            label='Home'
            active={pathname === '/'} />
         <LinkView
            fullWidth={list}
            href="/courses"
            label='Courses'
            active={pathname.startsWith('/courses')}
         />
         {/* <LinkView
            fullWidth={list}
            href="/books"
            label='Books'
            active={pathname.startsWith('/books')}
         /> */}
         <LinkView
            fullWidth={list}
            href="/study-abroad"
            label='Study Abroad'
            active={pathname.startsWith('/study-abroad')}
         />
         {/* <LinkView
            fullWidth={list}
            href="/success-story"
            label='Success Story'
            active={pathname.startsWith('/success-story')}
         /> */}
         <LinkView
            fullWidth={list}
            href="/bookfreeclass"
            label='Book a free class'
            active={pathname.startsWith('/bookfreeclass')}
         />
         <LinkView
            fullWidth={list}
            href="/contact"
            label='Contact Us'
            active={pathname.startsWith('/contact')}
         />
      </Stack>
   )
}

export default Navbar
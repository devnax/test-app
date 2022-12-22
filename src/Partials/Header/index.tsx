import React from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Nav from './Nav'
import Image from 'next/image'
import Link from 'next/link'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import useMediaQuery from '@src/hooks/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import NoSsr from '@mui/material/NoSsr'
import MenuIcon from '@mui/icons-material/SegmentRounded';
import Dropdown from '@libs/Dropdown'
import Auth from '@src/System/Auth'

type Props = StackProps & {

}

const Header = (props: Props) => {
  const isMobile = useMediaQuery("sm")
  const auth = Auth.getAuth()
  return (
    <Stack p={1} bgcolor="background.paper" borderBottom={1} borderColor="divider" {...props}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {
            isMobile && <Stack>
              <IconButton size="small" onClick={(e: any) => {
                Dropdown.show(e.currentTarget, <Stack
                  bgcolor="background.paper"
                  boxShadow={2}
                  p={1}
                  borderRadius={2}
                >
                  <Nav list />

                </Stack>, { placement: "bottom-start" })
              }}>
                <MenuIcon />
              </IconButton>
            </Stack>
          }
          <Stack>
            <Link href="/" >
              <Stack>
                <Image
                  style={{ cursor: "pointer" }}
                  src="/images/logo.png"
                  alt='PIE'
                  width={90}
                  height={68}
                  quality={100}
                  priority
                />
              </Stack>
            </Link>
          </Stack>
          {
            !isMobile && <Nav />
          }
          <NoSsr>
            {
              auth ? <SignedIn /> : <SignedOut />
            }
          </NoSsr>
        </Stack>
      </Container>
    </Stack>
  )
}

export default Header
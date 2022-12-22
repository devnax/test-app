import React from 'react'
// import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
// import NotificationsIcon from '@mui/icons-material/NotificationsRounded';
import Dropdown from '@libs/Dropdown'
import CourseIcon from '@mui/icons-material/MenuBookRounded';
// import CertificateIcon from '@mui/icons-material/RedeemRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
// import SearchIcon from '@mui/icons-material/SearchRounded';
import Auth from '@src/System/Auth';
import { useRouter } from 'next/router';
// import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
// import BookIcon from '@mui/icons-material/BookOutlined';
// import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';

const SignedIn = () => {
   const router = useRouter()
   const auth = Auth.getAuth()


   return (
      <Stack
         direction="row"
         alignItems="center"
         justifyContent="flex-end"
         spacing={1}
      >
         {/* <IconButton size="small">
            <SearchIcon />
         </IconButton>
         <IconButton size="small">
            <NotificationsIcon />
         </IconButton> */}
         <Avatar
            src={auth.photo}
            alt={auth.firstname}
            sx={{
               width: 30,
               height: 30,
               cursor: "pointer",
               // boxShadow: "0 0 0 2px rgba(0,0,0,.3)"
            }}
            onClick={(e: any) => {
               Dropdown.show(e.currentTarget, [
                  // {
                  //    title: "My Account",
                  //    icon: <AccountIcon />,
                  //    onClick: () => {
                  //       Dropdown.hide()
                  //       router.push('/account')
                  //    }
                  // },

                  {
                     title: "My Courses",
                     icon: <CourseIcon />,
                     onClick: () => {
                        Dropdown.hide()
                        router.push('/account#courses')
                     }
                  },
                  // {
                  //    title: "My Books",
                  //    icon: <BookIcon />,
                  //    onClick: () => {
                  //       Dropdown.hide()
                  //       router.push('/account#books')
                  //    }
                  // },
                  // {
                  //    title: "Certificates",
                  //    icon: <CertificateIcon />,
                  //    onClick: () => {
                  //       Dropdown.hide()
                  //       router.push('/account#certificates')
                  //    }
                  // },
                  // {
                  //    title: "Favorites",
                  //    icon: <FavoriteIcon />,
                  //    divider: true,
                  //    onClick: () => {
                  //       Dropdown.hide()
                  //       router.push('/account#favorites')
                  //    }
                  // },
                  {
                     title: "Logout",
                     icon: <LogoutIcon />,
                     onClick: () => {
                        Auth.logout()
                        router.reload()
                     }
                  },
               ], { placement: "bottom-end" })
            }}
         />
      </Stack>
   )
}

export default SignedIn
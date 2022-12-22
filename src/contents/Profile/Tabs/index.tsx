import React, { useState, useEffect } from 'react'
import { Stack, Container } from '@mui/material'
import { useRouter } from 'next/router'
import CourseTab from './Courses'

const TabsPanel = () => {
   const [activeTab, setActiveTab] = useState("courses")
   const router = useRouter()
   const split = router.asPath.split("#")

   useEffect(() => {
      const active = split[1] || 'courses'
      if (active) {
         setActiveTab(active)
      }
   }, [split])

   let tab: any = ''
   switch (activeTab) {
      case 'courses':
         tab = <CourseTab />
         break;
   }

   return (
      <Stack py={5}>
         <Container>
            {/* <Tabs
               value={activeTab}
               onChange={(_e, v) => {
                  router.push(`${split[0]}#${v}`)
               }}
            >
               <Tab value="courses" label="Courses" sx={{ fontWeight: 700 }} />
               <Tab value="books" label="Books" sx={{ fontWeight: 700 }} />
               <Tab value="certificates" label="Certificates" sx={{ fontWeight: 700 }} />
               <Tab value="favorites" label="Favorites" sx={{ fontWeight: 700 }} />
            </Tabs> */}
            {tab}
         </Container>
      </Stack>
   )
}

export default TabsPanel
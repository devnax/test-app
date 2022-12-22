import React, { useState, memo } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Renderar from '..'
import { ContentData } from '../types'


const TabView = ({ childs, data }: ContentData) => {
   const [t, setT] = useState(Object.keys(data.tabs)[0])

   return <Box
      borderRadius={2}
      border={1}
      borderColor="divider"
   >
      <Tabs
         value={t}
         onChange={(_e, v) => setT(v)}
         sx={{
            borderBottom: 1,
            borderColor: "divider",
            '& button': {
               fontWeight: "600!important"
            }
         }}
      >
         {
            childs.map((tab: any, idx: number) => {
               const { title } = data.tabs[tab.tabId] || {}
               return <Tab
                  key={idx}
                  label={title}
                  value={tab.tabId}
               />
            })
         }
      </Tabs>
      {
         childs.map((tab: any, idx: number) => {
            if (tab.tabId !== t) return ''
            return <Box key={idx} p={1}>
               {
                  Renderar.render(tab.childs)
               }
            </Box>
         })
      }
   </Box>
}

export default memo(TabView)
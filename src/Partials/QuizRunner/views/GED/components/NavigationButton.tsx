import React from 'react'
import navigationIcon from '../Images/navigation.png'
import navigationOnIcon from '../Images/navigation_on.png'
import Button from './ButtonBase'
import Navigation from '../ModalViews/Navigation'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"

const NavigationButton = () => {
   return (
      <Button
         icon={navigationIcon.src}
         hoverIcon={navigationOnIcon.src}
         borderPosition='left'
         onClick={() => {
            QuizHandler.setMeta("showModal", {
               content: <Navigation />,
               title: "Navigation",
               height: 500,
               width: 800
            })
         }}
      >
         Navigation
      </Button>
   )
}

export default NavigationButton
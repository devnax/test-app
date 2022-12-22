import React from 'react'
import Stack from '@mui/material/Stack'
import Card, { CardProps } from '@libs/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme, alpha } from '@mui/material/styles'
import { useRouter } from 'next/router'
import System from '@src/System'
import CourseProgress from '@src/Partials/Courses/CourseProgress'
import moment from 'moment'

export interface CourseCardProps extends CardProps {
   slug: string;
   price: number | string;
   discount?: number | string;
   enrolled?: boolean;
   showExpire?: boolean;
   progress?: number;
   enrollData?: {
      id: number;
      course_id: number;
      user_id: number;
      enroll_date: string;
      expire_on: string;
      progress: number;
   }
}


const CourseCard = ({ slug, price, discount, enrolled, progress, enrollData, content, image, title, showExpire }: CourseCardProps) => {
   const theme = useTheme()
   const router = useRouter()
   const countryInfo = System.getUserCountry()

   let course_price: any = "Free"
   let regular_price: any = false

   if (countryInfo) {
      const _currency_rate = parseFloat(countryInfo.rate)
      if (price) {
         course_price = parseFloat(price as any) * _currency_rate
      }
      if (discount) {
         regular_price = parseFloat(discount as any) * _currency_rate
      }
   }

   let btnLabel = "Start this course"

   if (progress == 100) {
      btnLabel = "Completed"
   } else if (progress !== undefined) {
      btnLabel = "Continue"
   }
   return (
      <Card
         onClick={() => {
            router.push(`/course/${slug}`)
         }}
         imageSize={150}
         image={image}
         title={title}
         contentMaxLength={90}
         content={(showExpire && enrollData) ? <Stack>
            <Typography variant="body2" color="#333" fontSize={14} fontWeight={500}>
               Enroll Date: {moment(enrollData.enroll_date).format("MMM Do YY")}
            </Typography>
            <Typography variant="body2" color="#333" fontSize={14} fontWeight={500}>
               Expire Date: {moment(enrollData.expire_on).format("MMM Do YY")}
            </Typography>
         </Stack> : content}
         sx={{
            border: 1,
            borderColor: "divider",
            cursor: "pointer",
            userSelect: "none",
         }}
         titleProps={{
            color: theme.palette.mode === 'dark' ? "#eee" : "#333"
         }}
         contentProps={{
            color: "text.primary",
            fontWeight: 500,
            fontSize: 14
         }}
         footer={<Stack mt={1} spacing={2}>
            {
               !enrolled && <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5" color="primary.main">
                     {price === "Free" ? "Free" : `${countryInfo?.symbol}${course_price}`}
                  </Typography>
                  {discount && <Typography
                     component="del"
                     variant="subtitle1"
                     color="inherit"
                     fontSize={14}
                     fontWeight={500}
                     sx={{ opacity: .8 }}
                  >{countryInfo?.symbol + regular_price}</Typography>}
               </Stack>
            }
            {
               enrolled && <CourseProgress value={progress} />
            }
            <Button size="small" color="primary" sx={{
               fontWeight: 600,
               bgcolor: alpha(theme.palette.primary.main, .07)
            }}>
               {btnLabel}
            </Button>

         </Stack>}
      />
   )
}

export default CourseCard
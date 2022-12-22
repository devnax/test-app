import { PostRouter, PostQuery } from '@src/Routers'
import * as piece from 'json-piece'
import { CourseCardProps } from '@src/components/CourseCard'
import System from '@src/System';
import moment from 'moment'
import Enroll from '@src/Routers/Enroll';

interface CourseProps extends PostQuery {
   hideCategory?: boolean;
   category?: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async ({ category, ...query }: CourseProps) => {
   const q: any = {
      perpage: 30,
      page: 1,
      ...query,
      type: "course",
      status: "publish",
      include: {
         post_metas: {
            where: {
               key: "course_settings"
            },
            select: {
               key: true,
               value: true
            }
         },
         thumbnail: {
            select: {
               url: true
            }
         }
      }
   }

   if (category) {
      q.post_terms = {
         some: {
            term: {
               slug: category.toLowerCase()
            }
         }
      }
   }

   // const key = piece.toString(q)
   // const has = localStorage.getItem(key)

   // let courses;
   // if (has) {
   //    courses = piece.parse(has)
   // } else {
   // }
   const courses = await PostRouter.find(q)

   if (courses?.length) {
      // !has && localStorage.setItem(key, piece.toString(courses))

      const user_courses = await System.getUserCoursesInfo() || []
      const enrolled: any = {}
      for (let enroll of user_courses) {
         enrolled[enroll.course_id] = enroll
      }

      const course_formate: CourseCardProps[] = []

      for (let course of courses) {
         let enrollData = enrolled[course.id]
         if (enrollData) {
            var a = moment(enrollData.expire_on);
            var b = moment().utc();
            var d = a.diff(b, 'days');
            if (d < 0) {
               Enroll.delete({
                  course_id: course.id,
               })
               delete enrolled[enrollData.course_id]
               enrollData = null
               System.setMeta("user_courses", Object.values(enrolled))
            }
         }

         const item: CourseCardProps = {
            title: course.title,
            content: course.excerpt || "",
            image: (course as any).thumbnail?.url,
            slug: course.slug,
            price: "Free",
            enrolled: !!enrollData,
            progress: enrollData?.progress,
            enrollData
         }


         for (let meta of (course as any).post_metas) {
            if (meta.key === "course_settings") {
               try {
                  const parse = piece.parse(meta.value)
                  if (!parse.course_price || parse.course_price == '0') {
                     item.price = "Free"
                  } else {
                     item.price = parse.course_price
                  }
               } catch (err) { }
               break;
            }
         }
         course_formate.push(item)
      }

      return course_formate
   }
}
import { PostRouter, PostMeta } from '@src/Routers'
import * as piece from 'json-piece'
import System from '@src/System'
import Auth from '@src/System/Auth'
import Enroll from '@src/Routers/Enroll'
import LearnActivity from '@src/Routers/LearnActivity'
import moment from 'moment'
import QuizActivity from '@src/Routers/QuizActivity'
import { CourseSettingsProps } from '../Single/types'

const isFloat = (n: any) => Number(n) === n && n % 1 !== 0;


class Course {

   formateCoursePrice({ course_price, regular_price }: CourseSettingsProps) {
      regular_price = System.formatePrice(regular_price) as any
      return {
         ...System.formatePrice(course_price),
         regular_normal: regular_price.normal,
         regular_local: regular_price.local
      }
   }

   formateCourseSettings(course_settings: CourseSettingsProps) {
      const formate: any = {
         ...course_settings,
         price: this.formateCoursePrice(course_settings)
      }
      let { expire_days }: any = course_settings
      expire_days = parseInt(expire_days) as any
      if (!isNaN(expire_days)) {
         expire_days = isFloat(expire_days) ? expire_days.toFixed(2) : expire_days
      } else {
         expire_days = false
      }
      formate.expire_days = expire_days
      return formate
   }


   async getSingleCourse(slug: string) {
      let user_courses: any = await System.getUserCoursesInfo() || []

      const courses: any = await PostRouter.find({
         type: "course",
         status: "publish",
         slug,
         include: {
            post_metas: true,
            thumbnail: {
               select: { url: true }
            }
         }
      })

      if (courses && courses.length) {
         const course: any = courses[0]
         let enrolled = user_courses.find((c: any) => c.course_id === course.id)
         const count_res: any = await Enroll.count({ course_id: course.id })

         if (enrolled) {
            var a = moment(enrolled.expire_on);
            var b = moment().utc();
            var d = a.diff(b, 'days');
            if (d < 0) {
               Enroll.delete({
                  course_id: course.id
               })
               delete enrolled[enrolled.course_id]
               enrolled = null
               const up: any = []
               for (let uc of user_courses) {
                  if (uc.course_id != course.id) {
                     up.push(uc)
                  }
               }
               System.setMeta("user_courses", up)
            }
         }

         if (count_res.count) {
            course.enroll_count = count_res.count
         }
         if (enrolled) {
            course.enrolled = enrolled
            const activities = await LearnActivity.find({ enroll_id: enrolled.id })

            const formateActivities: any = []
            if (activities?.length) {
               for (let item of activities) {
                  formateActivities.push(item.topic_id)
               }
            }
            course.completed_topics = formateActivities
         }

         if (course.content) {
            try {
               course.content = piece.parse(course.content)
            } catch (err) { }
         }

         course.count_lectureItems = {
            lectures: 0,
            topics: 0,
            quizes: 0
         }

         course.thumbnail = course.thumbnail?.url
         course.course_outline = []
         if (course.post_metas && course.post_metas.length) {
            course.post_metas.forEach((meta: PostMeta) => {
               if (meta.key === 'course_settings' || meta.key === 'course_outline') {
                  try {
                     course[meta.key] = piece.parse(meta.value)

                     if (meta.key === 'course_settings') {
                        course.course_settings = this.formateCourseSettings(course[meta.key])
                     }

                     if (course[meta.key] && meta.key === 'course_outline') {
                        course.count_lectureItems.lectures = course[meta.key].length
                        course[meta.key].forEach((lecture: any) => {
                           if (lecture.items && lecture.items.length) {
                              lecture.items.forEach((item: any) => {
                                 if (item.type === 'topic') {
                                    course.count_lectureItems.topics += 1;
                                 } else {
                                    course.count_lectureItems.quizes += 1;
                                 }
                              })
                           }
                        })
                     }
                  } catch (err) { }
               }
            })
         }

         return course
      }
   }

   async getTopic(slug: string, course_id: number) {
      const topics = await PostRouter.find({
         slug,
         include: {
            post_metas: true,
            thumbnail: {
               select: { url: true, type: true }
            }
         }
      })

      if (topics && topics.length) {
         const topic: any = topics[0]
         if (topic.content) {
            try {
               topic.content = piece.parse(topic.content) || []
            } catch (err) { }
         }
         topic.thumbnail = topic.thumbnail

         for (let meta of topic.post_metas) {
            if (meta.key === 'quiz_data' && meta.value) {
               try {
                  topic.quiz_data = piece.parse(meta.value)
               } catch (err: any) {
               }
            }
         }
         const auth = Auth.getAuth()
         // get the quiz activities
         if (topic.type === 'quiz' && auth) {
            const reports = await QuizActivity.getReports(topic.id, course_id)
            topic.quiz_reports = reports
         }

         return topic
      }
   }
}

export default new Course
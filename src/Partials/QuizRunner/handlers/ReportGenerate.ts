import { Row } from "state-range";
import QuizHandler, { QuestionProps } from "./QuizHandler"
import { DragDropItemProps } from './DragDropHandler'
import DragDropHandler from "./DragDropHandler";
import { PostRouter } from "@src/Routers";
import * as piece from 'json-piece'
import { uid } from "tiny-utils";

type QProps = Row<QuestionProps>

interface Questions {
   value: any;
   correct: boolean;
}

interface Draggables {
   container: string | null
}

interface Essay {
   title: string;
   slug: string;
   grade: false | number
}

export interface ReportInfoProps {
   quiz_id: number;
   title: string;
   course_type: string;
   quiz_type: string;
   quiz_template: string;
   color: string;
   isReadyMock: boolean;
   total_point: number,
   correct: number,
   incorrect: number,
   time: string,
   score: number,
   questions: Questions[],
   draggables: Draggables[],
   essays: Essay[]
}


const SAT_BAND_SCORE: any = {
   "Evidence Based Reading": [
      { from: 0, to: 2, grade: 100 },
      { from: 3, to: 3, grade: 110 },
      { from: 4, to: 4, grade: 120 },
      { from: 5, to: 5, grade: 130 },
      { from: 6, to: 6, grade: 140 },
      { from: 7, to: 7, grade: 150 },
      { from: 8, to: 9, grade: 160 },
      { from: 10, to: 10, grade: 170 },
      { from: 11, to: 12, grade: 180 },
      { from: 13, to: 13, grade: 190 },
      { from: 14, to: 15, grade: 200 },
      { from: 16, to: 17, grade: 210 },
      { from: 18, to: 19, grade: 220 },
      { from: 20, to: 22, grade: 230 },
      { from: 23, to: 24, grade: 240 },
      { from: 25, to: 26, grade: 250 },
      { from: 27, to: 28, grade: 260 },
      { from: 29, to: 30, grade: 270 },
      { from: 31, to: 33, grade: 280 },
      { from: 34, to: 35, grade: 290 },
      { from: 36, to: 37, grade: 300 },
      { from: 38, to: 39, grade: 310 },
      { from: 40, to: 41, grade: 320 },
      { from: 42, to: 43, grade: 330 },
      { from: 44, to: 44, grade: 340 },
      { from: 45, to: 46, grade: 350 },
      { from: 47, to: 47, grade: 360 },
      { from: 48, to: 48, grade: 370 },
      { from: 49, to: 49, grade: 380 },
      { from: 50, to: 51, grade: 390 },
      { from: 52, to: 52, grade: 400 }
   ],
   "Math": [
      { from: 0, to: 1, grade: 200 },
      { from: 2, to: 2, grade: 210 },
      { from: 3, to: 3, grade: 230 },
      { from: 4, to: 4, grade: 250 },
      { from: 5, to: 5, grade: 270 },
      { from: 6, to: 6, grade: 280 },
      { from: 7, to: 7, grade: 300 },
      { from: 8, to: 8, grade: 320 },
      { from: 9, to: 9, grade: 340 },
      { from: 10, to: 10, grade: 350 },
      { from: 11, to: 11, grade: 360 },
      { from: 12, to: 12, grade: 370 },
      { from: 13, to: 13, grade: 390 },
      { from: 14, to: 14, grade: 410 },
      { from: 15, to: 15, grade: 420 },
      { from: 16, to: 16, grade: 430 },
      { from: 17, to: 17, grade: 450 },
      { from: 18, to: 18, grade: 460 },
      { from: 19, to: 19, grade: 470 },
      { from: 20, to: 20, grade: 480 },
      { from: 21, to: 21, grade: 490 },
      { from: 22, to: 22, grade: 500 },
      { from: 23, to: 23, grade: 510 },
      { from: 24, to: 24, grade: 520 },
      { from: 25, to: 25, grade: 530 },
      { from: 26, to: 26, grade: 540 },
      { from: 27, to: 27, grade: 550 },
      { from: 28, to: 28, grade: 560 },
      { from: 29, to: 29, grade: 570 },
      { from: 30, to: 30, grade: 580 },
      { from: 31, to: 31, grade: 590 },
      { from: 32, to: 32, grade: 600 },
      { from: 33, to: 33, grade: 600 },
      { from: 34, to: 34, grade: 610 },
      { from: 35, to: 35, grade: 620 },
      { from: 36, to: 36, grade: 630 },
      { from: 37, to: 37, grade: 640 },
      { from: 38, to: 38, grade: 650 },
      { from: 39, to: 39, grade: 660 },
      { from: 40, to: 40, grade: 670 },
      { from: 41, to: 41, grade: 680 },
      { from: 42, to: 42, grade: 690 },
      { from: 43, to: 43, grade: 700 },
      { from: 44, to: 44, grade: 710 },
      { from: 45, to: 45, grade: 710 },
      { from: 46, to: 46, grade: 720 },
      { from: 47, to: 47, grade: 730 },
      { from: 48, to: 48, grade: 730 },
      { from: 49, to: 49, grade: 740 },
      { from: 50, to: 50, grade: 750 },
      { from: 51, to: 51, grade: 750 },
      { from: 52, to: 52, grade: 760 },
      { from: 53, to: 53, grade: 770 },
      { from: 54, to: 54, grade: 780 },
      { from: 55, to: 55, grade: 790 },
      { from: 56, to: 56, grade: 790 },
      { from: 57, to: 57, grade: 800 },
      { from: 58, to: 58, grade: 800 }
   ],
   "Writing & Language": [
      { from: 0, to: 3, grade: 100 },
      { from: 4, to: 4, grade: 110 },
      { from: 5, to: 5, grade: 120 },
      { from: 6, to: 6, grade: 130 },
      { from: 7, to: 7, grade: 140 },
      { from: 8, to: 8, grade: 150 },
      { from: 9, to: 10, grade: 160 },
      { from: 11, to: 11, grade: 170 },
      { from: 12, to: 12, grade: 180 },
      { from: 13, to: 14, grade: 190 },
      { from: 15, to: 15, grade: 200 },
      { from: 16, to: 16, grade: 210 },
      { from: 17, to: 17, grade: 220 },
      { from: 18, to: 19, grade: 230 },
      { from: 20, to: 21, grade: 240 },
      { from: 22, to: 22, grade: 250 },
      { from: 23, to: 24, grade: 260 },
      { from: 25, to: 26, grade: 270 },
      { from: 27, to: 27, grade: 280 },
      { from: 28, to: 29, grade: 290 },
      { from: 30, to: 30, grade: 300 },
      { from: 31, to: 32, grade: 310 },
      { from: 33, to: 34, grade: 320 },
      { from: 35, to: 36, grade: 330 },
      { from: 37, to: 37, grade: 340 },
      { from: 38, to: 38, grade: 350 },
      { from: 39, to: 39, grade: 360 },
      { from: 40, to: 41, grade: 370 },
      { from: 42, to: 42, grade: 380 },
      { from: 43, to: 43, grade: 390 },
      { from: 44, to: 44, grade: 400 }
   ]
}


const IELTS_BAND_SCORE: any = {
   "Listening": [
      { from: 0, to: 10, grade: 0 },
      { from: 11, to: 12, grade: 4 },
      { from: 13, to: 15, grade: 4.5 },
      { from: 17, to: 17, grade: 5 },
      { from: 18, to: 22, grade: 5.5 },
      { from: 23, to: 25, grade: 6 },
      { from: 26, to: 29, grade: 6.5 },
      { from: 30, to: 31, grade: 7 },
      { from: 32, to: 34, grade: 7.5 },
      { from: 35, to: 36, grade: 8 },
      { from: 37, to: 38, grade: 8.5 },
      { from: 39, to: 40, grade: 9 },
   ],
   "Reading AC": [
      { from: 0, to: 3, grade: 0 },
      { from: 4, to: 5, grade: 2.5 },
      { from: 6, to: 7, grade: 3 },
      { from: 8, to: 9, grade: 3.5 },
      { from: 10, to: 12, grade: 4 },
      { from: 13, to: 14, grade: 4.5 },
      { from: 15, to: 18, grade: 5 },
      { from: 19, to: 22, grade: 5.5 },
      { from: 23, to: 26, grade: 6 },
      { from: 27, to: 29, grade: 6.5 },
      { from: 30, to: 32, grade: 7 },
      { from: 33, to: 34, grade: 7.5 },
      { from: 35, to: 36, grade: 8 },
      { from: 37, to: 38, grade: 8.5 },
      { from: 39, to: 40, grade: 9 },
   ],
   "Reading GT": [
      { from: 0, to: 5, grade: 0 },
      { from: 6, to: 8, grade: 0 },
      { from: 9, to: 11, grade: 0 },
      { from: 12, to: 14, grade: 0 },
      { from: 15, to: 18, grade: 0 },
      { from: 19, to: 22, grade: 0 },
      { from: 23, to: 26, grade: 0 },
      { from: 27, to: 29, grade: 0 },
      { from: 30, to: 31, grade: 0 },
      { from: 32, to: 33, grade: 0 },
      { from: 34, to: 35, grade: 0 },
      { from: 36, to: 36, grade: 0 },
      { from: 37, to: 38, grade: 0 },
      { from: 39, to: 39, grade: 0 },
      { from: 40, to: 40, grade: 0 }
   ]
}



const COLORS: any = {
   GED: {
      "MATH": "#0283aa",
      "RLA": "#8e6a96",
      "SCIENCE": "#e96560",
      "SOCIAL STUDIES": "#609962",
   },
   IELTS: {
      "LISTENING": "#54707B",
      "READING AC": "#ADE5F9",
      "READING GT": "#ADE5F9",
      "SPEAKING": "#5B5A56",
      "WRITING AC": "#F7EC93",
      "WRITING GT": "#F7EC93",
   }
}

class ReportGenerate {

   reports: ReportInfoProps = {
      quiz_id: 0,
      title: "",
      course_type: "",
      quiz_type: "",
      quiz_template: "",
      color: "",
      isReadyMock: false,
      total_point: 0,
      correct: 0,
      incorrect: 0,
      time: "",
      score: 0,
      questions: [],
      draggables: [],
      essays: []
   }

   async generate() {

      const settings = QuizHandler.getSettings()
      const quiz = QuizHandler.getQuizPost()
      const questions = QuizHandler.findAll()
      const colors = COLORS[settings.course_type] || {}
      const def_color = settings.template === 'ged' ? "#006DAA" : "#000"

      this.reports.quiz_id = quiz.id
      this.reports.title = quiz.title
      this.reports.isReadyMock = settings.isReadyMock
      this.reports.course_type = settings.course_type
      this.reports.quiz_type = settings.quiz_type
      this.reports.quiz_template = settings.template
      this.reports.color = colors[settings.quiz_type.toUpperCase()] || def_color

      for (let question of questions) {
         const point = question.data.point || 0
         this.reports.total_point += point

         const cb = (this as any)[question.type].bind(this)
         if (cb && await cb(question)) {
            QuizHandler.update({ correct: true }, question._id)
            if (question.type !== 'essay') {
               this.reports.score += point
            }
         }
      }

      const corrects = QuizHandler.find({ correct: true })
      const inCorrects = QuizHandler.find({ correct: false })
      const time = QuizHandler.getTime()
      this.reports.correct = corrects.length
      this.reports.incorrect = inCorrects.length
      if (time) {
         this.reports.time = time.offsetTime.time + "/" + time.initialTime.time
      }

      this.formateQuestions()
      this.formateDraggables()

      if (settings.isReadyMock && settings.course_type === 'IELTS') {
         if (IELTS_BAND_SCORE[settings.quiz_type]) {
            this.formateIELTSBandScore()
         } else {
            this.formateAdvanchPoint()
         }
      } if (settings.isReadyMock && settings.course_type === 'SAT') {
         if (SAT_BAND_SCORE[settings.quiz_type]) {
            this.formateSATBandScore()
         } else {
            this.formateAdvanchPoint()
         }
      } else {
         this.formateAdvanchPoint()
      }
      return this.reports
   }


   formateQuestions() {
      const questions = QuizHandler.findAll()
      for (let question of questions) {
         this.reports.questions.push({
            value: question.value,
            correct: question.correct
         })
      }
   }

   formateDraggables() {
      const all = DragDropHandler.findAll()
      for (let drag of all) {
         this.reports.draggables.push({
            container: drag.container
         })
      }
   }

   formateAdvanchPoint() {
      const settings = QuizHandler.getSettings()
      const correct = this.reports.correct
      const advanch_point = settings.advanch_points

      if (advanch_point && advanch_point.length) {
         this.reports.total_point = 0;
         for (let point of advanch_point) {
            let grade = parseInt((point as any).grade) || 0
            this.reports.total_point += grade
            if (correct >= point.from && correct <= point.to) {
               this.reports.score = grade
               break;
            }
         }
      }
   }

   formateIELTSBandScore() {
      const settings = QuizHandler.getSettings()
      const correct = this.reports.correct
      const band_scores = IELTS_BAND_SCORE[settings.quiz_type]
      this.reports.total_point = band_scores[band_scores.length - 1].grade

      for (let point of band_scores) {
         if (correct >= point.from && correct <= point.to) {
            this.reports.score = point.grade
            break;
         }
      }
   }

   formateSATBandScore() {
      const settings = QuizHandler.getSettings()
      const correct = this.reports.correct
      const band_scores = SAT_BAND_SCORE[settings.quiz_type]
      this.reports.total_point = band_scores[band_scores.length - 1].grade

      for (let point of band_scores) {
         if (correct >= point.from && correct <= point.to) {
            this.reports.score = point.grade
            break;
         }
      }
   }


   // QUESTIONS Methods

   async single_choice(question: QProps) {
      const { value, data } = question
      if (value === null || value === undefined) return false
      return data.options[value]?.correct
   }

   async multiple_choice(question: QProps) {
      const { value, data } = question
      if (value === null || value === undefined) return false
      let is = true
      let correctlength = 0;
      for (let i = 0; i < data.options.length; i++) {
         if (data.options[i].correct) {
            correctlength++;
            if (!value.includes(i)) {
               is = false
            }
         }
      }

      if (correctlength !== value.length) {
         return false
      }

      return is
   }

   async dropdown(question: QProps) {
      const { value, data } = question
      if (value === null || value === undefined) return false
      return data.options[value]?.correct
   }

   async fill_blank(question: QProps) {
      const { value, data } = question
      if (value === null || value === undefined) return false
      let is = true
      for (let i = 0; i < data.correctValues.length; i++) {
         let v = value[i]?.trim()
         const corrValArr = data.correctValues[i] as string[]
         if (!corrValArr.includes(v)) {
            is = false
         }
      }
      return is
   }

   async essay(question: QProps) {
      const { value, data } = question
      if (value === null || value === undefined) return true
      if (!QuizHandler.getAuth()) return

      const quiz = QuizHandler.getQuizPost()

      const created = await PostRouter.create({
         type: "essay",
         title: (data.title || "Essay " + quiz.title),
         slug: (data.title || "Essay " + quiz.title) + " - " + uid(),
         content: piece.toString({
            content: value,
            graded: false, // number
            comments: {},
            feedback: "",
            available_point: data.point,
            scores: {},
            question: data.questionContent,
            reportGroupId: null, // id will be update in QuizHandler
            quiz_id: quiz.id
         }),
         status: "publish"
      })

      if (created) {
         this.reports.essays.push({
            title: created.title,
            slug: created.slug,
            grade: false
         })
      }

      return true

   }

   async graph(question: QProps) {
      const { data, value } = question
      if (value === null || value === undefined) return false
      let is = true
      const fields = Object.values(data.fields)

      for (let i = 0; i < fields.length; i++) {
         let field: any = fields[i]
         if (!value[i]) {
            is = false
         } else {
            const val = value[i]
            let isLeft = val.left >= field.left && val.left <= (field.left + field.width)
            let isTop = val.top >= field.top && val.top <= (field.top + field.height)
            if (!(isLeft && isTop)) {
               is = false
            }
         }
      }

      return is
   }

   async sorting(question: QProps) {
      const { value } = question
      if (value === null || value === undefined) return false
      let is = true
      for (let i = 0; i < value.length; i++) {
         const index = value[i]
         if (index !== i) {
            is = false
         }
      }
      return is
   }

   async drag_drop(question: QProps) {
      const { data, value } = question
      if (value === null || value === undefined) return false
      let is = true

      for (let i = 0; i < data.items.length; i++) {
         let box: DragDropItemProps = data.items[i]
         const correctOption = box.correctOption
         if (!(value[box.id] && value[box.id] === correctOption.optionsId)) {
            is = false
         }
      }
      return is
   }
}


export default ReportGenerate
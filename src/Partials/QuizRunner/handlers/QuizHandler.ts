import { ReactElement } from 'react'
import { Store } from "state-range";
import { QuizDataProps, QuizSettingsProps } from "../types";
import { getTimer } from '@src/Partials/QuizRunner/helpers/useTimer'
import { Post, PostMeta, PostRouter } from "@src/Routers";
import Auth from '@src/System/Auth'
import DragDropHandler from './DragDropHandler'
import ReportGenerate from "./ReportGenerate";
import ReportFactory, { ReportFactoryProps } from "./ReportFactory";
import { StackProps } from '@mui/material/Stack'
import { getFullscreen } from '../helpers/useFullscreen';
import milliseconds from 'milliseconds'
import * as piece from 'json-piece'
import ResumeHandler from './ResumeHandler';
import QuizRouter from '@src/Routers/QuizActivity'
import QuizActivity from '@src/Routers/QuizActivity';
import Alert from '@src/libs/Alert';
import AudioPlayer, { getAudioPlayer } from '../helpers/AudioPlayer';
import type { DialogProps } from '@mui/material/Dialog';
import showTestEndedModal from '../views/IELTS/ModalViews/TestEndedDialog';
import { AnotationFactory } from '../views/Anotation';


export interface ModalProps extends Omit<StackProps, "title"> {
   title: string | ReactElement;
   content: ReactElement;
   width?: number;
   height?: number;
   draggable?: boolean;
   dialog?: boolean; // its for IELTS
   footer?: ReactElement; // its for IELTS
   layerProps?: Omit<DialogProps, "open"> // IELTS
   onClose?: () => void;
}

export interface QuizMetaProps {
   courseId: number;
   activityId: number;
   settings: QuizSettingsProps;
   quiz: Post;
   data: QuizDataProps[];
   screen: "home" | "listening" | "info" | "quiz" | "review_notice" | "review" | "report";
   finished: boolean;
   reviewMode: "all" | "unanswered" | "flagged";
   activePage: number;
   activeQuestion: number;
   showCalculator: boolean;
   showModal: ModalProps;
   initial_time: number; // miliseconds
   reportMode: boolean;
   loading: boolean;
   finish_selected?: boolean; // this is for stop inserting resum data when click on the finish button
   // template: "ielts" | "ged";
   // IELTS
   paginationVisible: boolean;
   typography_setting: {
      fontSize: number | string;
      color: string;
      bgcolor: string
   }
}


export interface QuestionProps {
   page: number;
   qid: string;
   seen: boolean;
   qindex: number;
   value: any; // answered valu
   flagged: boolean;
   data: { [key: string]: any };
   type: string;
   correct: boolean;
   loaded: boolean;
   collapse: boolean;
}


class GEDHandler extends Store<QuestionProps, QuizMetaProps> {


   parseQuizData(quiz: Post) {
      const metas: PostMeta[] = (quiz as any).post_metas
      const quiz_data = metas.find(meta => meta.key === "quiz_data")
      if (quiz_data) {
         try {
            const parse = piece.parse(quiz_data.value)
            const quiz = parse.quiz

            if (quiz) {
               return {
                  data: quiz.data,
                  settings: quiz.settings
               }
            }
         } catch (err: any) { }
      }
   }

   loadQuiz(quiz: Post) {
      const fullscreen = getFullscreen("quiz")
      const quiz_data = this.parseQuizData(quiz)

      if (quiz_data) {
         const { data, settings } = quiz_data
         this.reset()
         this.setMeta("activePage", 0)
         this.setMeta("activeQuestion", 1)
         this.setMeta("data", data)
         this.setMeta("settings", settings)
         this.setMeta("quiz", quiz)
         this.setMeta("finish_selected", false)
         this.setMeta("loading", false)
         this.setMeta("paginationVisible", true)
         this.deleteMeta("showModal")
         this.setMeta("initial_time", milliseconds.hours(settings.timeLimit.h) + milliseconds.minutes(settings.timeLimit.m))
         if (settings.listenings.length) {
            AudioPlayer(quiz.id, {
               sources: settings.listenings.map((s: any) => s.source)
            })
         }

         this.formateQuestions()
      } else {
         fullscreen && fullscreen.exit()
      }
   }

   reset() {
      const courseId = this.getMeta("courseId")
      const activityId = this.getMeta("activityId")
      const quiz = this.getMeta("quiz")
      const settings = this.getMeta("settings")
      this.deleteAll()
      this.deleteAllMeta()
      DragDropHandler.deleteAll()
      DragDropHandler.deleteAllMeta()
      this.setMeta("loading", false)
      this.setMeta("activePage", 0)
      this.setMeta("activeQuestion", 1)
      this.setMeta("courseId", courseId as any)
      this.setMeta("activityId", activityId as any)
      this.setMeta("quiz", quiz as any)
      this.setMeta("settings", settings as any)
   }

   exit() {
      this.reset()
      this.getFullScreen()?.exit()
   }

   getAuth() {
      return Auth.getAuth() || {
         unknown: true,
         firstname: "Unknown",
         email: "unknown@test.com"
      }
   }

   formateQuestions() {
      const data = this.getQuizData()
      for (let index = 0; index < data.length; index++) {
         let page = data[index]
         this.loadQuestions(page.childs, index)
      }
   }

   private loadQuestions(data: QuizDataProps[], pageIndex: number) {
      for (let d of data) {
         if (d.childs) {
            this.loadQuestions(d.childs, pageIndex)
         } else {
            if (d.data.qid) {
               const all = this.findAll()
               const count = all.length + 1
               this.insert({
                  page: pageIndex,
                  qid: d.data.qid,
                  value: null,
                  flagged: false,
                  qindex: count,
                  seen: count === 1,
                  data: d.data,
                  type: d.type,
                  correct: false,
                  loaded: false,
                  collapse: false,
               })
            } else if (d.type === "drag_drop") {
               d.data.items.forEach((item: any) => DragDropHandler.create(item))
            }
         }
      }
   }

   getQuestion(qid: string) {
      return this.findFirst({ qid })
   }

   getCurrentQuestion() {
      const activeIndex = this.getMeta("activeQuestion") || 1
      const all = this.findAll()
      if (all.length) {
         return all[activeIndex - 1]
      }
   }

   async finishQuiz() {
      this.setMeta("finish_selected", true)
      this.setMeta("loading", true)
      const auth = this.getAuth()
      const quiz = this.getQuizPost()
      const player = this.getAudioPlayer()
      const timer = getTimer(quiz.id)
      const courseId = this.getMeta("courseId")
      const { merge_quizes, result_message, template }: any = this.getSettings()
      let factories = Array.from(ReportFactory.values())

      if (!factories.length) {
         ReportFactory.set(quiz.id, {
            quiz_id: quiz.id,
            message: result_message,
            reports: null,
            quiz
         })
         if (merge_quizes && merge_quizes.length) {
            for (let m of merge_quizes) {
               ReportFactory.set(m.id, {
                  quiz_id: m.id,
                  message: '',
                  reports: null,
                  quiz: null
               })
            }
         }
      }

      timer && timer.stop()
      player && player.clear()

      const Report = new ReportGenerate()
      const report_generated = await Report.generate()
      const currentFactory = ReportFactory.get(quiz.id) as ReportFactoryProps
      ReportFactory.set(quiz.id, {
         ...currentFactory,
         message: result_message,
         reports: report_generated,
         quiz
      })

      if (!auth.unknown) {
         const groupId = this.getMeta("activityId") as any
         const _group_id = await QuizRouter.finish({
            group_id: groupId,
            quiz_id: quiz.id,
            reports: report_generated,
            course_id: courseId as number
         })
         this.setMeta("activityId", _group_id)

         // update essay report id
         if (report_generated.essays.length) {
            for (let essay_info of report_generated.essays) {
               const find = await PostRouter.find({ type: "essay", slug: essay_info.slug })
               if (find && find.length) {
                  const essay = find[0]
                  const parse = piece.parse(essay.content as string)
                  parse.reportGroupId = _group_id
                  await PostRouter.update({ content: piece.toString(parse) }, { id: essay.id })
               }
            }
         }
      }

      factories = Array.from(ReportFactory.values())
      const next = factories.find((f: ReportFactoryProps) => !f.reports)


      ResumeHandler.remove(quiz.id)
      AnotationFactory.clear()

      if (next) {
         // Load the quiz
         const find = await PostRouter.find({
            id: next.quiz_id,
            include: {
               post_metas: true
            }
         })
         this.setMeta("loading", false)
         if (find?.length) {
            if (template === 'ielts') {
               showTestEndedModal((() => {
                  ResumeHandler.remove(quiz.id)
                  this.loadQuiz(find[0])
               }).bind(this))
            } else {
               this.loadQuiz(find[0])
            }
            return;
         }
      }

      if (template === 'ielts') {
         showTestEndedModal((() => {
            ResumeHandler.remove(quiz.id)
            this.reset()
            this.setMeta("finished", true)
         }).bind(this))
      } else {
         this.reset()
         this.setMeta("finished", true)
      }

   }

   startQuiz() {
      const quiz = this.getQuizPost()
      const timer = getTimer(quiz.id)
      const player = this.getAudioPlayer()
      timer && timer.start()
      player && player.play()
      this.setMeta("screen", 'quiz')
   }


   activeQuestion(qid: string) {
      const answer = this.getQuestion(qid)
      const currentQuestion = this.getMeta("activeQuestion")
      if (answer && answer.qindex !== currentQuestion) {
         if (!answer.seen) {
            this.update({ seen: true }, answer._id)
         }
         this.setMeta("activePage", answer.page)
         this.setMeta("activeQuestion", answer.qindex)
      }
   }
   getTime() {
      const quiz = this.getQuizPost()
      const timer = getTimer(quiz.id)
      const time = timer?.getTime()
      return time
   }
   getQuizPost() {
      return this.getMeta("quiz") as Post
   }
   getSettings() {
      return this.getMeta("settings") as QuizSettingsProps
   }
   getQuizData() {
      return this.getMeta("data") as QuizDataProps[]
   }



   // Resume quiz
   async resumeQuiz(activityId: number, course_id: number) {
      const fullscreen = getFullscreen("quiz")
      const reports = await QuizActivity.getReport(activityId)
      const reportsItems = reports.merge_items

      for (let item of reportsItems) {
         ReportFactory.set(item.quiz_id, {
            quiz: null,
            quiz_id: item.quiz_id,
            message: "",
            reports: null
         })
      }


      for (let item of reportsItems) {
         // loading completed items
         const find = await PostRouter.find({
            id: item.quiz_id,
            include: {
               post_metas: true,
            }
         })

         if (find?.length && !item.finished) {
            // last item which need to continue
            const quiz = find[0]

            const has = ResumeHandler.has(quiz.id)
            if (has) {
               Alert.open('quiz', {
                  title: "Resume Your Test",
                  content: "Would you like to resume where you left off?",
                  type: "warning",
                  onClick: (is: boolean) => {
                     if (is) {
                        this.loadQuiz(quiz)
                        this.setMeta("courseId", course_id)
                        this.setMeta("activityId", item.group_id)
                        fullscreen?.open()

                        setTimeout(() => {
                           ResumeHandler.load(quiz.id)
                           this.startQuiz()
                        }, 100);
                     } else {
                        ResumeHandler.remove(quiz.id)
                        this.loadQuiz(quiz)
                        this.setMeta("courseId", course_id)
                        this.setMeta("activityId", item.group_id)
                        fullscreen?.open()
                     }
                  }
               }, { opacity: 1, })
            } else {
               this.loadQuiz(quiz)
               this.setMeta("courseId", course_id)
               this.setMeta("activityId", item.group_id)
               fullscreen?.open()
            }

            break
         }

         if (find && find.length) {
            const quiz = find[0]
            ReportFactory.set(quiz.id, {
               quiz,
               quiz_id: quiz.id,
               message: "",
               reports: piece.parse(item.reports),
            })
         }
      }
   }

   getFullScreen() {
      return getFullscreen("quiz")
   }

   getAudioPlayer() {
      const quiz = this.getQuizPost()
      const screen = this.getMeta("screen")
      if (screen === 'listening') {
         return getAudioPlayer("soundtrack")
      }
      return getAudioPlayer(quiz.id)
   }

}

export default new GEDHandler
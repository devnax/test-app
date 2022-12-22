import QuizHandler from "./QuizHandler"
import DragDropHandler from "./DragDropHandler";
import * as piece from 'json-piece'
import Alert from "@src/libs/Alert";
import { getTimer, TimerProps } from "../helpers/useTimer";
import { AnotationFactory } from "../views/Anotation";
import { NoteFactory, NoteProps } from "./NoteFactory";

interface Questions {
   value: any;
   correct: boolean;
}

interface Draggables {
   container: string | null
}

export interface ResumeCurrentItemType {
   currentTime: number;
   playerState?: { index: number; playedTime: number };
   questions: Questions[],
   draggables: Draggables[];
   anotations: { [id: string]: string };
   notes: { [id: string]: NoteProps };
}


class ResumeHandler {

   remove(quizId: number) {
      localStorage.removeItem(`quiz_${quizId}`)
   }

   set() {
      const finish_selected = QuizHandler.getMeta("finish_selected")
      const isStarted = QuizHandler.getMeta("screen") === "quiz"
      const isFinished = QuizHandler.getMeta("finished")
      const reportMode = QuizHandler.getMeta("reportMode")
      if (!isStarted || isFinished || finish_selected || reportMode) {
         return;
      }

      const quiz = QuizHandler.getQuizPost()
      const timer = getTimer(quiz.id) as TimerProps
      const questions = QuizHandler.findAll()
      const draggables = DragDropHandler.findAll()
      const player = QuizHandler.getAudioPlayer()
      const time = timer.getTime()

      const current: ResumeCurrentItemType = {
         currentTime: time.currentTime.milliseconds,
         playerState: player && player.getState(),
         questions: [],
         draggables: [],
         anotations: {},
         notes: {},
      }

      for (let question of questions) {
         current.questions.push({
            value: question.value,
            correct: question.correct
         })
      }

      for (let draggable of draggables) {
         current.draggables.push({
            container: draggable.container
         })
      }

      AnotationFactory.forEach((fac, key) => {
         current.anotations[key] = fac.content
      })

      NoteFactory.forEach((fac, key) => {
         current.notes[key] = fac
      })

      try {
         localStorage.setItem(`quiz_${quiz.id}`, piece.toString(current))
      } catch (_err) {
         console.error(_err)
      }
   }

   has(quizId: number) {
      const data = localStorage.getItem(`quiz_${quizId}`)
      return data ? true : false
   }

   async load(quizId: number) {
      try {
         const data = localStorage.getItem(`quiz_${quizId}`)
         if (data) {
            const current: ResumeCurrentItemType = piece.parse(data) || {}
            const questions = QuizHandler.findAll()
            const draggables = DragDropHandler.findAll()

            current.questions.forEach((question, idx) => {
               QuizHandler.update({ ...question }, questions[idx]._id)
            })

            current.draggables.forEach((draggable, idx) => {
               DragDropHandler.update({ ...draggable }, draggables[idx]._id)
            })

            Object.keys(current.anotations).forEach((key) => {
               AnotationFactory.set(key, {
                  content: current.anotations[key],
                  dispatch: () => { },
                  spans: []
               })
            })

            Object.keys(current.notes).forEach((key) => {
               NoteFactory.set(key, current.notes[key] as NoteProps)
            })

            if (current.currentTime) {
               const timer = getTimer(quizId)
               if (timer) {
                  timer.seekTo(current.currentTime)
               }
            }

            const player = QuizHandler.getAudioPlayer()

            if (current.playerState && player) {
               player.setIndex(current.playerState.index)
               player.seekTo(current.playerState.playedTime)
            }
         }
      } catch (_err) {
         Alert.open("resume", {
            title: "Load Problem",
            content: "Resum formate maybe broken. please, Start again.",
            onClick: (is) => {
               if (is) {
                  localStorage.removeItem(`quiz_${quizId}`)
               }
            }
         })
      }
   }
}


export default new ResumeHandler
import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '../../../components/ButtonBase'
import cutIcon from "../../../Images/cut.png"
import cutHoverIcon from "../../../Images/cut_hover.png"
import copyIcon from "../../../Images/copy.png"
import copyHoverIcon from "../../../Images/copy_hover.png"
import pasteIcon from "../../../Images/paste.png"
import pasteHoverIcon from "../../../Images/paste_hover.png"
import undoIcon from "../../../Images/undo.png"
import undoHoverIcon from "../../../Images/undo_hover.png"
import redoIcon from "../../../Images/redo.png"
import redoHoverIcon from "../../../Images/redo_hover.png"
import { QuestionProps } from './types'
import QuizHandler from '../../../../../handlers/QuizHandler'
import { UseUndoReturnType } from '@src/Partials/QuizRunner/helpers/useUndo'



function removeTxt(string: string, from: number, to: number) {
   return string.slice(0, from) + string.slice(to);
}


function getSel(txtarea: any) // JavaScript
{
   var start = txtarea.selectionStart;
   var finish = txtarea.selectionEnd;
   return txtarea.value.substring(start, finish);

}


interface Props extends QuestionProps {
   inputRef: any;
   undoHandler: UseUndoReturnType
}


const Header = (props: Props) => {
   const { inputRef, undoHandler } = props
   const { data } = props
   const answer = QuizHandler.getQuestion(data.qid)
   const reportMode = QuizHandler.getMeta("reportMode")
   if (!answer) {
      return <></>
   }
   return (
      <Stack
         direction="row"
         bgcolor="#80aee1"
         p={.5}
         alignItems="center"
      >
         <Button
            icon={cutIcon.src}
            hoverIcon={cutHoverIcon.src}
            sx={{
               fontSize: 15
            }}
            disabled={reportMode || false}
            onClick={() => {
               const start = inputRef.current.selectionStart;
               const end = inputRef.current.selectionEnd;
               const selTxt = getSel(inputRef.current)
               let val = (answer?.value || "") as string;

               selTxt && navigator.clipboard.writeText(selTxt)
               QuizHandler.update({ value: removeTxt(val, start, end) }, answer._id)
            }}
         >Cut</Button>
         <Button
            disabled={reportMode || false}
            icon={copyIcon.src}
            hoverIcon={copyHoverIcon.src}
            sx={{
               fontSize: 15
            }}
            onClick={() => {
               const selTxt = getSel(inputRef.current)
               selTxt && navigator.clipboard.writeText(selTxt)
            }}
         >Copy</Button>
         <Button
            disabled={reportMode || false}
            icon={pasteIcon.src}
            hoverIcon={pasteHoverIcon.src}
            sx={{
               fontSize: 15
            }}
            onClick={async () => {
               const txt: any = await navigator.clipboard.readText()
               const val = (answer?.value || "") + txt;
               QuizHandler.update({ value: val }, answer._id)
               undoHandler.add(val)
            }}
         >Paste</Button>
         <Button
            disabled={reportMode || false}
            icon={undoIcon.src}
            hoverIcon={undoHoverIcon.src}
            sx={{
               fontSize: 15
            }}
            onClick={() => {
               const val = undoHandler.undo()
               val !== undefined && QuizHandler.update({ value: val }, answer._id)
            }}
         >Undo</Button>
         <Button
            disabled={reportMode || false}
            icon={redoIcon.src}
            hoverIcon={redoHoverIcon.src}
            sx={{
               fontSize: 15
            }}
            onClick={() => {
               const val = undoHandler.redo()
               val !== undefined && QuizHandler.update({ value: val }, answer._id)
            }}
         >Redo</Button>
      </Stack>
   )
}

export default Header
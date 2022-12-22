/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import Box from '@mui/material/Box'
import highlightIcon from '../Images/highlight.png'
import noteIcon from '../Images/note.png'
import clearIcon from '../Images/clear-icon.png'
import clearAllIcon from '../Images/clear-all-icon.png'
import showNoteIcon from '../Images/show-note.png'
import Typography from '@mui/material/Typography'
import { AnotationMarker, AnotationFactory } from '@src/Partials/QuizRunner/views/Anotation'
import Dropdown from '@src/libs/Dropdown'
import { uid } from 'tiny-utils'
import { NoteFactory } from '@src/Partials/QuizRunner/handlers/NoteFactory'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import NoteModal from '../ModalViews/NoteModal'



const Li = ({ label, icon, ...rest }: { label: string; icon: string } & StackProps<"li">) => {
   return <Stack
      component="li"
      direction="row"
      alignItems="center"
      spacing={2}
      color="#000"
      px={.5}
      py={.5}
      sx={{
         cursor: "pointer",
         '&:hover': {
            color: "#fff",
            bgcolor: "#39f"
         }
      }}
      {...rest}
   >
      <img src={icon} alt={label} />
      <Typography variant="body1" fontSize={14} color="inherit">{label}</Typography>
   </Stack>
}


const createNoteSpan = (span: HTMLSpanElement) => {
   const noteId = "_" + uid()
   const noteBox = document.createElement("span")
   noteBox.id = noteId
   noteBox.setAttribute("class", "show-note")
   noteBox.setAttribute("data-note", "true")
   noteBox.style.left = "0";
   noteBox.style.right = "0";
   noteBox.style.width = "9px";
   noteBox.style.cursor = "pointer";
   noteBox.style.height = "9px";
   noteBox.style.display = "none";
   // noteBox.style.zIndex = "40";
   noteBox.style.position = "absolute";
   noteBox.style.background = `url(${showNoteIcon.src})`
   span.appendChild(noteBox)
   return noteBox
}

const showNote = (span: HTMLSpanElement) => {
   QuizHandler.deleteMeta("showModal")
   const childs = span.children as any
   let has;
   for (let child of childs) {
      if (child.nodeName === 'SPAN' && child.hasAttribute("data-note")) {
         has = child
         break;
      }
   }

   let noteBox = has || createNoteSpan(span)

   const noteId = noteBox.id
   const note = NoteFactory.get(noteId)
   NoteFactory.set(noteId, {
      title: "",
      content: "",
      ...(note || {})
   })

   setTimeout(() => {
      QuizHandler.setMeta("showModal", {
         title: "Note",
         draggable: true,
         content: <NoteModal noteId={noteId} />,
         width: 260,
         height: 350
      })
   }, 10);
}


const clickToShowNote = (facId: string) => {
   setTimeout(() => {
      const noteBoxes = document.querySelectorAll(`[data-anotation="${facId}"] [data-note]`)
      noteBoxes && noteBoxes.forEach((box: any) => {
         box.onclick = () => {
            showNote(box.parentElement)
         }
      })
   }, 10);
}


const ContextMenuBox = ({ children }: { children: ReactNode }) => {
   return (
      <Stack
         bgcolor="#eee"
         p={.5}
         boxShadow={5}
         border="1px solid #ddd"
         sx={{ userSelect: "none" }}
      >
         <Box component="ul" m={0} p={0}>
            {children}
         </Box>
      </Stack>
   )
}



export const initSpanContextMenu = () => {
   AnotationFactory.forEach((fac, facId) => {
      fac.spans && fac.spans.forEach(span => {
         span.oncontextmenu = (ev) => {
            Dropdown.showContextMenu(ev, <SpanContextMenu span={span} />)
         }
      })
      clickToShowNote(facId)
   })
}

const SpanContextMenu = ({ span }: { span: HTMLSpanElement }) => {
   return (
      <ContextMenuBox >
         <Li
            label="Note"
            icon={noteIcon.src}
            onClick={() => {
               showNote(span)
               const anotationId = AnotationMarker.getFactoryId(span)
               if (anotationId) {
                  AnotationMarker.restoreContent(anotationId)
                  clickToShowNote(anotationId)
               }
               Dropdown.hide()
            }}
         />
         <Li
            label="Clear"
            icon={clearIcon.src}
            onClick={() => {
               const markId = span.getAttribute('data-mark') as string
               AnotationMarker.removeMark(markId)
               NoteFactory.delete(markId)
               Dropdown.hide()
            }}
         />
         <Li
            label="Clear All"
            icon={clearAllIcon.src}
            onClick={() => {
               AnotationFactory.forEach((fac) => {
                  fac.spans && fac.spans.forEach(span => {
                     const markId = span.getAttribute('data-mark') as string
                     AnotationMarker.removeMark(markId)
                     NoteFactory.clear()
                  })
               })
               Dropdown.hide()
            }}
         />
      </ContextMenuBox>
   )
}


const MainContextMenu = () => {
   return (
      <ContextMenuBox >
         <Li
            label="Highlight"
            icon={highlightIcon.src}
            onClick={() => {
               AnotationMarker.mark({
                  onBeforeMark: (span) => {
                     span.style.background = 'yellow'
                     span.style.position = 'relative'
                  },
                  onAfterMark: () => {
                     AnotationFactory.forEach(fac => {
                        fac.spans.forEach(span => {
                           span.oncontextmenu = (ev) => {
                              Dropdown.showContextMenu(ev, <SpanContextMenu span={span} />)
                           }
                        })
                     })
                  }
               })
               Dropdown.hide()
            }}
         />
         <Li label="Note"
            icon={noteIcon.src}
            onClick={() => {
               AnotationMarker.mark({
                  onBeforeMark: (span) => {
                     span.style.background = 'yellow'
                     span.style.position = 'relative'
                  },
                  onAfterMark: (markSpans, factoryIds) => {
                     setTimeout(() => {
                        for (let span of markSpans) {
                           showNote(span)
                        }
                        factoryIds.forEach(id => {
                           AnotationMarker.restoreContent(id)
                           clickToShowNote(id)
                        })
                     }, 10);
                  }
               })

               Dropdown.hide()
            }}
         />
      </ContextMenuBox>
   )
}

export default MainContextMenu
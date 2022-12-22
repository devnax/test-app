import React, { useEffect, useState } from 'react'
import { Term, TermRouter } from '@src/Routers'
import Select, { SelectProps } from '@mui/material/Select'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Label from '@src/libs/Form/Label'

interface Props extends Omit<SelectProps, 'onChange'> {
   onChange: (value: Term | "all") => void;
   value?: string; // slug
   label?: string;
}

const CourseCategoryDropdown = ({ value, onChange, label, ...rest }: Props) => {
   const [val, setVal] = useState("all")
   const [categories, setCategories] = useState<Term[]>([])
   useEffect(() => {
      if (categories.length && value) {
         const item: any = categories.find(t => t.slug === value)
         setVal(item?.id || "all")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value])


   useEffect(() => {
      if (!categories.length) {
         (async () => {
            const terms = await TermRouter.find({
               type: "course_category"
            })
            if (terms?.length) {
               setCategories(terms)
               if (value) {
                  const item: any = terms.find(t => t.slug === value)
                  setVal(item?.id || "all")
               }
            }
         })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])



   return (
      <Box>
         <Label >{label || "Course category"}</Label>
         <Select
            size='small'
            sx={{
               minWidth: 200,
               bgcolor: "background.paper"
            }}
            {...rest}
            value={val}
            onChange={(e) => {
               const value: any = e.target.value;
               setVal(value)
               onChange && onChange(value === 'all' ? "all" : categories.find(c => c.id === value) as Term)
            }}
         >
            <MenuItem value="all">All</MenuItem>
            {
               categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
            }
         </Select>
      </Box>
   )
}

export default CourseCategoryDropdown
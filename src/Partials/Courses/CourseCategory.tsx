import { FC } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

interface CourseCategoryProps {
   hideCategory?: boolean;
   active: string;
   onChange: (t: string) => void;
}


interface CatItemProps {
   label: string;
   active?: boolean;
   onClick: () => void;
}

const CatItem = ({ label, active, onClick }: CatItemProps) => {
   return (
      <Button
         color={active ? "primary" : "inherit"}
         sx={{
            minWidth: 60,
            fontWeight: 600,
            fontSize: 16
         }}
         onClick={() => onClick()}
      >
         {label}
      </Button>
   )
}

const CourseCategory: FC<CourseCategoryProps> = ({ active, onChange }) => {

   return (
      <Stack
         direction="row"
         spacing={.5}
         flexWrap="wrap"
         width="100%"
      >
         <CatItem
            label="IELTS"
            active={active === "IELTS"}
            onClick={() => onChange("IELTS")}
         />
         {/* <CatItem
            label="GED"
            active={active === "GED"}
            onClick={() => onChange("GED")}
         /> */}
         <CatItem
            label="SAT"
            active={active === "SAT"}
            onClick={() => onChange("SAT")}
         />
         <CatItem
            label="GRE"
            active={active === "GRE"}
            onClick={() => onChange("GRE")}
         />
         <CatItem
            label="GMAT"
            active={active === "GMAT"}
            onClick={() => onChange("GMAT")}
         />
         <CatItem
            label="TOEFL"
            active={active === "TOEFL"}
            onClick={() => onChange("TOEFL")}
         />
         <CatItem
            label="SOP"
            active={active === "SOP"}
            onClick={() => onChange("SOP")}
         />
      </Stack>
   )
}

export default CourseCategory

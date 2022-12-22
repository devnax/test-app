import React, { useMemo, ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Typography from '@mui/material/Typography'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler';


const Item = ({ label, ...rest }: { label: string | ReactElement } & MenuItemProps) => {
   return (
      <MenuItem
         {...rest}
         sx={{
            p: 0,
            px: .5,
            borderRadius: "0!important",
            fontSize: 13,
            color: "#000",
            fontWeight: 400,
            '&:hover, &.Mui-selected': {
               bgcolor: "#2e8ef7!important",
               color: "#fff",
               '& *': {
                  color: "#fff"
               }
            }
         }}
      >{label}</MenuItem>
   )
}


type Val = string | number
interface SelectProps {
   value: Val;
   onChange: (value: Val) => void;
   placeholder?: string;
   error?: boolean;
   options: ({
      label: string | ReactElement;
      value: Val
   })[]
}

const Select = (props: SelectProps) => {
   const reportMode = QuizHandler.getMeta("reportMode")
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const { options, value, onChange, placeholder, error } = props
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const valueLabel = useMemo(() => options.find(o => o.value === value)?.label, [value])


   return (
      <div>
         <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            borderColor={error ? "rgb(105, 11, 0)" : "rgb(118,118,118)"}
            bgcolor={error ? "rgb(255, 143, 130)" : ""}
            borderRadius={.5}
            display="inline-flex"
            minWidth={80}
            onClick={(event: any) => setAnchorEl(event.currentTarget)}
            sx={{ cursor: "pointer" }}
         >
            <Typography
               component="div"
               variant="body1"
               color="initial"
               fontSize={12}
               px={.5}
               sx={{
                  whiteSpace: "nowrap",
                  opacity: valueLabel ? 1 : .5
               }}
            >
               {valueLabel || placeholder}
            </Typography>
            <ArrowDownIcon sx={{ fontSize: 20, color: "#000" }} />
         </Stack>
         <Menu
            anchorEl={anchorEl}
            open={reportMode === true ? false : open}
            onClose={() => setAnchorEl(null)}
            sx={{
               zIndex: 999999999,

               '& .MuiList-root': {
                  p: 0,
                  minWidth: 80
               }
            }}
            PaperProps={{ sx: { p: 0, borderRadius: 0 } }}
         >
            {
               options.map((opt, idx) => <Item
                  key={idx}
                  selected={value === opt.value}
                  onClick={() => {
                     setAnchorEl(null)
                     onChange(opt.value)
                  }}
                  label={opt.label}
               />)
            }

         </Menu>
      </div>
   );
}



export default Select
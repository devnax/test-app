import { useTheme, Breakpoint, Breakpoints } from '@mui/material/styles';
import _useMediaQuery from '@mui/material/useMediaQuery';

type cb = (breakpoints: Breakpoints) => string;
export type useMediaQueryProps = Breakpoint | cb

const useMediaQuery = (t: useMediaQueryProps) => {
   const theme = useTheme();
   const q = typeof t === 'string' ? theme.breakpoints.down(t) : t(theme.breakpoints)
   return _useMediaQuery(q);
}

export default useMediaQuery
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export default function CourseSkeleton() {
   return (
      <Stack>
         <Skeleton variant="rounded" height={160} />
         <Stack >
            <Skeleton height={30} sx={{ mt: 1 }} />
            <Skeleton height={10} sx={{ mt: 1 }} />
            <Skeleton height={10} sx={{ mt: .7 }} />
            <Skeleton height={10} width="60%" sx={{ mt: .7 }} />
            <Skeleton width="30%" height={25} sx={{ mt: 1.5 }} />
            <Skeleton variant="rounded" height={35} sx={{ mt: 2 }} />
         </Stack>
      </Stack >
   );
}

'use client';

import React, {FC, PropsWithChildren} from 'react';
import {Typography} from '@mui/material';
import BlueLink from '@/shared/ui/BlueLink';

type Props = {
   href: string,
   description?: string,
   className?: string
};

const Redirect: FC<PropsWithChildren<Props>> = ({href = '/register', className, children, description = ''}) => {
   return (
       <div className="flex gap-1 items-center justify-end">
          {
              description && <Typography className="text-sm text-slate-300" variant="subtitle2">
                 {description}
              </Typography>
          }
          <BlueLink href={href} className={className}>{children}</BlueLink>
       </div>
   );
};

export default Redirect;

'use client';

import React, {FC} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PrimaryButton from '@/shared/ui/PrimaryButton';
import {SCHEMAS} from '@/validation/schemas';
import {useSendFriendInvitationMutation} from '@/code/features/invitations/services/invitations.service';
import Input from '@/shared/ui/Input';
import {isSuccessfulMutation} from '@/shared/types/api';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslations} from 'next-intl';
import {BaseDialogProps} from '@/shared/models/props.model';

const FriendInvitationModal: FC<BaseDialogProps> = ({isOpen, onClose, onSubmit}) => {
   const [sendFriendInvitation, {data, isLoading, error}] = useSendFriendInvitationMutation();
   const t = useTranslations();
   const {control, handleSubmit} = useForm({
      resolver: yupResolver(SCHEMAS(t).sendFriendInvitation),
      defaultValues: {
         email: '',
      },
   });

   const handleSendInvitation: SubmitHandler<{ email: string }> = async ({ email }) => {
      const result = await sendFriendInvitation({friendEmail: email});
      if (isSuccessfulMutation(result)) {
         onSubmit?.(result.data.email);
      }
   };

   const handleCloseDialog = () => {
      onClose();
   };
   
   return (
       <div>
          <Dialog open={isOpen} onClose={handleCloseDialog}>
             <DialogTitle>
                {t('Common.inviteFriend')} ⛓
             </DialogTitle>
             <form onSubmit={handleSubmit(handleSendInvitation)} className='sm:w-[500px]'>
                <DialogContent sx={{pt: 0, pb: '5px'}}>
                   <Input control={control} name='email' placeholder="example@mail.com" label={t('Common.email')}/>
                </DialogContent>
                <DialogActions sx={{px: '24px', pb: '16px'}}>
                   <PrimaryButton type='submit' disabled={isLoading}>
                      {t('Common.send')}
                   </PrimaryButton>
                </DialogActions>
             </form>
          </Dialog>
       </div>
   );
};

export default FriendInvitationModal;

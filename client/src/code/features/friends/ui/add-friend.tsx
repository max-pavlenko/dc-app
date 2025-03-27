'use client';

import {FC, useState} from 'react'
import PrimaryButton from "@/shared/ui/PrimaryButton";
import FriendInvitationModal from "@/code/features/invitations/ui/friend-invitation-modal";
import {useTranslations} from 'next-intl';
import toast from 'react-hot-toast';

type Props = {};

const AddFriend: FC<Props> = ({}) => {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const t = useTranslations();

   const handleOpenAddFriendDialog = () => {
      setIsDialogOpen(true);
   };

   const handleCloseAddFriendDialog = () => {
      setIsDialogOpen(false);
   };
   
   const handleSendFriendInvitation = () => {
      toast.success(t('Notification.Success.inviteFriend'));
      handleCloseAddFriendDialog();
   }

   return (
       <>
          <PrimaryButton className='w-[90%] h-8 bg-[#3ba55d]' onClick={handleOpenAddFriendDialog}>
             {t('Pages.Dashboard.addFriend')}
          </PrimaryButton>
          <FriendInvitationModal
              isOpen={isDialogOpen}
              onSendFriendInvitation={handleSendFriendInvitation}
              onClose={handleCloseAddFriendDialog}
          />
       </>
   );
};

export default AddFriend;

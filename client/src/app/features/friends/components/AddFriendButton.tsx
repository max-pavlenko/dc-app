import {FC, useState} from 'react'
import PrimaryButton from "@/app/shared/ui/PrimaryButton";
import FriendInvitationModal from "@/app/features/invitations/components/FriendInvitationModal";

type Props = {};

const AddFriendButton: FC<Props> = ({}) => {
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const handleOpenAddFriendDialog = () => {
      setIsDialogOpen(true);
   };

   const handleCloseAddFriendDialog = () => {
      setIsDialogOpen(false);
   };

   return (
       <>
          <PrimaryButton className='w-[90%] h-8 bg-[#3ba55d]' onClick={handleOpenAddFriendDialog}>
             Add Friend
          </PrimaryButton>
          <FriendInvitationModal
              isOpen={isDialogOpen}
              onSendFriendInvitation={handleCloseAddFriendDialog}
              onClose={handleCloseAddFriendDialog}
          />
       </>
   );
};

export default AddFriendButton;

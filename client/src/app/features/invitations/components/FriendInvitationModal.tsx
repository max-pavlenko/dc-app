import React, {FC, FormEventHandler, useEffect, useState} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PrimaryButton from "@/app/shared/ui/PrimaryButton";
import {validateValues} from "@/validation/validateForm";
import {LoginFormValues} from "@/types/Login";
import {emailSchema, YupObject} from "@/validation/schemas";
import {useSendFriendInvitationMutation} from "@/app/features/invitations/services/InvitationsService";
import InputWithLabel from "@/app/shared/ui/InputWithLabel";
import {handleMutationResult} from "@/utils/handleMutationResult";

type Props = {
   isOpen: boolean,
   onClose: () => void;
   onSendFriendInvitation?: (mail: string) => void;
};

const FriendInvitationModal: FC<Props> = ({isOpen, onClose, onSendFriendInvitation = () => {},}) => {
   const [email, setEmail] = useState("");
   const [isFormValid, setIsFormValid] = useState(false);
   const [sendFriendInvitation, {data, isLoading, error}] = useSendFriendInvitationMutation();

   const handleSendInvitation: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();

      const result = await sendFriendInvitation({friendEmail: email});
      handleMutationResult(result, () => {
         onSendFriendInvitation(email);
      })
   };

   const handleCloseDialog = () => {
      onClose();
      setEmail("");
   };

   useEffect(() => {
      type EmailObj = Pick<LoginFormValues, 'email'>;
      validateValues<EmailObj>(YupObject.shape({email: emailSchema}), {email}).then(({isValid}) => {
         setIsFormValid(isValid);
      });
   }, [email]);

   return (
       <div>
          <Dialog open={isOpen} onClose={handleCloseDialog}>
             <DialogTitle>
                Invite a Friend ⛓
             </DialogTitle>
             <form onSubmit={handleSendInvitation} className='sm:w-[500px]'>
                <DialogContent sx={{pt: 0, pb: '5px'}}>
                   <InputWithLabel type="email" value={email} placeholder="Enter mail address"
                                   onChange={({value}) => {setEmail(value)}} label='email'/>
                </DialogContent>
                <DialogActions sx={{px: '24px', pb: '16px'}}>
                   <PrimaryButton type='submit' disabled={!isFormValid || isLoading}>Send</PrimaryButton>
                </DialogActions>
             </form>
          </Dialog>
       </div>
   );
};

export default FriendInvitationModal;

export type BaseDialogProps = {
   isOpen: boolean,
   onClose: () => void;
   onSubmit?: (mail: string) => void;
};

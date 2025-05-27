type AddNewNotesProps = {
    showNotesDialogBox: boolean;
    setShowNotesDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddNewNotes({ showNotesDialogBox, setShowNotesDialogBox }: AddNewNotesProps) {
    if(showNotesDialogBox === true){
        setShowNotesDialogBox(false)
    }
}

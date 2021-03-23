import React, {useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {deleteNoteContext} from '../../MainContainer';

function DialogWindow(props){
    const deleteNote = useContext(deleteNoteContext);
    const {openDialogWindow, handleCloseDeleteNote} = props;
    return (
        <Dialog 
            open={openDialogWindow}
            onClose={() => handleCloseDeleteNote(openDialogWindow)} 
            aria-labelledby='form-dialog-title'>
            <DialogTitle>Delete note</DialogTitle>

            <DialogContent>
                <DialogContentText style={{color: 'rgb(71, 71, 71)'}}>
                    Are you sure you want to delete this note?
                </DialogContentText>
        
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => {
                        deleteNote();
                        handleCloseDeleteNote(openDialogWindow);
                    }} 
                >
                    Yes
                </Button>
                <Button 
                    onClick={() => handleCloseDeleteNote(openDialogWindow)} 
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogWindow;
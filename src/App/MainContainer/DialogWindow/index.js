import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function DialogWindow(props){
    const {openDialogWindow, handleClickDeleteNode} = props;    
    return (
        <Dialog 
            open={openDialogWindow}
            onClose={() => handleClickDeleteNode(openDialogWindow)} 
            aria-labelledby='form-dialog-title'>
            <DialogTitle>Delete note</DialogTitle>

            <DialogContent>
                <DialogContentText style={{color: 'rgb(71, 71, 71)'}}>
                    Are you sure you want to delete this note?
                </DialogContentText>
        
            </DialogContent>
            <DialogActions>
                <Button 
                    //onClick={} 
                >
                    Yes
                </Button>
                <Button 
                    onClick={() => handleClickDeleteNode(openDialogWindow)} 
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogWindow;
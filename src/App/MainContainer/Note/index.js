import React, {useState, useRef, useEffect} from 'react';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import IconButton from '@material-ui/core/IconButton';
import EditNoteTextArea from './EditNoteTextArea';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import Tag from './Tag';
import DialogWindow from '../DialogWindow';

function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               callback(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

function Note(props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialogWindow, setOpenDialogWindow] = useState(false);
    const wrapperRef = useRef(null);
    const {noteText, noteTags} = props;
    
    useOutsideAlerter(wrapperRef, setOpenEdit);

    function handleCloseDeleteNote(initState){
        setOpenDialogWindow(!initState);
    }
    
    return (
        <div 
            className='note-container'
            ref={wrapperRef}
        >
            {openEdit ? <EditNoteTextArea noteText={noteText}/> : 
                <div className='note-text-container'>
                    <p className='note-text'> 
                        {noteText}
                    </p>
                </div>
            }
            
            <div className='tags-container'>
                {noteTags.map((tag, index) => {
                    return (
                    <Tag 
                        tag={tag}
                        isOpenEditPane={openEdit} 
                        key={tag + index}/>)
                })
                }
            </div>
            <div className='options-container'>
                    <IconButton onClick = {() => setOpenEdit(!openEdit)}>
                        {openEdit ? <DoneRoundedIcon/> : <EditRoundedIcon />}
                    </IconButton>
                    <IconButton onClick = {() => setOpenDialogWindow(true)}>
                        <DeleteForeverRoundedIcon/>
                    </IconButton>
            </div>
            <DialogWindow 
                openDialogWindow={openDialogWindow} 
                handleCloseDeleteNote={handleCloseDeleteNote}
            />
        </div>
    )
}

export default Note;
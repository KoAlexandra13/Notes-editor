import React, {useState, useRef, useEffect} from 'react';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import IconButton from '@material-ui/core/IconButton';
import EditNoteTextArea from './EditNoteTextArea';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import Tag from './Tag';
import DialogWindow from '../DialogWindow';
import $ from 'jquery'; 

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

export default function Note(props) {
    const {note, index, saveEditNote} = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialogWindow, setOpenDialogWindow] = useState(false);
    const [tags, setTags] = useState(note.tags);
    const wrapperRef = useRef(null);
    
    useOutsideAlerter(wrapperRef, setOpenEdit);

    function handleCloseDeleteNote(initState){
        setOpenDialogWindow(!initState);
    }

    function editNote() {
        const noteText = $('textarea[name="edit-note-textarea"]').val();
        const wordsArray = noteText.split(' ');
        const lastWord = wordsArray[wordsArray.length - 1];
        let newTagsArr = [...tags]; 

        if(lastWord !== '' && lastWord[0] === '#'){
            newTagsArr.push(lastWord);
        }

        const noteData = {
            "text": noteText,
            "tags": newTagsArr 
        }

        setOpenEdit(!openEdit);
        saveEditNote('edit', noteData, index);    
    }

    function changeNoteText(e){
        const enteredText = e.target.value;
        const wordArray = enteredText.split(' ').slice(0, -1);

        const tagsArray = wordArray.filter(word => word[0] === '#');
        setTags(tagsArray);
    }
    
    return (
        <div className='note-container' ref={wrapperRef}>
            {openEdit ? <EditNoteTextArea changeNoteText={changeNoteText} noteText={note.text}/> : 
                <div className='note-text-container'>
                    <p className='note-text'> 
                        {note.text}
                    </p>
                </div>
            }
            
            <div className='tags-container'>
                {(openEdit ? tags : note.tags).map((tag, index) => {
                    return (
                    <Tag 
                        tag={tag}
                        isOpenEditPane={openEdit} 
                        key={tag + index}/>)
                })
                }
            </div>
            <div className='options-container'>
                    <IconButton onClick = {() => openEdit ? editNote() : setOpenEdit(!openEdit)}>
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
import React, {useState, useRef, useEffect} from 'react';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import IconButton from '@material-ui/core/IconButton';
import EditNoteTextArea from './EditNoteTextArea';

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
    }, [ref]);
}

function Note() {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setOpen);

    return (
        <div 
            className='note-container'
            ref={wrapperRef}
        >
            {open ? <EditNoteTextArea/> : 
                <div>
                    <p> 

                    </p>
                </div>
            }
            
            <div className='tags-container'>

            </div>
            <div className='options-container'>
                <IconButton onClick = {() => {setOpen(true)}}>
                    <EditRoundedIcon />
                </IconButton>
                <IconButton>
                    <DeleteForeverRoundedIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Note;
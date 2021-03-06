import React, {useState, useRef, useEffect} from 'react';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import IconButton from '@material-ui/core/IconButton';
import EditNoteTextArea from './EditNoteTextArea';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import Tag from './Tag';
import DialogWindow from '../DialogWindow';
import $ from 'jquery'; 
import _ from 'lodash'

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

function tagsHighlighting(array) {
    let html = "";
    array.forEach(val => {
        if (val[0] === '#'){
            html += "<span class='statement'>" + val + "&nbsp;</span>";
        }
        else
            html += "<span class='other'>" + val + "&nbsp;</span>"; 
        }
    );
    return html;
}

function setCursorPostionToEndOfText(nodeName){
    let child = $(nodeName).children();
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(child[child.length-1], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

export default function Note(props) {
    const {note, saveEditNote} = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialogWindow, setOpenDialogWindow] = useState(false);
    const [tags, setTags] = useState(note.tags);
    const wrapperRef = useRef(null);
    const [text, setText] = useState(note.text);
    
    useOutsideAlerter(wrapperRef, setOpenEdit);

    function handleCloseDeleteNote(initState){
        setOpenDialogWindow(!initState);
    }

    function editNote() {
        const wordsArray = $('div[id="edit-note-textarea"]').text().replace(/[\s]+/g, " ").trim().split(" ");
        const lastWord = wordsArray[wordsArray.length - 1];
        let newTagsArr = [...tags]; 

        if(lastWord[0] === '#' && lastWord !== tags[tags.length - 1]){
            newTagsArr.push(lastWord);
        }

        const noteData = {
            "text": wordsArray.join(' '),
            "tags": newTagsArr 
        }

        setOpenEdit(!openEdit);
        saveEditNote('edit', noteData, note.id);    
    }

    function changeNoteText(e){
        if (e.keyCode === 32){
            const wordArray = $(`#${e.target.id}`).text().replace(/[\s]+/g, " ").trim().split(" ");
            const tagsArray = wordArray.filter(word => word[0] === '#');

            setTags(tagsArray);

            let newHTML = tagsHighlighting(wordArray);

            $(`#${e.target.id}`).html(newHTML);

            setCursorPostionToEndOfText(`#${e.target.id}`);
        }    
    }

    function deleteTag(tag){
        let newTagsList = _.remove(tags, (el) => el !== tag);
        setTags(newTagsList);
        const position = text.search(tag);
        setText(text.slice(0, position) + text.slice(position + 1));
    }
    
    return (
        <div className='note-container' ref={wrapperRef}>
            {openEdit ? <EditNoteTextArea changeNoteText={changeNoteText} noteText={text}/> : 
                <div className='note-text-container'>
                    <p className='note-text'> 
                        {note.text.split(' ').map((text, index) => {
                            const color = text[0] === '#' ? '#005eff' : 'black'
                            return (
                                <span key={text[0] + index} style={{ color: color, display: 'inline'}}>
                                    {text} &nbsp;
                                </span>
                            )
                        })}
                    </p>
                </div>
            }
            
            <div className='tags-container'>
                {(openEdit ? tags : note.tags).map((tag, index) => {
                    return (
                    <Tag
                        deleteTag={deleteTag}
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
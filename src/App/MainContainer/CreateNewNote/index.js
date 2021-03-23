import React, { useEffect, useRef, useState } from 'react';
import Tag from '../Note/Tag';
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

export default function CreateNewNote(props) {
    const [tags, setTags] = useState([]);
    const {closeCreateNotePane, saveNewNote} = props;
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeCreateNotePane);

    function changeNewNoteText(e){
        const enteredText = e.target.value;
        const wordArray = enteredText.split(' ').slice(0, -1);

        const tagsArray = wordArray.filter(word => word[0] === '#');
        setTags(tagsArray);
        e.preventDefault();
        return;
    }

    function createNewNote() {
        const noteText = $('textarea[name="create-note-textarea"]').val();
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

        closeCreateNotePane(false)
        saveNewNote('create', noteData);
    }

    return (
        <div 
            className='note-container'
            ref={wrapperRef}
        >
            <div className='note-create-text-container'>
                <textarea 
                    rows='5' 
                    name='create-note-textarea'
                    onChange={(e) => changeNewNoteText(e)}/>
            </div>

            <div className='tags-container'>
                {tags && tags.map((tag, index) => {
                    return (
                        <Tag 
                            tag={tag}
                            isOpenEditPane={true} 
                            key={tag + index}/>)
                        })
                }
            </div>

            <div className='options-container'>
                <button 
                    onClick={() => closeCreateNotePane(false)}
                    className='close-create-note-pane'>
                    <p>Close</p>
                </button>
                <button
                    onClick={() => createNewNote()} 
                    className='create-note'>
                    <p>Create note</p>
                </button>
            </div>
        </div>
    )
}
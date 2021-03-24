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

    function createNewNote() {
        const wordsArray = $('div[id="create-note-textarea"]').text().replace(/[\s]+/g, " ").trim().split(" ");
        const lastWord = wordsArray[wordsArray.length - 1];
        let newTagsArr = [...tags]; 

        if(lastWord[0] === '#' && lastWord !== tags[tags.length - 1]){
            newTagsArr.push(lastWord);
        }

        const noteData = {
            "text": wordsArray.join(' '),
            "tags": newTagsArr 
        }

        closeCreateNotePane(false)
        saveNewNote('create', noteData);
    }

    function changeNoteText(e){
        if (e.keyCode === 32){
            const wordArray = $(`#${e.target.id}`).text().replace(/[\s]+/g, " ").trim().split(" ");
            const tagsArray = wordArray.filter(word => word[0] === '#');

            setTags(tagsArray);

            let newHTML = "";
            wordArray.forEach(val => {
                if (val[0] === '#'){
                    newHTML += "<span class='statement'>" + val + "&nbsp;</span>";
                }
                else
                    newHTML += "<span class='other'>" + val + "&nbsp;</span>"; 
                }
            );

            $(`#${e.target.id}`).html(newHTML);

            var child = $(`#${e.target.id}`).children();
            var range = document.createRange();
            var sel = window.getSelection();
            range.setStart(child[child.length-1], 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }    
    }

    return (
        <div 
            className='note-container'
            ref={wrapperRef}
        >
            <div className='note-create-text-container'>
            <div 
                id='create-note-textarea' 
                contentEditable={true}
                suppressContentEditableWarning={true} 
                onKeyUp={(e) => changeNoteText(e)}/>
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
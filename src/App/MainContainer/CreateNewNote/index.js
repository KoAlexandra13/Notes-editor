import React, { useEffect, useRef, useState } from 'react';
import Tag from '../Note/Tag';
import $ from 'jquery'; 
import _ from 'lodash';

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

            let newHTML = tagsHighlighting(wordArray);

            $(`#${e.target.id}`).html(newHTML);

            setCursorPostionToEndOfText(`#${e.target.id}`);
            
        }    
    }

    function deleteTag(tag){
        let newTagsList = _.remove(tags, (el) => el !== tag);
        const node = 'div[id="create-note-textarea"]';
        setTags(newTagsList);
        const text = $(node).text().replace(/[\s]+/g, " ").trim();
        const position = text.search(tag);
        const wordArray = (text.slice(0, position) + text.slice(position + 1)).split(' ');

        let newHTML = tagsHighlighting(wordArray);

        $(node).html(newHTML);

        setCursorPostionToEndOfText(node);

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
                onKeyUp={(e) => changeNoteText(e)}
            />
            </div>

            <div className='tags-container'>
                {tags && tags.map((tag, index) => {
                    return (
                        <Tag
                            deleteTag={deleteTag} 
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
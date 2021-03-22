import React, { useEffect, useRef } from 'react';

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

function CreateNewNode(props) {
    const {closeCreateNotePane} = props;
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeCreateNotePane);

    return (
        <div 
            className='note-container'
            ref={wrapperRef}
        >
            <div className='note-create-text-container'>
                <textarea rows='5' name='create-note-textarea'/>
            </div>

            <div className='tags-container'>
                
            </div>

            <div className='options-container'>
                <button 
                    onClick={() => closeCreateNotePane(false)}
                    className='close-create-note-pane'>
                    <p>Close</p>
                </button>
                <button className='create-note'>
                    <p>Create note</p>
                </button>
            </div>
        </div>
    )
}

export default CreateNewNode;
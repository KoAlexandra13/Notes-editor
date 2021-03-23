import React from 'react'

export default function EditNoteTextArea(props) {
    const {changeNoteText} = props;
    return( 
        <div className='note-edit-text-container'>
            <div 
                id='edit-note-textarea' 
                contentEditable={true}
                suppressContentEditableWarning={true} 
                onKeyUp={(e) => changeNoteText(e)}
            >
                {props.noteText.split(' ').map((text, index) => {
                    const color = text[0] === '#' ? '#005eff' : 'black'
                    return (
                        <span key={text[0] + index} style={{ color: color, display: 'inline'}}>
                            {text} &nbsp;
                        </span>
                    )
                })}
            </div>        
        </div>
    )
}

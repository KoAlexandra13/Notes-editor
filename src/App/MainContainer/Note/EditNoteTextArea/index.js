import React, {useState} from 'react'

function EditNoteTextArea(props) {
    const [text, setText] = useState(props.noteText);
    return( 
        <div className='note-edit-text-container'>
            <textarea 
                rows='5'
                name='note-textarea' 
                value={text}
                onChange={(e) => (setText(e.target.value))}/>
        </div>
    )
}

export default EditNoteTextArea;
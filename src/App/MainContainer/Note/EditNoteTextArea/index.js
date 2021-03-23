import React, {useState} from 'react'

export default function EditNoteTextArea(props) {
    const [text, setText] = useState(props.noteText);
    const {changeNoteText} = props;
    return( 
        <div className='note-edit-text-container'>
            <textarea 
                rows='5'
                name='edit-note-textarea' 
                value={text}
                onChange={(e) => {
                        setText(e.target.value);
                        changeNoteText(e);
                    }
                }
                />
        </div>
    )
}

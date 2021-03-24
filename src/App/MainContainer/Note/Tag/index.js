import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export default function Tag(props) {
    const {tag, isOpenEditPane, deleteTag} = props;
    return (
        <div 
            className='tag'>
            <p>{tag}</p>
            {isOpenEditPane && 
                <button 
                    className='delete-tag'
                    onClick={() => {deleteTag(tag)}}>
                    <CloseRoundedIcon style={{fontSize: 'medium', color: 'red'}}/>
                </button>
            }
        </div>
    )
}
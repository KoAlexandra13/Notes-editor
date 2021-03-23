import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

function Tag(props) {
    const {tag, isOpenEditPane} = props;
    return (
        <div 
            className='tag'>
            <p>{tag}</p>
            {isOpenEditPane && 
                <button className='delete-tag'>
                    <CloseRoundedIcon style={{fontSize: 'medium', color: 'red'}}/>
                </button>
            }
        </div>
    )
}

export default Tag;
import React from 'react'
import AddRoundedIcon from '@material-ui/icons/AddRounded';

function Header() {
    return (
        <div className='main-header-container'>
            <h2>
                Notes editor
            </h2>
            <div className='add-note-container'>
                <button>
                    <div className='icon-container'>
                        <AddRoundedIcon 
                            style={
                                {color: 'white', 
                                fontSize: 'xx-large', 
                                fontWeight: 'bolder'}
                            }/>
                    </div>
                    <p>Add note</p>
                </button>
            </div>
        </div>
    )
}

export default Header;
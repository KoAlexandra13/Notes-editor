import React, { useState } from 'react';
import Header from './Header';
import Note from './Note';
import { data } from './data.json';
import Filter from './Filter';
import CreateNewNode from './CreateNewNote';

function MainContainer() {
    const [openCreatePane, setOpenCreatePane] = useState(false);
    return(
        <>
            <Header openCreateNotePane={setOpenCreatePane}/>
            <Filter />
            {openCreatePane && <CreateNewNode closeCreateNotePane={setOpenCreatePane}/>}
            {data.map((note, index) => {
                return <Note 
                    noteText={note.text}
                    noteTags={note.tags}
                    key={'note' + index}
                    />
            })}
        </>
    )
}

export default MainContainer;
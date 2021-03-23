import React, { useState } from 'react';
import Header from './Header';
import Note from './Note';
import { data } from './data.json';
import Filter from './Filter';
import CreateNewNote from './CreateNewNote';

export const deleteNoteContext = React.createContext(null);

function MainContainer() {
    const [openCreatePane, setOpenCreatePane] = useState(false);
    const [notes, setNotes] = useState(data);

    function addNewNoteToFile(newData) {
        const newNotes = [...notes];
        newNotes.unshift(newData);
        setNotes(newNotes);
    }

    function deleteNote(index) {
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
    }

    return(
        <>
            <Header openCreateNotePane={setOpenCreatePane}/>
            <Filter />
            {openCreatePane && 
                <CreateNewNote 
                    closeCreateNotePane={setOpenCreatePane} 
                    addNewNoteData={addNewNoteToFile}
                />
            }
            {notes.map((note, index) => {
                return (
                    <deleteNoteContext.Provider key={'provider' + index} value={() => deleteNote(index)}>
                        <Note 
                            noteText={note.text}
                            noteTags={note.tags}
                            key={'note' + index}
                        />
                    </deleteNoteContext.Provider>
                )
            })}
        </>
    )
}

export default MainContainer;
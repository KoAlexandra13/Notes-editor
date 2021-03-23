import React, { useState } from 'react';
import Header from './Header';
import Note from './Note';
import { data } from './data.json';
import Filter from './Filter';
import CreateNewNote from './CreateNewNote';

export const deleteNoteContext = React.createContext(null);

export default function MainContainer() {
    const [openCreatePane, setOpenCreatePane] = useState(false);
    const [notes, setNotes] = useState(data);

    function changeNotesList(action, newData, index=-1){
        const newNotes = Array.from(data);
        if (action === 'delete'){
            newNotes.splice(index, 1);
        } else if (action === 'create'){
            newNotes.unshift(newData);
        } else if (action === 'edit'){
            newNotes[index] = newData;
        }
        setNotes(newNotes);
    }

    return(
        <>
            <Header openCreateNotePane={setOpenCreatePane}/>
            <Filter />
            {openCreatePane && 
                <CreateNewNote 
                    closeCreateNotePane={setOpenCreatePane} 
                    saveNewNote={changeNotesList}
                />
            }
            {notes.map((note, index) => {
                return (
                    <deleteNoteContext.Provider key={'provider' + index} value={() => changeNotesList('delete', {}, index)}>
                        <Note
                            index={index} 
                            note={note}
                            key={'note' + index}
                            saveEditNote={changeNotesList}
                        />
                    </deleteNoteContext.Provider>
                )
            })}
        </>
    )
}
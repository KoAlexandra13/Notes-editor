import React, { useState, useEffect } from 'react';
import Header from './Header';
import Note from './Note';
import Filter from './Filter';
import CreateNewNote from './CreateNewNote';
import {getDataRequest, deleteNoteRequest, 
    addNewNoteRequest, editNoteRequest} from '../../api';

export const deleteNoteContext = React.createContext(null);

export default function MainContainer() {
    const [openCreatePane, setOpenCreatePane] = useState(false);
    const [notes, setNotes] = useState([]);
    const [newNotesState, setNewNotesState] = useState(notes);

    useEffect(() => {
        async function getNotes(){
            const data = await getDataRequest()
            setNotes(data.reverse())
        }
        getNotes()
    }, [newNotesState]);

    function changeNotesList(action, newData, id){
        const newNotes = Array.from(notes);
        if (action === 'delete'){
            deleteNoteRequest(id);
        } else if (action === 'create'){
            addNewNoteRequest(newData);
        } else if (action === 'edit'){
            editNoteRequest(id, newData);
        }
        setNewNotesState(newNotes);
    }

    function filterByTags(selectedOptions) {
        if(selectedOptions){
            const selectedTags = selectedOptions.map(option => option.value)
            const filteringNotes = notes.filter(note => note.tags.some(tag => selectedTags.includes(tag)))

            setNotes(filteringNotes);
            return;
        }
        
        setNewNotesState(notes);
    }

    return(
        <>
            <Header openCreateNotePane={setOpenCreatePane}/>
            <Filter notes={notes} filterByTags={filterByTags}/>
            
            {openCreatePane && 
                <CreateNewNote 
                    closeCreateNotePane={setOpenCreatePane} 
                    saveNewNote={changeNotesList}
                />
            }
            {notes.map(note => {
                return (
                    <deleteNoteContext.Provider 
                        key={'provider' + note.id} 
                        value={() => changeNotesList('delete', {}, note.id)}>

                        <Note
                            note={note}
                            key={'note' + note.id}
                            saveEditNote={changeNotesList}
                        />
                    </deleteNoteContext.Provider>
                )
            })}
        </>
    )
}
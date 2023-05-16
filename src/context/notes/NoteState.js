import { useEffect, useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    let host = 'http://localhost:5000';

    const [notes, setNotes] = useState([])

    // get all the notes through api call
    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchall`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZGI3NWVhNTE3MjE1Y2YxMzJjODAwIn0sImlhdCI6MTY4Mzg2Nzk4M30.Xi4RdV-ObODeUx3YRYYDCiuu7m1n-BRLL0G3fAJEhtc"
            },
        })

        return response.json();
    }

    // add note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZGI3NWVhNTE3MjE1Y2YxMzJjODAwIn0sImlhdCI6MTY4Mzg2Nzk4M30.Xi4RdV-ObODeUx3YRYYDCiuu7m1n-BRLL0G3fAJEhtc"
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json().then(()=>{
            getAllNotes().then((res)=>{
                setNotes(res)
            })    
        });

    }

    // update note
    const updateNote = () => {

    }

    // delete note
    const deleteNote = async (id) => {
        console.log(id)

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZGI3NWVhNTE3MjE1Y2YxMzJjODAwIn0sImlhdCI6MTY4Mzg2Nzk4M30.Xi4RdV-ObODeUx3YRYYDCiuu7m1n-BRLL0G3fAJEhtc"
            }
        })

        const json = response.json();
        console.log(json)

        // for filtering notes in fron-end
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, updateNote, deleteNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}


export default NoteState;
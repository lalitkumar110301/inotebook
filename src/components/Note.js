import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NotesCard from './NotesCard'

const Note = () => {

    const context = useContext(noteContext)
    const {notes, setNotes} = context

  return (
    <div>
        {notes.map((note) =>{
            return <NotesCard title={note.title} content={note.description} tag={note.tag}/>
        })}
    </div>
  )
}

export default Note
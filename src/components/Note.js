import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NotesCard from './NotesCard'

const Note = () => {

  const context = useContext(noteContext)
  const { notes, setNotes, getAllNotes } = context

  useEffect(()=>{
    getAllNotes().then((notes)=>{
      setNotes(notes);
    })
  }, [])

  return (
    <div>
      {
        notes ? notes.map((note) => {
          return <NotesCard key={note._id} noteID={note._id} title={note.title} content={note.description} tag={note.tag} />
        }) : "Nothing to Display"
      }

    </div>
  )
}

export default Note
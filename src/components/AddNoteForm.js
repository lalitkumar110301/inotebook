import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNoteForm = () => {
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const context = useContext(NoteContext);
    const { addNote } = context;

    const handleOnChange = (e)=>{
        e.preventDefault()
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleOnClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    
    return (
        <div>
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" onChange={handleOnChange} name='title' className="form-control" id="inputTitle" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputDesc" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input type="text" onChange={handleOnChange} name='description' className="form-control" id="inputDesc" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputTag" className="col-sm-2 col-form-label">Tag</label>
                    <div className="col-sm-10">
                        <input type="text" onChange={handleOnChange} name='tag' className="form-control" id="inputTag" />
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleOnClick}>ADD NOTE</button>
            </form>
        </div>
    )
}

export default AddNoteForm
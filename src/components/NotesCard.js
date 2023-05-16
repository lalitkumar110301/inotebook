import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const NotesCard = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const id = props.noteID;

    const handleDelete = async() =>{
        deleteNote(id).then((res)=>{
            console.log(res);
        }).catch(err => console.log(err))
    }

    return (
        <div className="card my-4" style={{"width": "18rem"}}>
            <div className="card-body">
                <span className={`badge text-bg-${props.tag === 'important'? 'danger':'primary'}`}>{props.tag}</span>
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content}</p>
                <a href="#" className="card-link">Update</a>
                <a href="#" className="card-link" onClick={handleDelete}>Delete</a>
            </div>
        </div>
    )
}

NotesCard.defaultProps = {
    title: "Sample Title",
    content: "Notes Description will be displayed here",
    tag: "general"
}

export default NotesCard
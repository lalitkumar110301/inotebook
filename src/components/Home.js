import React from 'react'
import AddNoteForm from './AddNoteForm'
import Note from './Note'

const Home = () => {

  return (
    <div className="my-5">
      <div className="row">
        
        {/* colulmn to display all notes */}
        <div className="col" style={{'height':'90vh','overflowY': 'auto'}}>
          <Note/>
        </div>

        {/* col to add note */}
        <div className="col">
          <h4 className='text-center' style={{"color": "red"}}>Add Note</h4>
          <AddNoteForm/>
        </div>
      </div>
    </div>
  )
}

export default Home
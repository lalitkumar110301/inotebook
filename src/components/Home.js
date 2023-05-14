import React from 'react'
import Form from './Form'
import Note from './Note'

const Home = () => {

  return (
    <div className="my-5">
      <div class="row">
        
        {/* colulmn to display all notes */}
        <div className="col" style={{'height':'90vh','overflow-y': 'auto'}}>
          <Note/>
        </div>

        {/* col to add note */}
        <div className="col">
          <h4 className='text-center' style={{"color": "red"}}>Add Note</h4>
          <Form/>
        </div>
      </div>
    </div>
  )
}

export default Home
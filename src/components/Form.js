import React from 'react'

const Form = () => {
    return (
        <div>
            <form>
                <div className="row mb-3">
                    <label for="inputTitle" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputTitle" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputDesc" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputDesc" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputTag" className="col-sm-2 col-form-label">Tag</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputTag" />
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    )
}

export default Form
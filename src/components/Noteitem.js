import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const { Note, updatenote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{Note.title}</h5>
                    <p className="card-text"> {Note.description}</p>
                    <div className= {`btn btn-primary mx-2 ${Note.tag.length === 0 ? "d-none" : ""}`} >{Note.tag}</div>
                    <i className="fa-solid fa-trash mx-3" onClick={() => { deletenote(Note._id); props.showalert("Deleted successsfully", "success") }}></i> 
                    
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { updatenote(Note);  props.showalert('updated successfully', 'success'); }}></i>
                    {/* now when someone click on this edit icon func execute */}
                </div>
            </div>

        </div>
    )
}

export default Noteitem

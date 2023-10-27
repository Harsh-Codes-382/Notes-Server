import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(noteContext);    // through useContext we successfully accessed the array from so far in diff. file 
    const { notes, getnotes, editnote } = context;  
    let history = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){ 

        getnotes();    
        }
        else{
            history('/login');  
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refclose = useRef(null);
    const [note, setnote] = useState({id:"",etitle:"", edescription:"", etag:'default'});
    const updatenote = (Currentnote) => {   // Currentnote means jiss note pr click huya hai voh note
        
        ref.current.click();    
        setnote({id:Currentnote._id, etitle:Currentnote.title, edescription:Currentnote.description, etag:Currentnote.tag}); 
       
        
    }
    const handleclick = () =>{
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        console.log(note);
        props.showalert('updated successfully', 'success');
    }

    const onchange = (e) =>{
        setnote({...note, [e.target.name]:e.target.value}) 
    }
    return (
        <div>
            <Addnote  showalert = {props.showalert} />
            {/* We made this button a reference so when updatnote fnuc() execute it will be execute in reference of this btn
            and we dont't want to show this btn so we will hide it but it's functionality will be execute when func is on 
            & it will be on when somebody click on edit icon on icon  */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                                    {/* value={note.title} krne ka mtlb jis card pr edit btn click huya uska title yha bhi dikhe beacuse of setnote we set the value of note acc. to card which being clicked  */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" aria-describedby="emailHelp"  value={note.etag} onChange={onchange} minLength={3} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<3} type="button" className="btn btn-primary" onClick={handleclick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Your Notes</h2>
            <div className='row my-3'>
                <div className='container'>
                {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} showalert = {props.showalert}  Note={note} />  // now we are sending the one one by all objects from array as a props to Noteitem
                })}

            </div>

        </div>

    )
}
export default Notes
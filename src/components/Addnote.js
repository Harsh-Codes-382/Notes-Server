import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);    // through useContext we successfully accessed the array from so far in diff. file 
    const [note, setnote] = useState({title:"", description:"", tag:'default'});
    const { addnote } = context;
    const handleclick = (e) =>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag);  // mtlb hum state variable pass kr rhe hai jiske andar title, description ki value hai
        setnote({title:"", description:"", tag:''}) // so inputs value can become empty after submit clicked.
        props.showalert('Added successfully', 'success');
    }

    const onchange = (e) =>{
        setnote({...note, [e.target.name]:e.target.value}) // we are saying keeps the things same in "...note" object but agge joh hai unki value 
        // add ya upadte kr do means hum khre hai ki joh bhi value hai usko uske name ke equal krdo isiliye humne jha jha onchange func() use kiya hai 
        // uss element mai humne name vaisa hi paya hai jaise useState mai bheja hai or vaisa hi api ke array mai hai. mtlb joh hum title mai likhenge
        // voh "title" ke equal ho jaye like => title:"harsh" and same for description.
    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add Notes</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title}  aria-describedby="emailHelp" onChange={onchange} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  aria-describedby="emailHelp" onChange={onchange}/>
                    </div>
                    <button  disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Addnote

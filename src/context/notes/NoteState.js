import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) =>{
    // const s1 = {             // yha voh state ayegi jisse hum different diff. components mai bhejna chahate hai
    //     "name":"Harsh",
    //     "class":"5d"
    // }
    // const [state, setstate] = useState(s1);
    // const update = () =>{   // this is func who update the state variable
    //     setTimeout(()=>{
    //         setstate({           // now we are setting the new state value
    //             "name":"rohit",
    //             "class":"2d"
    //         })
    //     },1000)
    // }
    const host = 'http://localhost:5000';
    const notesinitial = [];// for temporary we hardcore the notes
     
      const [notes,setnotes]  = useState(notesinitial)
      const getnotes = async () =>{ // this func will fetch all notes
        // API Call
        const   response = await fetch(`${host}/api/notes/fetchnotes`,{ // their url acc. to our backend in thunderclient
            method:"GET",    // method like "POST", "GET", "PUT"
            headers:{
                'Content-Type':'application/json', // as we use in backend
                'auth-token':localStorage.getItem('token') // we are taking the auth-token of user who logged in and his token got stored in localstorage so we are taking token  from there
            }
        });
        const json = await response.json();
        console.log(json);  // now we can see the data of user of above particular token user
        setnotes(json); // now we are passing all notes which stored at this user token into the state variable who carries the array & it also passed to components to show on frontend
    }
    // Add a note
    const addnote = async (title, description, tag) =>{
        // API Call
        const   response = await fetch(`${host}/api/notes/addnote`,{
            method:"POST",    // method like "POST", "GET", "PUT"
            headers:{
                'Content-Type':'application/json', // as we use in backend
                'auth-token':localStorage.getItem('token') // we are taking the auth-token of user who logged in and his token got stored in localstorage so we are taking token  from there
            },
            body: JSON.stringify({title, description, tag})  // we converting the json into the string
        });
        const note = await response.json(); // we are storing the response data into "note" variable and concat it into the state variable array.
        setnotes(notes.concat(note))    // concat upadtes an array & push returns an array
    }
    // Delete a note
    const deletenote = async (id) =>{ 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{ // we are passing the id of note which we want to delete
            method:"DELETE",    // method like "POST", "GET", "PUT"
            headers:{
                'Content-Type':'application/json', // as we use in backend
                'auth-token':localStorage.getItem('token') // we are taking the auth-token of user who logged in and his token got stored in localstorage so we are taking token  from there
            }
        });
        const json = await response.json();
        console.log(json);
        const newnotes = notes.filter((note)=>{ return note._id !== id}) // means agr iske andar ki id parameter same nhi huyi baaki array ki id se
        // then condition true hai & voh vale element array mai rhenge or jinki id match krgyi tbh condition false & voh array mai nhi rhenge means delete
        setnotes(newnotes);
    }
    // Edit a note
    const editnote = async (id, title, description, tag) =>{
        // API call 
        const   response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:"PUT",    // method like "POST", "GET", "PUT"
            headers:{
                'Content-Type':'application/json', // as we use in backend
                'auth-token':localStorage.getItem('token')  // we are taking the auth-token of user who logged in and his token got stored in localstorage so we are taking token  from there 
            },
            body: JSON.stringify({title, description, tag})  // we converting the json into the string
        });
        const json = await response.json();
        console.log(json);
        // newnotes will hold the deep copy of state variable notes array
        let newnotes = JSON.parse(JSON.stringify(notes));
        // Client side updation
        for(let i=0;i<newnotes.length;i++){
            let element = newnotes[i];
            if(element._id === id){
                newnotes[i].title = title;
                newnotes[i].description = description;
                newnotes[i].tag = tag;
                break;
            }
        }
        // now we seeting the value of state variable "notes" which is updated copy of the array
        setnotes(newnotes);
    }
    return(
        // means ab joh bhi iss provider ke beech mai ayega voh children bn jayega toh hum kisi bhi component mai state bhej skte hai as a props
        // <NoteContext.Provider value={{state, update}}> {/* We made the object so we can pass 2 things at a same time */}
            <NoteContext.Provider value={{notes, setnotes, addnote, deletenote, editnote, getnotes}}>  {/* We passed the notes state & setstate here means if in any compo. we used context Hook 
                                                               we can access this array & also upadte this array using setnotes*/}
            {props.children}    
        </NoteContext.Provider>
    )
}
export default NoteState;
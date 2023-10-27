// import React, { useContext, useEffect } from 'react'
// Importing the Link from react router
// import { Link } from "react-router-dom";
// import noteContext from '../context/notes/noteContext'
const About = () => {
    // const a = useContext(noteContext);
    // useEffect(()=>{
    //     a.update(); //  we are calling the func who update the state variable value
    //     // this down line is to prevent the error of sending the empty array
    //     // eslint-disable-next-line 
    // },[])
    return (
        <>
        <h1>This is about</h1>
            {/* <h1>This is about {a.state.name} & {a.state.class}</h1>  Beacuse name & class now in state variable "state" so we use variable name */}
        </>
    )
}
export default About
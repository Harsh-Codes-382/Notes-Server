import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const SignUp = (props) => {
    const [creds, setcreds] = useState({name:"", email:"", password:"", cpassword:""});
    let history = useNavigate();    // for redirection of page

    const onchange = (e) =>{
        setcreds({...creds, [e.target.name]:e.target.value}) 
    }
    const handlesubmit = async (e) =>{
        e.preventDefault();
        const {name, email, password} = creds;  // by using destructuring we extrct the values from creds object
        const   response = await fetch('http://localhost:5000/api/auth/createuser',{
        method:"POST",    
        headers:{
            'Content-Type':'application/json', // as we use in backend 
        },
        body: JSON.stringify({name, email, password})   // we are passing in body the values of input
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        //  Save the auth-token & Redirect on to the login page
        localStorage.setItem('token',json.jwtdata); // we are storing the jwtadata means return token into localstorage 
        history("/"); // it wil redirect us to this route if login success is true.
        props.showalert('Account created successfully', 'success')
    }   
    else{
        props.showalert('Invalid Credentials', 'danger')
    }
    }
    return (
        <>
        <h1 className='my-4'>SignUp to use I-Notebook</h1>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={creds.name} aria-describedby="emailHelp" onChange={onchange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={creds.email} aria-describedby="emailHelp" onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" className="form-control" id="password" name='password' value={creds.password} aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} minLength={5} required />
                </div>  
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
export default SignUp
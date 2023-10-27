import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
    const [creds, setcreds] = useState({email:"", password:""});
    let history = useNavigate();    // for redirection of page

    const onchange = (e) =>{
        setcreds({...creds, [e.target.name]:e.target.value}) 
    }
    const handlesubmit = async (e) =>{
        e.preventDefault();
        const   response = await fetch('http://localhost:5000/api/auth/login',{
        method:"POST",    // method like "POST", "GET", "PUT"
        headers:{
            'Content-Type':'application/json', // as we use in backend
        },
        body: JSON.stringify({email: creds.email, password: creds.password })   // we are passing in body the values of input
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        //  Save the auth-token of looged in & Redirect on to the login page
        localStorage.setItem('token',json.jwtdata);
        history("/"); // it wil redirect us to this route if login success is true.
        props.showalert(' Logged Into Account successfully', 'success')
    }   
    else{
        props.showalert('Invalid Credentials', 'danger')
    }
    }
    return (
        <>
        <h1 className='my-4'>Login to continue in I-Notebook</h1>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={creds.email} onChange={onchange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={creds.password} onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    )
}
export default Login
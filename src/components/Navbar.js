import React, { useEffect } from "react"
// Importing the Link from react router
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    let history = useNavigate();
    // 
    const handlelogout = () =>{
        localStorage.removeItem('token'); // it will clear localstorage means remove the auth-token of looged in user
        history("/login");  // and it will redirect us to the login page after click on Log Out btn
    }
    let location = useLocation(); // this will store the location of element we clicked in navbar in "location" variable
    useEffect(() => {
        console.log(location);
    }, [location])  // means whenever location changes console.log execute because it is in useEffect hook
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className={`navbar-brand ${location.pathname === "/" ? "active" : "" }`} to="/">Motes Server</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* if location ka pathname (from object in console) equal hai "/home" then uss element ko active class bna do */}
                                <Link className= {`nav-link ${location.pathname === "/home" ? "active" : "" }`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : "" }`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link to="/login" className="btn btn-primary mx-3" role="button">Login</Link>
                            <Link to="/signup" className="btn btn-primary mx-3" role="button">SignUp</Link>
                        </form> : <button onClick={handlelogout} className="btn btn-primary">Log Out</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar
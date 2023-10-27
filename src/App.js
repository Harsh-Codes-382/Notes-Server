import './App.css';
import { useState } from 'react';
// Importing the react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importing the Navbar
import Navbar from './components/Navbar';
// Importing the Home
import Home from './components/Home';
// Importing the About
import About from './components/About';
// importing the notestate func
import NoteState from './context/notes/NoteState';
// importing the alert
import Alert from './components/Alert';
// Import the Login Component
import Login from './components/Login';
// Import the signup Component
import SignUp from './components/Signup';
function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) =>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },1500)
  }
  return (
    <>
    <NoteState>  {/*now humne saare ka saare components ko NoteState ke  beech mai daal diya hai yeh sb children bn gye hai toh hum abh kisi bhi component
     mai state bhej skte hai as props beacuse of noteContext we made in NoteState func or ha jis bhi component ko state pass krna ha uss compo. ke andar "useContext" ko import bhi krna hoga */}
      <Router>
        <div  className='container'>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route exact path='/' element={<Home showalert = {showalert} />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/login' element={<Login showalert = {showalert} />} />
          <Route exact path='/signup' element={<SignUp showalert = {showalert} />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;

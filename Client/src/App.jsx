import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import SuccessfulLogin from './components/Login/SuccessfulLogin';
import PublicProfile from './components/PublicProfile/PublicProfile';
import axios from 'axios';
import { userLogin } from './redux/userSlice';
const backendUrl = import.meta.env.VITE_BACKEND;


function App() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log("user info: ", userInfo);



  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/*' element={<Profile />} />
          <Route path='/test' element={<SuccessfulLogin />} />
          <Route path='/:username' element={<PublicProfile/>}/>
        
      
          
        </Routes>
      </div>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import PublicProfile from "../PublicProfile/PublicProfile";
import EditProfile from "../EditProfile/EditProfile";
import Sidebar from "../Sidebar/Sidebar";
import Links from "../Links/Links";
import styles from './Profile.module.css';

const Profile = () => {
    const { userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const capFistname = userInfo.first_name.charAt(0).toUpperCase() + userInfo.first_name.slice(1);



    useEffect(()=>{
        if(!userInfo) navigate('/login')
    })

    console.log("User info: ", userInfo)

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <h1>Welcome {capFistname} </h1>
                <div className={styles.buttonContainer}>
                    <Routes>
                        
                        <Route path="links" element={<Links/>}/>
                        <Route path="edit-profile" element={<EditProfile/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Profile;

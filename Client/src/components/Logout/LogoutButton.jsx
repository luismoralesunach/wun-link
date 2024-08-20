import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/userSlice"
import { useEffect } from "react";

const LogoutButton = ()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const handleLogout = ()=>{
        dispatch(userLogout())
        navigate('/')
    }

    



    return(
        <button onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton;
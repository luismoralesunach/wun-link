import { useSelector } from "react-redux";

const SuccessfulLogin = ()=>{

    const { userInfo, token } = useSelector((state) => state.user);
    console.log("user info: ", userInfo);
    console.log("user token: ", token);

    return(
        <div>
            Succesfully logged in! Redirecting to profile
        </div>
    )
}

export default SuccessfulLogin;
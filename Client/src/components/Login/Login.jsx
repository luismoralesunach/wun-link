import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector((state) => state.user);
    const [buttonText, setButtonText] = useState('Login');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [user, setUser] = useState({
        password: '',
        username: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonText("Loading...");
        setButtonLoading(true);
        dispatch(userLogin(user));
    };

    useEffect(() => {
        if (!loading && userInfo) {
            navigate('/profile'); // Navigate to profile if the user is authenticated
        }
    }, [loading, userInfo, navigate]);

    return (
        <div className={styles.loginContainer}>
            <div>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            placeholder="username"
                            name="username"
                            value={user.username}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            placeholder="Password"
                            onChange={handleChange}
                            type="password"
                            value={user.password}
                            name="password"
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={buttonLoading}
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
            <Link to='/register'>
                <button>Don't Have An Account? Register here</button>
            </Link>
        </div>
    );
};

export default Login;

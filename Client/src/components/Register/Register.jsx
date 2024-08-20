import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './Register.module.css'

const backendUrl = import.meta.env.VITE_BACKEND;

const Register = () => {

    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
    });

    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str);
        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (name === "username") {
            if (isAlphanumeric(value) || value === '') {
                setUsernameError('');
                setNewUser({
                    ...newUser,
                    [name]: value
                });
            } else {
                setUsernameError('Username can only contain letters and numbers');
            }
        } else {
            setNewUser({
                ...newUser,
                [name]: value
            });
        }
        // Check password match
        if (name === "password" || name === "confirmedPassword") {
            if (newUser.password && confirmedPassword && newUser.password !== confirmedPassword) {
                setPasswordError('Passwords must match');
            } else {
                setPasswordError('');
            }
        }

        if(name==="email"){
            if(isValidEmail(value) || value=== ""){
                setEmailError("")
                setNewUser({
                    ...newUser,
                    [name]: value
                })
            }else{
                setEmailError("Must be a valid email")
            }
        }
    };



    // Check if all fields are filled and there are no errors
    const isFormValid = () => {
        const fieldsFilled = Object.values(newUser).every(field => field !== '');
        return fieldsFilled && confirmedPassword && !usernameError && !passwordError && !emailError;
    };

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {
            const {data} = await axios.post(`${backendUrl}/api/users/register`, newUser)
            if(data) alert("Register Succesful")
                setTimeout(()=>{
            navigate('/profile')
            }, 3000)
            
            
                
            
        } catch (error) {
            console.log("Error in handleSubmit: ", error.message)
        }
    }

    return (
        <div>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <div>

                <label>First Name</label>
                <input 
                    placeholder="First"
                    name="first_name"
                    value={newUser.first_name}
                    type="text"
                    onChange={handleChange}
                    />
                </div>

                <div>
                <label>Last Name</label>
                <input 
                    placeholder="Last"
                    name="last_name"
                    value={newUser.last_name}
                    type="text"
                    onChange={handleChange}
                    />
                </div>


                <div>
                <label>Email</label>
                <input 
                    placeholder="example@mail.com"
                    name="email"
                    value={newUser.email}
                    type="text"
                    onChange={handleChange}
                    /> 
                {emailError && <span style={{color: "red"}}>{emailError}</span>}
                    </div>



                <div>
                    
                <label>Username</label>
                <input 
                    placeholder="user-name"
                    name="username"
                    value={newUser.username}
                    type="text"
                    onChange={handleChange}
                    />
                {usernameError && <span style={{ color: 'red' }}>{usernameError}</span>}
                    </div>
                
                <div>
                <label>Password</label>
                <input 
                    placeholder="Password"
                    name="password"
                    value={newUser.password}
                    type="password"
                    onChange={handleChange}
                    />
                </div>

                <div>
                <label>Confirm Password</label>
                <input
                    placeholder="Confirm Password"
                    name="confirmedPassword"
                    value={confirmedPassword}
                    onChange={(e) => { 
                        setConfirmedPassword(e.target.value);
                        // Check for password match here too
                        if (newUser.password && e.target.value !== newUser.password) {
                            setPasswordError('Passwords must match');
                        } else {
                            setPasswordError('');
                        }
                    }}
                    type="password"
                    />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>
                
                <button
                type="submit"
                    disabled={!isFormValid()}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;

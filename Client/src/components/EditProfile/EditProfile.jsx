import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from './EditProfile.module.css'
import { SketchPicker } from 'react-color'; // Import color picker

const backendUrl = import.meta.env.VITE_BACKEND;

const EditProfile = () => {
    const { userInfo } = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        username: userInfo.username,
        display_name: '',
        bio: '',
        configuration: {
            background_color: '#ffffff', // Default color
            text_color: 'white',
            bio_text_color: ''
        }
    });
    const [chooseBackgroundColor, setChooseBackgroundColor] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/users/public/${userInfo.username}`);
                if (data) {
                    setUserData(data);
                    setUpdatedData({
                        username: userInfo.username,
                        display_name: data.profile.display_name,
                        bio: data.profile.bio,
                        configuration: {
                            background_color: data.profile.configuration.background_color,
                            text_color: data.profile.configuration.text_color || 'white' // Default to white if not set
                        }
                    });
                }
            } catch (error) {
                console.log("Error in getUser in EditProfile: ", error.message);
            }
        };

        getUser();
    }, [userInfo.username]);

    const handleBackgroundColorChangeComplete = (color) => {
        setUpdatedData(prevState => ({
            ...prevState,
            configuration: {
                ...prevState.configuration,
                background_color: color.hex
            }
        }));
    };

    const handleTextColorChange = (e) => {
        setUpdatedData(prevState => ({
            ...prevState,
            configuration: {
                ...prevState.configuration,
                text_color: e.target.value
            }
        }));
    };

    const handleChange = (e)=>{
        const { name, value} = e.target;
        setUpdatedData(prevState=>({
            ...prevState,
            configuration: {
                ...prevState.configuration,
                [name]: value
            }
        }))
    }
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/users/edit-profile`, updatedData);
            if (data) alert("Profile updated successfully");
        } catch (error) {
            console.log("Error in updating profile: ", error.message);
        }
    };

    console.log("Updated data: ", updatedData);

    return (
        <div className={styles.container}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Display Name: </label>
                    <input
                        name="display_name"
                        value={updatedData.display_name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Bio: </label>
                    <textarea
                        name="bio"
                        value={updatedData.bio}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Your Background Color: </label>
                    <button
                        type="button"
                        className={styles.colorButton}
                        onClick={() => setChooseBackgroundColor(!chooseBackgroundColor)}
                    >
                        {!chooseBackgroundColor ? "Select Background Color" : "Done"}
                    </button>

                    {chooseBackgroundColor && (
                        <SketchPicker
                            color={updatedData.configuration.background_color}
                            onChangeComplete={handleBackgroundColorChangeComplete}
                        />
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label>Text Color for Links: </label>
                    <select
                        value={updatedData.configuration.text_color}
                        onChange={handleTextColorChange}
                    >
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        {/* Add more color options if needed */}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Text Color for Display Name and Bio: </label>
                    <select
                        name="bio_text_color"
                        value={updatedData.configuration.bio_text_color}
                        onChange={handleChange}
                    >
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        {/* Add more color options if needed */}
                    </select>
                </div>

                <button type="submit" className={styles.saveButton}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;

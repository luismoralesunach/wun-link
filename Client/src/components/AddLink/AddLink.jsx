import axios from 'axios'
import { useState } from 'react';
import { useSelector } from 'react-redux';
const backendUrl = import.meta.env.VITE_BACKEND;

const AddLink = ({setShowAddLink, setUserLinks, userLinks})=>{
  

    const { userInfo } = useSelector((state) => state.user);
    console.log("user info: ", userInfo);

    const [ newLink, setNewLink] = useState({
        user: userInfo.id,
        url: '',
        title: ''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;

        setNewLink({
            ...newLink,
            [name]: value
        })
    }

    const handleSubmit =async (e)=>{
        e.preventDefault()

        try {
            const { data } = await axios.post(`${backendUrl}/api/users/create-link`, newLink, 
                {
                withCredentials: true,
                headers: {
                        'Content-Type': 'application/json'
                    } 
            }
        )
        if(data){
            setShowAddLink(false)
            setUserLinks((prevState)=>[...userLinks, newLink])
            alert("Link added successfully")
            
        }
        } catch (error) {
            console.log("Error in adding link", error.message)
        }
    }



    return(
        <div>Add Link Component
            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input onChange={handleChange} name='title' value={newLink.title}/>
                <label>URL: </label>
                <input onChange={handleChange} name='url' value={newLink.url}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddLink;
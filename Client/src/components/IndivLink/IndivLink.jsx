import { useState } from 'react';
import styles from './IndivLink.module.css'
import { useSelector } from 'react-redux';
import { SlSocialYoutube } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND;


const IndivLink= ({url, title, id: linkId, setUserLinks, userLinks})=>{

    const { userInfo } = useSelector((state) => state.user);
    // const {url, title, id:linkId} = props.data
    const [isTitleDisabled, setIsTitleDisabled] = useState(true)
    const [isUrlDisabled, setIsUrlDisabled] = useState(true)
    const [ updatedLink, setUpdatedLink] = useState({
        title,
        url,
        user: userInfo.id
    })
    console.log("link id: ", linkId)

    const editLink = async()=>{
        try {
            const { data } = await axios.put(`${backendUrl}/api/users/links/${linkId}`, updatedLink, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(data) alert("Link updated successfully")
            
        } catch (error) {
            console.log("Error in editLink", error.message)
            
        }
    }
   
    const deleteLink = async ()=>{
        try {
            const response = await axios.delete(`${backendUrl}/api/users/links/${linkId}`)
            if(response.status == 204){
                alert("Link deleted successfully")
                // const newList = userLinks.filter(link => link.id !== linkId)
                // setUserLinks((prevState)=>[newList])
            }
            
            
        } catch (error) {
            console.log("Error in delete link: ", error.message)
        }
    }


    const handleChange = (e)=>{
        const {value, name} = e.target;

        setUpdatedLink({
            ...updatedLink,
            [name]: value
        })
    }

    

    return(

        <div className={styles.individualLink}>
            <div>


            
            <div>
            <input onChange={handleChange} name='title' value={updatedLink.title} disabled={isTitleDisabled}/>
            <button title="Edit" onClick={()=>setIsTitleDisabled(false)}><CiEdit /></button>
           { !isTitleDisabled && <button onClick={()=>{
                setIsTitleDisabled(true)
                editLink()

            }}><IoCheckmarkOutline /></button>}
            

            </div> 
            <div>
           
            <input onChange={handleChange} name='url' value={updatedLink.url} disabled={isUrlDisabled}/>
            <button title="Edit"  onClick={()=>{
                setIsUrlDisabled(false)
                editLink()
                }}><CiEdit /></button>
            {!isUrlDisabled && <button onClick={()=>{setIsUrlDisabled(true)}}><IoCheckmarkOutline />
            </button>}
            </div>
            </div>

            <div>
            <button title='Delete' onClick={deleteLink}><IoTrashOutline /></button>
            </div>
                
        </div>
    )
}

export default IndivLink;
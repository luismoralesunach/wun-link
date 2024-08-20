import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddLink from "../AddLink/AddLink";
import IndivLink from "../IndivLink/IndivLink";
import styles from './Links.module.css'
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND;

const Links = () => {
    const { userInfo } = useSelector((state) => state.user);
    const [showAddLink, setShowAddLink] = useState(false)
    const [userLinks, setUserLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            if (!userInfo || !userInfo.username) return;

            try {
                const { data } = await axios.get(`${backendUrl}/api/users/links/${userInfo.username}`);
                setUserLinks(data);
            } catch (error) {
                console.log("Error in fetching links: ", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, []); 

    if (loading) return <p>Loading...</p>;

    const handleClick = ()=>{
        setShowAddLink(true)
    }

    return (
        <div className={styles.container}>
            <div className={styles.addButtonContainer}>
                <button className={styles.addLinkBtn}onClick={handleClick}>Add Links</button>
            </div>
            {showAddLink && <AddLink setShowAddLink={setShowAddLink} setUserLinks={setUserLinks} userLinks={userLinks}/>}
            <div>
            {userLinks.length > 0 ? (
                userLinks.map((lnk) => (
                    <IndivLink 
                    key={lnk.id} 
                    url={lnk.url} 
                    title={lnk.title} 
                    id={lnk.id} 
                    userLinks={userLinks} 
                    setUserLinks={setUserLinks} 
                  />
                  
                ))
            ) : (
                <p>No links found.</p>
            )}
            </div>
        </div>
    );
};

export default Links;

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PublicUrl from './PublicUrl';
import axios from 'axios';


const backendUrl = import.meta.env.VITE_BACKEND;

const PublicProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/public/${username}`);
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  console.log("User data: ", userData)
  console.log("User links: ", userData.links)



  return (
      <div
       style={{
        widows: '100%',
        height: '100vh',
          backgroundColor: `${userData.profile.configuration.background_color}`,
          display: 'flex',
          flexDirection: 'column',
          
          alignContent: 'center'
          
        
        }}>


      <div
       style={{
          backgroundColor: `${userData.profile.configuration.background_color}`,
          color: `${userData.profile.configuration.bio_text_color}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
         
           <h1>{userData.profile.display_name}</h1> 
           <p>{userData.profile.bio}</p> 
        </div>


        <div>
            
            {userData.links.map((lnk)=>(
            <PublicUrl id={lnk.id} data={lnk} config={userData.profile.configuration}/>
                
            ))}

            
        </div>
    </div>
  );
};

export default PublicProfile;

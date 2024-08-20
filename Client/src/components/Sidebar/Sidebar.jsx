import { Link } from "react-router-dom";

const Sidebar = () =>{

    return(
        <div>
            Sidebar
            <ul>
                <li><Link to={'links'}>Links</Link></li>
                <li><Link to={'edit-profile'}>Edit Profile Appearance</Link></li>
                
            </ul>
        </div>
    )
}


export default Sidebar;
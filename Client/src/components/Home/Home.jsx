import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Home = ()=>{



    return(
        <div>
            <div>
            <Navbar/>
            </div>

            <div>
                <h2>A single place for all your links here</h2>
                <p>One single link in your bio can to be able to share all your content ranging from Instagram, Tiktok, Twitter, Facebook, Youtube, LinkedIn and more!</p>
            </div>

            <div>
                <p>Get started here</p>
                <Link to='/register'><button>Register here!</button></Link>
            </div>

            <div>

            </div>
           
        </div>
    )
}

export default Home;
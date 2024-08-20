import { Link } from "react-router-dom"


const Navbar = ()=>{

    return(
        <div>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/register'><button>Sign Up for free</button></Link>
        </div>
    )
}

export default Navbar;
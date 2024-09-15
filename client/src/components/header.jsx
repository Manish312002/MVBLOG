import { useContext, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
import { UserContext } from "../userContext";



export default function Header(){
    const navigate = useNavigate()
    const {setuserInfo, userInfo} = useContext(UserContext)
    

    useEffect(() => {
        axios.get('http://localhost:4000/profile',{withCredentials:true})
            .then(response =>{setuserInfo(response.data)})
            .catch(error => {console.error('Error fetching user info:', error)
                setuserInfo(null)
            });
    }, [])


    const handleLogout =async(e)=>{
        const response = await axios.post("http://localhost:4000/logout",{}, {withCredentials:true})
        setuserInfo(null)
        navigate('/')
    }

    return(
        <>
        <header>
            <Link to="/" className='logo'>MVBlog</Link>
            <nav>
                {userInfo &&
                <>
                <Link to={'/'}>Home</Link>
                <Link to={'/Create_Post'}>Create Post</Link>
                <Link to={'/My_Posts'}>My Posts</Link>
                <Link onClick={handleLogout}>Logout</Link>
                </>}
                {!userInfo &&
                <>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
                </>
                }
            </nav>
        </header>
        </>
    )
}
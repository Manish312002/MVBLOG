import { useState,useEffect } from "react"
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";


export default function MyPosts(){
    const navigate = useNavigate()
    const [myPosts, setmyPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/my_Posts',{withCredentials:true})
            .then(response =>{setmyPosts(response.data)})
            .catch(error => {console.error('Error fetching user info:', error)
            });
    }, [])
    
    // delete post function 
    
    const handledelete = async(e)=>{
        const postID =(e.target.id)
        try{
            const response = await axios.get(`http://localhost:4000/delete/${postID}`,{withCredentials:true})
            navigate('/')
        }catch(err){
            console.log("Failed to delete post, Try again!")
        }
    }


    return(
        <>
        <div className="table-container">
        <h1>My Posts</h1>
        <table>
        <thead>
            <tr>
                <th>Post ID</th>
                <th>Title</th>
                <th>ContentType</th>
                <th>Publish Date</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {myPosts.length > 0 && myPosts.map(post => (
        <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.contenttype}</td>
            <td>{post.publish_date}</td>
            <td><button  className="edit" type="submit"><Link to={`/edit/${post.id}`}>Edit</Link></button></td>
            <td><button onClick={handledelete} id={post.id} className="delete" type="submit">Delete</button></td>
        </tr>
        ))}
        </tbody>
    </table>
        </div>
        </>
    )
}
import { useEffect, useState } from "react"
import axios from 'axios'
import Posts from "./posts"


export default function IndexPage(){
    const [posts, setposts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/posts')
            .then(response =>{setposts(response.data)})
            .catch(error => {console.error('Error fetching user info:', error)
            });
    }, [])
    
    return(
        <>
        {posts.length > 0 && posts.map(post => (<Posts key={post.id} {...post} />))}
        </>
    )
}
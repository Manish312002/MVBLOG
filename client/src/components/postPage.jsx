import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export default function PostPage(){
    const [idPost, setidPost] = useState('')
    const {id} = useParams()
    
    useEffect(() =>{
        axios.get(`http://localhost:4000/post/${id}`)
        .then(response => setidPost(response.data))
        .catch(error => {console.error('Error fetching Post :', error)
    })
    },[])
    console.log(idPost)
    return(
        <>
        <div className="post-page">
            <div className="post-title">
                <h1>{idPost.title}</h1>
                <div className="publish-date">
                    <span className="post-author">{idPost.author}</span>
                    <span className="post-date">{idPost.publish_date}</span>
                    <span className="post-type">{idPost.contenttype}</span>
                </div>
            </div>

            <div className="main-body">
                <div className="cover-img">
                    <img src={"http://localhost:4000/"+idPost.filepath} alt={idPost.filepath} />
                </div>
                <div className="post-content">
                    <div dangerouslySetInnerHTML={{__html:idPost.content}}/>
                    <p>{idPost.summary}</p>
                </div>
            </div>
        </div>
        </>
    )
}
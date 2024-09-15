
import { Link } from "react-router-dom"

export default function Posts({id,title,author,publish_date, contenttype,summary,filepath}){
    return(
        <>
        <div className="post">

            <div className="image">
                <Link to={`/post/${id}`}>
                    <img src={'http://localhost:4000/'+filepath} alt={`Image for ${title}`} />
                </Link>
            </div>

            <div className="text">
                <Link to={`/post/${id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className='info'>
                    <a href="" className="author">{author}</a>
                    <time>{publish_date}</time>
                    <br />  
                    <span>{contenttype}</span>
                </p>
                <p className='summary'>{summary.substring(0, 300)}...<Link style={{color:'#aaa',fontSize:'0.9rem'}} to={`/post/${id}`}>Read More</Link></p>
            </div>

        </div>
        </>
    )
}
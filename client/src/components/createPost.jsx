import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';



export default function CreatePost(){
    const modules = {toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
    
        [{ list: 'ordered'}, { list: 'bullet' }],
        [{ indent: '-1'}, { indent: '+1' }],
    
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image', 'video'],
        [{ color: [] }, { background: [] }],
    
        ['clean'],
    ]}
    const formats =[
        'bold', 'italic', 'underline', 'strike',
        'align', 'list', 'indent',
        'size', 'header',
        'link', 'image', 'video',
        'color', 'background',
      ]
    const { quillRef, quill } = useQuill({modules, formats});
    const [message, setmessage] = useState(null)
    const [error, seterror] = useState(false)
    const [sucess, setsucess] = useState(false)
    const [file,setfile] = useState(null)
    const [post, setpost] = useState({
        title: '',
        contentType: '',
        summary: '',
        content: '',
    })

    useEffect(() =>{
        if(quill){
            quill.on('text-change',() =>{
                setpost(prevValue =>({...prevValue, content:quill.root.innerHTML}))
            })
        }
    },[quill])
    
    const handlechange =(e)=>{
        const {name, value} = e.target 
    
        setpost(prevValue =>({
            ...prevValue,
            [name]: value
        }))
    }

    const handlesubmit = async(e) =>{
        e.preventDefault()
        const formData = new FormData()
        for(const key in post){
            formData.set(key, post[key]);
        }
        if (file) {
            formData.set('file', file[0]);
        }

        try{
            const response = await axios.post("http://localhost:4000/create_post",formData,{withCredentials:true})
            setpost({
                title: '',
                contentType: '',
                summary: '',
                content: quill.root.innerHTML= "",
            })
            setsucess(true)
            setmessage("Post created sucessfully")

        }catch(err){
            console.log(err)
            console.error(err);
            setError(true);
            setMessage("Failed to create post");
        }
        
    }

    

    return(
        <>
            <div className="container" >
                <form action="" onSubmit={handlesubmit}>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Title" 
                        value={post.title}
                        onChange={handlechange}
                    />
                    <input 
                        type="text" 
                        name="contentType" 
                        placeholder="Content-Type"
                        value={post.contentType} 
                        onChange={handlechange}
                    />
                    <input 
                        type="text" 
                        name="summary" 
                        placeholder="summary"
                        value={post.summary} 
                        onChange={handlechange}
                    />
                    <input 
                        type="file" 
                        name="file" 
                        onChange={((ev) => setfile(ev.target.files))}
                    />
                    <div >
                        <div ref={quillRef} />
                    </div>

                    {sucess && <p className='sucess'>{message}</p>}
                    {error && <p className='error'>{message}</p>}
                    <button style={{marginTop:'5px'}} >Create Post</button>
                </form>
            </div>
        </>
    )
}
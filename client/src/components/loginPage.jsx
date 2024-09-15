import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import {UserContext} from '../userContext'
import axios from "axios"



export default function LoginPage(){
    const [user, setuser] = useState({
        username:"",
        password:""
    })
    const [error, seterror] = useState(true)
    const [message, setmessage] = useState('')
    const [redirect, setredirect] = useState(false)
    const {setuserInfo} = useContext(UserContext)

    const handlechange = (e)=>{
        const {name, value} = e.target
        setuser(prevValue =>({
            ...prevValue,
            [name]:value
        }))
    }

    const handlelogin = async(e)=>{
        e.preventDefault()
        if(user.username === "" || user.password === ""){
            seterror(true)
            setmessage("Enter the Username and Password")
            return;
        }else{
            try{
                const response = await axios.post("http://localhost:4000/login",user,{
                    withCredentials:true
                })
                if(response.status === 200){
                    setuserInfo(response.data)
                    setredirect(true)
                }else{
                    seterror(true)
                    setmessage("Wrong Credentials")
                }
            }catch(err){
                seterror(true);
                setmessage("An error occurred. Please try again.");
            }
        }

        
            
        
    }
    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <>
        <form className="login" onSubmit={handlelogin}>
            <h1>LOGIN</h1>
            <input 
                type="text" 
                placeholder="Username" 
                name="username"
                onChange={handlechange}
                value={user.username}
            />
            <input 
                type="password" 
                placeholder="Password" 
                name="password"
                onChange={handlechange}
                value={user.password}
            />
            {error&&<p className="error">{message}</p>}
            <button type="submit">Login</button>
        </form>
        </>
    )
}
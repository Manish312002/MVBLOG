import { useEffect, useState } from "react"
import axios from 'axios'



export default function RegisterPage(){
    // data storing here 
    // error true or false 
    const [error, seterror] = useState(false)
    const [sucess, setsucess] = useState(false)
    // error messages 
    const [message, setmessage] = useState('')
    // data to send to backend storing in postgres 
    const [persondata, setpersondata] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    // handling change in form fields 
    const handlechange = (e) =>{
        const{name,value} = e.target
        setpersondata(prevValue =>({
            ...prevValue,
            [name]:value
        }))
    }

    // after submitting run register function 
    const registerform = async(e) =>{
        e.preventDefault()
        // checking if any field is empty or not 
        if(persondata.username===""||persondata.password===""||persondata.email===""){
            seterror(true)
            setmessage("All fields are required!")
            return;
        }else{
            // checking if password and confirm_password are same 
            if(persondata.password===persondata.confirm_password){
                try{
                    // sending data to server  side using axios 
                    const response = await axios.post('http://localhost:4000/register', persondata);
                    setsucess(true)
                    setmessage(response.data.message)

                    // changing all form fields to empty after submition 
                    setpersondata({
                        username: '',
                        email: '',
                        password: '',
                        confirm_password: ''
                    })
                }catch(err){
                    // failed to register or user is already exists
                    seterror(true)
                    setmessage("Failed to register")
                } 
            
            // error at password matching 
            }else{
                seterror(true)
                setmessage("Password do not match, try again!")
                return;
            }
        }
    }
    
    return(
        
        <>
        <form className="register" onSubmit={registerform}>
            <h1>REGISTER</h1>

            <input 
                type="text" 
                placeholder="Username" 
                name="username"
                onChange={handlechange}
                value={persondata.username}
            />
            <input  
                type="email" 
                placeholder="Email" 
                name="email"
                onChange={handlechange}
                value={persondata.email}
            />
            <input 
                type="password" 
                placeholder="Password" 
                name="password"
                onChange={handlechange}
                value={persondata.password}
            />
            <input 
                type="password" 
                placeholder="Confirm-Password" 
                name="confirm_password"
                onChange={handlechange}
                value={persondata.confirm_password}
            />
            {sucess&& <p className="sucess">{message}</p>}
            {error && <p className="error">{message}</p>}
            <button type="submit">Register</button>
        </form>
        </>
    )
}
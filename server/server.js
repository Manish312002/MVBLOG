import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import pg from 'pg'
import env from "dotenv"
import bcrypt from "bcrypt"
import cookieParser from 'cookie-parser'
import jwt from "jsonwebtoken"
import multer from 'multer'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

const app = express()
const port = 4000
const saltRounds = 10
const uploadMiddleware = multer({ dest: 'uploads/' })
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


env.config()

const secret = process.env.SECRET
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect()




app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:5173',credentials: true}))
app.use('/uploads', express.static(__dirname+'/uploads'))

app.post('/register',async (req,res) => {
    try{
        const {username, email, password} = req.body
        const chcekuser = await db.query("select * from users where username=$1",[username])
        if(chcekuser.rows.length > 0){
            res.json({message:"Username already exists!"})
        }else{
            bcrypt.hash(password,saltRounds, async(err,hash)=>{
                if(err){
                    res.json({message:"Error hashing Password"})
                }else{
                    const result = await db.query("insert into users (username,email,password) values ($1,$2,$3)",[username,email,hash])
                    res.json({message:"User has been registered"})
                }
            })
        }
    }catch(err){
        res.status(400).json(err)
    }
})

app.post('/login', async(req,res) => {
    const {username, password} = req.body
    try{
        const result = await db.query("select * from users where username=$1",[username])

        if(result.rows.length > 0){

            const user = result.rows[0]
            const hashedpassword = user.password

            bcrypt.compare(password,hashedpassword, (err,result) =>{
                if (err) {
                    return res.status(500).json({ message: 'Error comparing passwords' });
                }
    
                if (!result) {
                    return res.status(500).json({ message: 'Incorrect password' });
                }

                jwt.sign({username,id:user.id}, secret, {}, (error, token)=>{
                    if(error) throw err
                    res.cookie("token",token,{ httpOnly: true } ).json({id:user.id,username})
                })
                
        })
        }else{
            res.status(400).json({message:"User not found, Try again!"})
        }

    }catch(err){
        res.status(500).json({ message: 'Failed to connect to the database',err });
    }

})



app.get('/profile', (req,res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json(user);
    });
})

app.post('/logout', (req,res) => {
    res.cookie("token"," ", { maxAge: 0 }).json("Logout")
})

app.post('/create_post', uploadMiddleware.single('file'), (req,res) => {
    const {title,contentType,summary,content} = req.body
    const {originalname, path} = req.file

    const [name, ext] = originalname.split('.')
    const newpath = path+'.'+ext
    fs.renameSync(path,newpath)

    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token and get user info
        jwt.verify(token, secret, {}, async(err,user) => {
            if(err) throw err
            try{
                const result = await db.query("insert into posts(user_id,title,contenttype,summary,author,content,filepath) values($1,$2,$3,$4,$5,$6,$7)",[user.id,title,contentType,summary,user.username,content,newpath])
                res.json("sucess!!")
            }catch(err){
                res.json(err)
            }
        })
    } catch (err) {
        res.status(403).json({ message: 'Invalid token', error: err.message });
    }
})

app.get('/posts', async(req,res)=>{
    const result = await db.query("select * from posts ORDER BY RANDOM() LIMIT 20")
    res.json(result.rows)
})

app.get('/my_Posts', async(req,res) => {

    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token and get user info
        jwt.verify(token, secret, {}, async(err,user) => {
            if(err) throw err
            try{
                const result = await db.query("select * from posts where user_id=$1",[user.id])
                res.json(result.rows)
            }catch(err){
                res.json(err)
            }
        })
    } catch (err) {
        res.status(403).json({ message: 'Invalid token', error: err.message });
    }
})

app.get('/delete/:id',async (req,res) => {
    const id = parseInt(req.params.id)
    const result = await db.query(`delete from posts where id=$1`,[id])
    res.status(200).json({ message: `Post ${id} deleted` });
})

app.get('/post/:id', async(req,res) => {
    const id = parseInt(req.params.id)
    try{
        const result = await db.query('select * from posts where id=$1',[id])
        res.json(result.rows[0])
    }catch(err){
        res.json({message:'Failed to get post',err})
    }
})

app.get('/edit/:id', async(req,res) => {
    const id = parseInt(req.params.id)
    try{
        const result = await db.query('select * from posts where id=$1',[id])
        res.json(result.rows[0])
    }catch(err){
        res.json({message:'Failed to get post',err})
    }
})

app.post('/edit/:id', uploadMiddleware.single('file'), async(req,res) => {
    const id = parseInt(req.params.id)
    const {originalname, path} = req.file
    const {title,contentType,summary,content} = req.body
    const [name, ext] = originalname.split('.')
    const newpath = path+'.'+ext
    fs.renameSync(path,newpath)
    
    try {
        const result = await db.query('update posts set title=$1, contenttype=$2, summary=$3, content=$4, filepath=$5 where id=$6',[title,contentType,summary,content,newpath,id])
        res.status(200).json({ message: "Success" });
    } catch (err) {
        res.status(500).json("Failed to Update post",err)
    }
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
import { useState } from 'react'
import IndexPage from './components/indexpage'
import Layout from './components/Layout'
import LoginPage from './components/loginPage'
import RegisterPage from './components/registerpage'
import {Route, Routes} from 'react-router-dom'
import { UserContextProvider } from './userContext'
import CreatePost from './components/createPost'
import MyPosts from './components/myPosts'
import PostPage from './components/postPage'
import EditPage from './components/editPage'
import './App.css'

function App() {
 

  return (
    <>
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<IndexPage />} />
        <Route path='/My_Posts' element={<MyPosts />}/>
        <Route path='/Create_Post' element={<CreatePost />} />
        <Route path='/Login' element={<LoginPage />}/>
        <Route path='/Register' element={<RegisterPage />}/>
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/edit/:id' element={<EditPage />}/>
        
      </Route>
    </Routes>
    </UserContextProvider>
    </>
  )
}

export default App

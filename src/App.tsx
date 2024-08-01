import React, { useContext } from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap"
import NavBar from './components/NavBar'
import { AuthContext } from './context/AuthContext'
import { ChatContextProvider } from './context/chatContext'

const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
    <NavBar/>
    <Container className=''>
      <Routes>
        <Route path='/' element={user ? <Chat/>: <Login/> } />
        <Route path='/login' element={user ? <Chat/>: <Login/> } />
        <Route path='/register' element={user ? <Chat/>: <Register/> } />
        {/* //if we navigate to a page that doesnt exist, it will navigate to homepage */}
        <Route path='*' element={<Navigate to="/"/>} />
      </Routes>
    </Container>
    </ChatContextProvider>

  )
}

export default App

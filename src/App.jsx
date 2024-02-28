import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ChatBox from './components/ChatBox/ChatBox'
import ChatLogic from './components/ChatLogic/ChatLogic'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
//Context
import AuthProvider from './context/AuthContext'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<ChatLogic />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
{/*         <Footer /> */}
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

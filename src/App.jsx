import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ChatBox from './components/ChatBox/ChatBox'
import ChatLogic from './components/ChatLogic/ChatLogic'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Footer from './components/Footer/Footer'
//Context
import { useTheme } from './context/ThemeContext'


function App() {

  const theme = useTheme()

  return (
    <BrowserRouter>
      <div className={theme.darkMode ? 'dark-mode' : 'light-mode'}>
        <Navbar />
        <Routes>
          <Route path='/' element={<ChatLogic />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

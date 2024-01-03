import React from 'react'
import './App.css'
import { Header } from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'

function App() {
  return (
  <React.Fragment>
  <header>
    <Header/>
  </header>
  <main>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
    </Routes>
  </main>
  
  </React.Fragment>)
}

export default App

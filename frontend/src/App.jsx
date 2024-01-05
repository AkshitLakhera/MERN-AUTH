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
      {/* This  is connecting user route to a page with react router dom */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/user' element={<Welcome/>}/>
    </Routes>
  </main>
  
  </React.Fragment>)
}

export default App

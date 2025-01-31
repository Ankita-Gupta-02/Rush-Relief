import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element = {<Login/>} />
          <Route path='/register' element = {<Register/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App

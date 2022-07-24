import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Main from './Components/Main.js'
import Login from './Components/Login.js'
import Signup from './Components/Signup.js'
import Testing from './Components/Testing.js'
import Users from './Components/Users.js'
import Chat from './Components/Chat.js'

function App() {
  let isLoggedIn
  let testBool = false

  // callback function, returns boolean for if user is logged in
  const getLoggedIn = () => {
    return isLoggedIn
  }

  const setLoggedIn = (_isLoggedIn) => {
    isLoggedIn = _isLoggedIn
    console.log(_isLoggedIn)
  }

  return (
    <div id="router">
      <Router>
        <Routes>
          <Route
            path="https://chatapp-backend-a.herokuapp.com/"
            element={<Main getLoggedIn={getLoggedIn} />}
          />
          <Route
            path="https://chatapp-backend-a.herokuapp.com/testing"
            element={<Testing />}
          />
          <Route
            path="https://chatapp-backend-a.herokuapp.com/login"
            element={<Login setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="https://chatapp-backend-a.herokuapp.com/signup"
            element={<Signup />}
          />
          <Route
            path="https://chatapp-backend-a.herokuapp.com/users"
            element={<Users />}
          />
          <Route
            path="https://chatapp-backend-a.herokuapp.com/chat"
            element={
              <div className="smallDiv">
                <Chat />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import { Redirect, useHistory, Link } from 'react-router-dom'

function Login({ setCurrentUser }) {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            setCurrentUser(user)
            history.push('/groups')
          })
        } else {
          res.json().then(errors => {
            console.error(errors)
          })
        }
      })
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Redirect to="/" />
      <form className="w-2/3 bg-white p-8 max-w-md space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-center font-bold mb-2">Log In</h1>
        <p>
          <label 
            className="block text-lg font-semibold"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border"
          />
        </p>
        <p>
          <label 
            className="block text-lg font-semibold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border"
          />
        </p>
        <p><button className="w-full bg-green-500 py-2 mt-4" type="submit">Log In</button></p>
        <p className="text-center">-- or --</p>
        <p className="text-center"><Link className="py-4 px-6" to="/signup">Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login

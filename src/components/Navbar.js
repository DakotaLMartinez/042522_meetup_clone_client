import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CloudinaryUpload from './CloudinaryUpload'

function Navbar({setCurrentUser, currentUser, handleLogout}) {

  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleUpload = (result) => {
    const body = {
      profile_picture_url: result.info.secure_url,
      profile_picture_thumbnail_url: result.info.eager[0].secure_url
    }
    fetch('/api/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(user => {
        console.log(user);
        setCurrentUser(user)
      })
  }
  const profilePic = () => {
    if (currentUser.profile_picture_thumbnail_url) {
      return (
        <img
          src={currentUser.profile_picture_thumbnail_url}
          alt={currentUser.username}
          className="rounded-full ml-auto"
        />
      )
    } else {
      return `Logged in as ${currentUser.username}`
    }
    
  }

  return (
    <nav className="flex items-center justify-between text-2xl border-black border-b-2 pb-2 mb-4">
      <div className="">
        <NavLink className="pr-6 py-6" to="/groups">Groups</NavLink>
        <NavLink className="pr-2 py-6" to="/events">Events</NavLink>
      </div>
      <div className="flex flex-col">
        <button className="text-right" onClick={() => setNavbarOpen(!navbarOpen)}>
          {profilePic()}
        </button>
        <div className="relative w-52">
          <div className={`flex flex-col w-52 bg-white shadow overflow-hidden absolute space-y-3 text-lg ${navbarOpen ? 'p-4 max-h-screen' : 'p-0 max-h-0'}`}>
            <CloudinaryUpload
              preset="sxyvnfnd"
              buttonText="Add Profile Picture"
              handleUpload={handleUpload}
            />
            <hr/>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

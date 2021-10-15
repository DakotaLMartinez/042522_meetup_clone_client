import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function GroupsList({ groups, leaveGroup, joinGroup, createGroup }) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const leaveOrJoinButton = (group) => {
    if (group.user_group) {
      return <button className="px-4 py-1 bg-red-400 text-white" onClick={() => leaveGroup(group.id)}>Leave Group</button>
    } else {
      return <button className="px-4 py-1 bg-green-500 text-white" onClick={() => joinGroup(group.id)}>Join Group</button>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createGroup({ name, location })
    setName('')
    setLocation('')
  }
  
  return (
    <div>
      <h1 className="text-3xl my-4 font-bold">Groups</h1>
      <div className="space-y-4 my-4">
        {groups.map(group => (
          <p className="flex justify-between items-center">
            <Link to={`groups/${group.id}`}>{group.name}</Link> <span>{leaveOrJoinButton(group)}</span>
          </p>
        ))}
      </div>
      <h3 className="text-xl mt-8 font-bold">Add Group</h3>
      <form className="md:flex md:space-x-2 my-4 items-center" onSubmit={handleSubmit}>
        <label className="block" htmlFor="name">Name </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          className="md:flex-grow md:inline-block border-b-2 border-black outline-none px-1 w-full md:w-auto"
        />
        <label className="block" htmlFor="name"> Location </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          name="location"
          className="md:flex-grow md:inline-block border-b-2 border-black outline-none px-1 w-full md:w-auto"
        />
        {" "}<button className="mt-4 md:mt-0 px-4 py-1 bg-green-500" type="submit">Add</button>
      </form>
    </div>
  )
}

export default GroupsList

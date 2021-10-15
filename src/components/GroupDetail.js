import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

function GroupDetail({ groupId, leaveGroup, joinGroup }) {
  const [group, setGroup] = useState(null)

  const fetchGroupCallback = useCallback(() => {
    fetch(`/api/groups/${groupId}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(group => setGroup(group))
  }, [groupId])
  
  useEffect(() => {
    fetchGroupCallback()
  }, [fetchGroupCallback])

  const leaveOrJoinButton = (group) => {
    if (group.user_group) {
      return (
        <button
          className="px-4 py-1 bg-red-400 text-white" 
          onClick={() => leaveGroup(group.id).then(() => fetchGroupCallback())}
        >
          Leave Group
        </button>
      )
    } else {
      return (
        <button
          className="px-4 py-1 bg-green-500 text-white" 
          onClick={() => joinGroup(group.id).then(() => fetchGroupCallback())}
        >
          Join Group
        </button>
      )
    }
  }

  if(!group){ return <div></div>}
  
  return (
    <div>
      <h1 className="font-bold text-3xl">{group.name}</h1>
      {leaveOrJoinButton(group)}
      <h2 className="font-bold text-2xl">Members</h2>
      <ul>
        {group.members?.map(member => <li>{member.username}</li>)}
      </ul>
      <h2 className="font-bold text-2xl">Events</h2>
      <ul>
        {/* {group.events?.map((event) => <li><Link to={`/events/${event.id}`}>{event.title}</Link></li>)} */}
        {group.events?.map(event => (
          <li
            className="flex justify-between items-center">
            <Link to={`/events/${event.id}`}>
              {event.poster_image_url && <img src={event.poster_image_url} alt={event.title} className="w-28 h-28 object-fill" />}
              {event.title}
            </Link>
            {/* <span>{rsvpOrCancelButton(event)} {cancelEventButton(event)}</span> */}
          </li>
        ))}
      </ul>
    </div>
  )
  
}

export default GroupDetail

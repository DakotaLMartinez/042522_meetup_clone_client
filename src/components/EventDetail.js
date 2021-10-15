import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

function EventDetail({ eventId, removeRsvpToEvent, rsvpToEvent, cancelEvent }) {
  const [event, setEvent] = useState(null)
  const history = useHistory();

  const fetchEventCallback = useCallback(
    () => {
      fetch(`/api/events/${eventId}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(event => setEvent(event))
    },
    [eventId],
  )

  useEffect(() => {
    fetchEventCallback()
  }, [fetchEventCallback])


  const cancelEventButton = (event) => {
    if (event.user_can_modify) {
      return (
        <p>
          <button
            className="px-4 py-1 bg-red-400 text-white" 
            onClick={handleCancel}
          >
            Cancel Event
          </button>
        </p>
      )
    }
  }

  const handleCancel = (e) => {
    cancelEvent(event.id);
    history.push('/events')
  }

  const rsvpButton = (event) => {
    if (event.user_event) {
      return (
        <button
          className="px-4 py-1 bg-red-400 text-white"
          onClick={() => {
            removeRsvpToEvent(event.id).then(() => fetchEventCallback())
          }
        }>
          Cancel RSVP
        </button >
      )
    } else {
      return (
        <button
          className="px-4 py-1 bg-green-500 text-white" 
          onClick={() => {
            rsvpToEvent(event.id).then(() => fetchEventCallback())
          }
        }>
          RSVP for event
        </button>
      )
    }
  }
  
  if(!event) { return <div></div>}
  return (
    <div>
      <h1 className="font-bold text-3xl">{event.title}</h1>
      {event.poster_image_url && (<img src={event.poster_image_url} alt={event.title} className="my-4" />)}
      {cancelEventButton(event)}
      <small>Created by {event.creator} for <Link to={`/groups/${event.group.id}`}>{event.group.name}</Link></small>
      <p>{event.description}</p>
      <p>{event.time}</p>
      <p>Location: {event.location}</p>
      <p>{rsvpButton(event)}</p>
      <ul>
        {event.attendees.map(attendee => (
          <li>{attendee.username}</li>
        ))}
      </ul>


    </div>
  )
}

export default EventDetail

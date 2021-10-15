import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CloudinaryUpload from './CloudinaryUpload'

function EventsList({ events, groups, removeRsvpToEvent, cancelEvent, rsvpToEvent, createEvent }) {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState(now.toISOString().slice(0, 16))
  const [endTime, setEndTime] = useState('')
  const [groupName, setGroupName] = useState('')
  const [posterUrl, setPosterUrl] = useState('')



  const rsvpOrCancelButton = (event) => {
    if (event.user_event) {
      return <button className="px-4 py-1 bg-red-400 text-white" onClick={() => removeRsvpToEvent(event.id)}>Cancel RSVP</button>
    } else {
      return <button className="px-4 py-1 bg-green-500 text-white" onClick={() => rsvpToEvent(event.id)}>RSVP for event</button>
    }
  }

  const cancelEventButton = (event) => {
    if (event.user_is_creator) {
      return <button className="px-4 py-1 bg-red-400 text-white" onClick={() => cancelEvent(event.id)}>Cancel Event</button>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createEvent({
      title,
      description,
      location,
      start_time: startTime,
      end_time: endTime,
      group_name: groupName,
      poster_image_url: posterUrl
    })
    setTitle('')
    setDescription('')
    setLocation('')
    setStartTime('')
    setEndTime('')
    setGroupName('')
    setPosterUrl('')
  }

  const handlePosterUpload = (result) => {
    setPosterUrl(result.info.secure_url)
  }

  const posterPreview = () => {
    if (posterUrl) {
      return (
        <img
          src={posterUrl}
          className="w-28 h-28 object-fill"
          alt={title}
        />
      )
    }
  }
  
  return (
    <div>
      <h1 className="text-3xl my-4 font-bold">Events</h1>
      <div className="space-y-4 my-4">
        {events.map(event => (
          <p
            className="flex justify-between items-center">
            <Link to={`events/${event.id}`}>
              {event.poster_image_url && <img src={event.poster_image_url} alt={event.title} className="w-28 h-28 object-fill" />}
              {event.title}
            </Link>
            <span>{rsvpOrCancelButton(event)} {cancelEventButton(event)}</span>
          </p>
        ))}
      </div>
      <h3 className="text-xl mt-8 font-bold">Add Event</h3>
      <form className="my-4 space-y-4" onSubmit={handleSubmit}>
        <p className="flex items-center">
          <label className="w-28 inline-block" htmlFor="title">Title </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            className="flex-grow md:inline-block border-b-2 border-black outline-none px-1 md:ml-2"
          />
        </p>
        <p className="flex items-center">
          <label className="w-28 inline-block" htmlFor="description"> Description </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            className="flex-grow md:inline-block border-b-2 border-black outline-none px-1 md:ml-2"
          />
        </p>
        <p className="flex items-center">
          <label className="w-28 inline-block" htmlFor="name"> Location </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            name="location"
            className="flex-grow md:inline-block border-b-2 border-black outline-none px-1 md:ml-2"
          />
        </p>
        <p className="flex items-center">
          <label className="w-28 inline-block" htmlFor="start_time"> Start Time </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            name="start_time"
            className="flex-grow md:inline-block border-b-2 border-black outline-none px-1 md:ml-2"
          />
        </p>
        <p className="flex items-center">
          <label className="w-28 inline-block" htmlFor="end_time"> End Time </label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            name="end_time"
            className="flex-grow md:inline-block border-b-2 border-black outline-none px-1 md:ml-2"
          />
        </p>
        <p className="flex items-center">
          <label className="w-28 inline-block" htmlfor="group_name">Group Name </label>
          <input
            type="text"
            name="group_name"
            value={groupName}
            list="groups"
            onChange={(e) => setGroupName(e.target.value)}
            className="flex-grow md:inline-block border-b-2 border-black outline-none px-1 md:ml-2"
          />
          <datalist id="groups">
            {groups.map(group => <option>{group.name}</option>)}
          </datalist>
        </p>
        <p>
          {posterPreview()}
          <CloudinaryUpload
            preset="rrsszoxs"
            buttonText="Add Event Poster"
            handleUpload={handlePosterUpload}
          />
        </p>
        <p>
          <button className="block bg-green-500 w-full py-2 mt-8" type="submit">Add Event</button>
        </p>
      </form>
    </div>
  )
}

export default EventsList

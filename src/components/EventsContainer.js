import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import EventsList from './EventsList'
import EventDetail from './EventDetail'

function EventsContainer() {
  const [events, setEvents] = useState([])
  const [groups, setGroups] = useState([])
  
  useEffect(() => {
    fetch(`/events`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(events => setEvents(events))
    fetch(`/groups`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(groups => setGroups(groups))
  },[])

  const removeRsvpToEvent = (eventId) => {
    const event = events.find(event => event.id === eventId)
    return fetch(`/rsvps/${event.rsvp.id}`, {
      method: "DELETE",
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          // if the event is the one we just removed an rsvp 
          // for, set its rsvp property in state to 
          // undefined; If not, leave the event as it is
          const updatedEvents = events.map((event) => {
            if (event.id === eventId) {
              return {
                ...event,
                rsvp: undefined
              }
            } else {
              return event
            }
          })
          setEvents(updatedEvents)
        }
      })
  }

  const cancelEvent = (eventId) => {
    return fetch(`/events/${eventId}`, {
      method: "DELETE",
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          const updatedEvents = events.filter(event => event.id !== eventId)
          setEvents(updatedEvents)
        }
      })
  }
  const rsvpToEvent = (eventId) => {
    return fetch('/rsvps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        event_id: eventId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(rsvp => {
        // if the event is the one we just rsvp'd to
        // add a rsvp property in state and set
        // it to the rsvp; if not, leave it as is
        const updatedEvents = events.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              rsvp: rsvp
            }
          } else {
            return event
          }
        })
        setEvents(updatedEvents)
      })
  }

  const createEvent = (formData) => {
    return fetch("/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(event => {
        setEvents(events.concat(event))
      })
  }

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/events"
        >
          <EventsList
            events={events}
            groups={groups}
            cancelEvent={cancelEvent}
            removeRsvpToEvent={removeRsvpToEvent}
            rsvpToEvent={rsvpToEvent}
            createEvent={createEvent}
          />
        </Route>
        <Route
          exact
          path="/events/:id"
          render={({ match }) => {
            return <EventDetail
              eventId={match.params.id}
              cancelEvent={cancelEvent}
              removeRsvpToEvent={removeRsvpToEvent}
              rsvpToEvent={rsvpToEvent}
            />
          }}
        />
      </Switch>
    </div>
  )
}

export default EventsContainer

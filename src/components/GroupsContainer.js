import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import GroupsList from './GroupsList'
import GroupDetail from './GroupDetail'

function GroupsContainer() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("/groups", {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(groups => setGroups(groups))
  }, [])


  const leaveGroup = (groupId) => {
    let membership = groups.find(group => group.id === groupId).membership.id
    return fetch(`/memberships/${membership}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          const updatedGroups = groups.map(group => {
            if (group.id === groupId) {
              return {
                ...group,
                membership: undefined
              }
            } else {
              return group
            }
          })
          setGroups(updatedGroups)
        }
      })
  }

  const joinGroup = (groupId) => {
    return fetch('/memberships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        group_id: groupId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(membership => {
        const updatedGroups = groups.map(group => {
          if (group.id === groupId) {
            return {
              ...group,
              membership: membership
            }
          } else {
            return group
          }
        })
        setGroups(updatedGroups)
      })
  }

  const createGroup = (formData) => {
    return fetch("/groups", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
      .then(group => {
        setGroups(groups.concat(group))
      })
  }

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/groups"
        >
          <GroupsList
            groups={groups}
            leaveGroup={leaveGroup}
            joinGroup={joinGroup}
            createGroup={createGroup}
          />
        </Route>
        <Route
          exact
          path="/groups/:id"
          render={({ match }) => {
            return (
              <GroupDetail
                groupId={match.params.id}
                leaveGroup={leaveGroup}
                joinGroup={joinGroup}
              />
            )
          }}
        />
      </Switch>
    </div>
  )
}

export default GroupsContainer

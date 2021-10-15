import './App.css';
import GroupsContainer from './components/GroupsContainer'
import EventsContainer from './components/EventsContainer'
import Navbar from './components/Navbar'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

function AuthenticatedApp({ currentUser, setCurrentUser }) {
  const history = useHistory()
  
  const handleLogout = () => {
    fetch(`/api/logout`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          setCurrentUser(null)
          history.push('/')
        }
      })
  }

  return (
    <div className="App max-w-5xl">
      <Navbar
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route path="/groups">
          <GroupsContainer />
        </Route>
        <Route path="/events">
          <EventsContainer />
        </Route>
        <Redirect to="/groups" />
      </Switch>
    </div>
  );
}

export default AuthenticatedApp;

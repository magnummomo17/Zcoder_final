import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import Menubar from './components/Menubar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Problem from './pages/Problem'
import NewProb from './pages/NewProb'
import Profile from './pages/Profile'
import EditProfile from './components/Edit_Profile'
import UpdateProfile from './components/Update_Profile'
import OtherProfile from './pages/Other_Profile'
import Saved from './pages/Saved'
import Contest from './pages/Contest'
import NotFoundPage from './pages/404'
import Playground from './pages/Playground'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()

  useEffect(() => {
    document.title = "reddit for nerds"
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Menubar />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to="/problem" />}
          />
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path='/contest'
            element={<Contest />}
          />
          <Route
            path='/playground'
            element={<Playground />}
          />
          <Route
            path='/problem'
            element={user ? <Problem /> : <Navigate to="/signup" />}
          />
          <Route
            path='/profile'
            element={user ? <Profile /> : <Navigate to="/signup" />}
          />
          <Route
            path='/profile/:usenam'
            element={< OtherProfile />}
          />
          <Route
            path='/profile/edit'
            element={user ? <EditProfile /> : <Navigate to="/signup" />}
          />
          <Route
            path='/profile/update'
            element={user ? < UpdateProfile /> : <Navigate to="/signup" />}
          />
          <Route
            path='/problem/new'
            element={user ? <NewProb /> : <Navigate to="/signup" />}
          />
          <Route
            path='/saved'
            element={user ? <Saved /> : <Navigate to="/signup" />}
          />
          
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

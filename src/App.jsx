import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Body from './components/Body'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Logout from './components/Logout'
import Connections from './components/Connections'
import Requests from './components/Requests'
import ProjectList from './components/projects/ProjectList'
import ProjectDetail from './components/projects/ProjectDetail'
import CreateProject from './components/projects/CreateProject'
import ProtectedRoute from './components/ProtectedRoute'
import Chat from './components/chat/Chat'

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/feed" element={<Feed/>} />
              <Route path="login" element={<Login/>} />
              <Route path="/logout" element={<Logout/>}/>
              <Route path="profile" element={<Profile/>} />
              <Route path="/user/connections" element={<Connections/>} />
              <Route path="/user/request/received" element={<Requests/>} />
              <Route path="/projects" element={<ProtectedRoute><ProjectList/></ProtectedRoute>} />
              <Route path="/projects/new" element={<ProtectedRoute><CreateProject/></ProtectedRoute>} />
              <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail/></ProtectedRoute>} />
              <Route path="/chat/:targetUserId" element={<Chat/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import ProtectedRoute from './components/ProtectedRoute'

// Use React.lazy for code splitting to improve performance
const Login = lazy(() => import('./components/Login'))
const Profile = lazy(() => import('./components/Profile'))
const Feed = lazy(() => import('./components/Feed'))
const Logout = lazy(() => import('./components/Logout'))
const Connections = lazy(() => import('./components/Connections'))
const Requests = lazy(() => import('./components/Requests'))
const ProjectList = lazy(() => import('./components/projects/ProjectList'))
const ProjectDetail = lazy(() => import('./components/projects/ProjectDetail'))
const CreateProject = lazy(() => import('./components/projects/CreateProject'))
const Chat = lazy(() => import('./components/chat/Chat'))
const HomePage = lazy(() => import('./components/HomePage'))
const UserPublicProjects = lazy(() => import('./components/UserPublicProjects'))

// Loading component for Suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
)

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Body/>}>
                <Route index element={<HomePage />} />
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
                <Route path="/user/:userId/projects" element={<UserPublicProjects />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Components
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Logout from './pages/Logout/Logout'
import Landing from './pages/Landing/Landing'
import NavBar from './components/NavBar/NavBar'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import BlogList from './pages/BlogList/BlogList'
import BlogDetails from './pages/BlogDetails/BlogDetails'
import NewBlog from './pages/NewBlog/NewBlog'

// Services
import * as authService from './services/authService'
import * as blogService from './services/blogService'

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())
  const [blogs, setBlogs] = useState([])

  const handleLogout = () => {
    setUser(null)
    authService.logout()
    navigate('/logout')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const data = await blogService.index()
      console.log("BLOG DATA:", data);
      setBlogs(data)
    }
    if (user) fetchAllBlogs()
  }, [user])

  const handleAddBlog = async (blogData) => {
    const newBlog = await blogService.create(blogData)
    setBlogs([newBlog, ...blogs])
    navigate('/blogs')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/logout" element={<Logout />} />
        <Route 
          path="/login" 
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />} 
        />
        <Route 
          path="/signup" 
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />} 
        />
        <Route path="/change-password" element={
          <ProtectedRoute user={user}>
            <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
          </ProtectedRoute>
        } />

        <Route path="/profiles" element={
          <ProtectedRoute user={user}>
            <Profiles />
          </ProtectedRoute>
        } />
        <Route 
          path="/blogs"
          element={
            <ProtectedRoute user={user}>
              <BlogList blogs={blogs}/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/blogs/:id'
          element={
            <ProtectedRoute user={user}>
              <BlogDetails user={user} />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/blogs/new"
          element={
            <ProtectedRoute user={user}>
              <NewBlog handleAddBlog={handleAddBlog}/>
            </ProtectedRoute>
          }
        />
            
      </Routes>
    </>
  )
}

export default App
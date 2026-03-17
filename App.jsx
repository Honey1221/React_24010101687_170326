import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import LoginPage from './auth/LoginPage'
import Dashboard from './admin/Dashboard'
import Users from './admin/Users'

function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </div>
    </>
  )
}

export default App

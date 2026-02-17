import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import Items from './pages/user/Items'
import { Toaster } from 'react-hot-toast'
import Profile from './pages/Profile.jsx'
import ItemDetail from './pages/user/ItemDetail.jsx'

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/item" element={<Items />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="*" element={<h1 className='text-center text-3xl mt-20'>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App

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
import Cart from './pages/user/Cart'
import OrderDetails from './pages/user/OrderDetails'
import ProtectedRoute from './context/ProtectedRoute.jsx'
import PublicRoute from './context/PublicRoute.jsx'
import NotFound from './pages/NotFound'
import Unauthorize from './pages/Unauthorize'

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/item" element={<ProtectedRoute><Items /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/item/:id" element={<ProtectedRoute><ItemDetail /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<Unauthorize />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/user' element={<ProtectedRoute />} >
          <Route path='/user' element={<UserPage />} />
        </Route>
        <Route path='/admin' element={<ProtectedRoute />} >
          <Route path='/admin' element={<AdminPage />} />
        </Route>
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
      <ToastContainer />
    </>
    
  )
}

export default App

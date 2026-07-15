import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminCRM from './pages/AdminCRM';
import TecnicoView from './pages/TecnicoView';

// Componente para proteger las rutas
function ProtectedRoute({ children, allowedRoles }) {
  const userStr = localStorage.getItem('atrios_user');
  
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (!allowedRoles.includes(user.rol)) {
      return <Navigate to={user.rol === 'admin' ? '/admin' : '/tecnico'} replace />;
    }
  } catch (e) {
    localStorage.removeItem('atrios_user');
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas Modulares */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Privadas / Protegidas */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminCRM />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tecnico" 
          element={
            <ProtectedRoute allowedRoles={['tecnico']}>
              <TecnicoView />
            </ProtectedRoute>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

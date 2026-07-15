import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, Sun, Moon, Lock } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('atrios_theme') || 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('atrios_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* El logo principal también servirá como atajo secreto al hacer clic */}
      <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
        <Shield size={32} color="#f5b700" />
        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>
          ATRIOS <span style={{ color: '#f5b700' }}>DIGITAL</span>
        </span>
      </NavLink>

      <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            color: isActive ? '#f5b700' : 'var(--text-secondary)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s'
          })}
        >
          Inicio
        </NavLink>
        <NavLink 
          to="/nosotros" 
          style={({ isActive }) => ({
            color: isActive ? '#f5b700' : 'var(--text-secondary)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s'
          })}
        >
          Nosotros
        </NavLink>
        <NavLink 
          to="/servicios" 
          style={({ isActive }) => ({
            color: isActive ? '#f5b700' : 'var(--text-secondary)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s'
          })}
        >
          Servicios
        </NavLink>
        <NavLink 
          to="/productos" 
          style={({ isActive }) => ({
            color: isActive ? '#f5b700' : 'var(--text-secondary)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s'
          })}
        >
          Catálogo
        </NavLink>
        <NavLink 
          to="/contacto" 
          style={({ isActive }) => ({
            color: isActive ? '#f5b700' : 'var(--text-secondary)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s'
          })}
        >
          Contacto
        </NavLink>
        
        {/* Switch de Tema */}
        <button 
          onClick={toggleTheme}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-primary)', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '8px'
          }}
          title="Cambiar tema"
        >
          {theme === 'dark' ? <Sun size={20} color="#f5b700" /> : <Moon size={20} />}
        </button>

        {/* Pequeño icono de acceso de seguridad / Login secreto */}
        <button
          onClick={() => navigate('/login')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            opacity: 0.4,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            transition: 'opacity 0.2s, color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.style.color = '#f5b700';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = 0.4;
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          title="Acceso restringido"
        >
          <Lock size={14} />
        </button>
      </nav>
    </header>
  );
}

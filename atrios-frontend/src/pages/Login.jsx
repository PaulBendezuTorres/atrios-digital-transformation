import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciales incorrectas');
      }

      if (data.success) {
        // Almacenar datos de sesión
        localStorage.setItem('atrios_user', JSON.stringify(data.user));
        
        // Redirección según rol
        if (data.user.rol === 'admin') {
          navigate('/admin');
        } else if (data.user.rol === 'tecnico') {
          navigate('/tecnico');
        }
      }
    } catch (err) {
      setError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '24px',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.05) 0%, transparent 80%)'
      }}
    >
      {/* Botón de regreso */}
      <a 
        href="/" 
        style={{ 
          position: 'absolute', 
          top: '32px', 
          left: '32px', 
          color: '#94a3b8', 
          textDecoration: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          fontWeight: 500 
        }}
      >
        <ArrowLeft size={20} /> Volver a la Landing
      </a>

      <div 
        className="glass-panel" 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          padding: '40px 30px', 
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '16px', 
              background: 'rgba(0, 210, 255, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Shield size={32} color="#00d2ff" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center' }}>Portal Atrios</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center' }}>Ingreso exclusivo para administradores y técnicos</p>
        </div>

        {error && (
          <div 
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              borderRadius: '8px', 
              color: '#ef4444', 
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 500 }}>Usuario:</label>
            <div style={{ position: 'relative' }}>
              <User 
                size={18} 
                color="#64748b" 
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
              />
              <input 
                type="text" 
                placeholder="Ej: carlos_admin" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 500 }}>Contraseña:</label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={18} 
                color="#64748b" 
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
              />
              <input 
                type="password" 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ 
              width: '100%', 
              padding: '12px', 
              justifyContent: 'center', 
              fontSize: '0.95rem',
              marginTop: '8px'
            }}
          >
            {loading ? 'Validando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginTop: '12px' }}>
          <p>Demos locales para simulación:</p>
          <p style={{ marginTop: '4px' }}>Carlos: <strong>carlos_admin</strong> / AtriosCrmAdmin2026!</p>
          <p>Juan: <strong>juan_tecnico</strong> / AtriosJuanTec2026!</p>
        </div>
      </div>
    </div>
  );
}

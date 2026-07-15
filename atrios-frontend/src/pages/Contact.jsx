import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';
import { Phone, Mail, MapPin, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [detalles, setDetalles] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim() || !direccion.trim()) {
      setError('Por favor completa todos los campos requeridos (*).');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_completo: nombre,
          telefono: telefono,
          direccion: direccion,
          detalles: detalles || 'Cotización solicitada desde formulario de contacto web.'
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar tu solicitud en el sistema.');
      }

      setSuccess(true);
      setNombre('');
      setTelefono('');
      setDireccion('');
      setDetalles('');
    } catch (err) {
      setError(err.message || 'Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar />

      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#f5b700', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Contacto</span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginTop: '10px' }}>Inicia Tu Proyecto Con Nosotros</h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
            {/* Formulario */}
            <div className="glass-panel" style={{ padding: '40px 30px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>Solicita Asesoría o Cotización</h3>

              {success && (
                <div 
                  style={{ 
                    padding: '12px', 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    border: '1px solid rgba(16, 185, 129, 0.2)', 
                    borderRadius: '8px', 
                    color: '#10b981', 
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '20px'
                  }}
                >
                  <CheckCircle size={18} />
                  <span>¡Solicitud registrada correctamente en Postgres! Nos comunicaremos contigo.</span>
                </div>
              )}

              {error && (
                <div 
                  style={{ 
                    padding: '12px', 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    border: '1px solid rgba(239, 68, 68, 0.2)', 
                    borderRadius: '8px', 
                    color: '#ef4444', 
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '20px'
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>Nombre Completo *</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Carlos Silva"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>Número Celular *</label>
                  <input 
                    type="tel" 
                    placeholder="Ej: 987654321"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ''))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>Dirección (Lima) *</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Av. Benavides 1234, Miraflores"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>Detalles del Requerimiento</label>
                  <textarea 
                    placeholder="Ej: Cotizar instalación de cerco eléctrico y 4 cámaras de seguridad."
                    rows="3"
                    value={detalles}
                    onChange={(e) => setDetalles(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem',
                      resize: 'none'
                    }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary" 
                  style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '0.95rem', gap: '8px', marginTop: '8px' }}
                >
                  <Send size={16} /> {loading ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </form>
            </div>

            {/* Datos de contacto */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Oficina Central</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Visítanos o agenda una reunión comercial en nuestra oficina en Santiago de Surco.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin color="#f5b700" size={20} /> <span>Jr. Bodegones 337, Santiago de Surco, Lima</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone color="#f5b700" size={20} /> <span>+51 960 310 542</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail color="#f5b700" size={20} /> <span>ventas@atrios.pe</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock color="#f5b700" size={20} /> <span>Lun-Vie: 8:00 - 18:00 | Sáb: 9:00 - 13:00</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <ChatbotWidget />
      <Footer />
    </div>
  );
}

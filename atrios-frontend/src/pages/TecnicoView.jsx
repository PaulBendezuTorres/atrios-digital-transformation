import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Phone, CheckCircle, Play, Camera, RefreshCw, LogOut } from 'lucide-react';

export default function TecnicoView() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('atrios_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('atrios_user');
    navigate('/login');
  };

  const fetchTareas = async () => {
    if (!user.nombre) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/tickets');
      if (res.ok) {
        const allTickets = await res.json();
        // Filtrar tareas que corresponden al técnico logueado
        const filtered = allTickets.filter(t => t.tecnico_nombre === user.nombre);
        setTareas(filtered);
      }
    } catch (err) {
      console.error('Error al cargar tareas del operario:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  const handleStartService = async (id_servicio) => {
    setUpdatingId(id_servicio);
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${id_servicio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado_servicio: 'En Proceso'
        }),
      });

      if (response.ok) {
        alert('Estado cambiado a "En Proceso". ¡A trabajar!');
        fetchTareas();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFinishService = async (id_servicio) => {
    setUpdatingId(id_servicio);
    const stockEvidenciaUrl = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80';
    const inputUrl = prompt('Ingresa la URL de la imagen de evidencia (o acepta para usar la imagen simulada):', stockEvidenciaUrl);
    
    if (inputUrl === null) {
      setUpdatingId(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${id_servicio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado_servicio: 'Finalizado',
          evidencia_url: inputUrl || stockEvidenciaUrl
        }),
      });

      if (response.ok) {
        alert('Servicio finalizado con éxito. Evidencia registrada en PostgreSQL.');
        fetchTareas();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '24px', maxWidth: '600px', margin: '0 auto', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <a href="/" style={{ color: '#00d2ff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
          <ArrowLeft size={20} /> Volver a la Landing
        </a>
        <button
          onClick={handleLogout}
          className="btn-secondary"
          style={{ padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}
        >
          <LogOut size={14} /> Cerrar Sesión
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px' }}>Portal Operarios</h1>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Técnico: <strong>{user.nombre}</strong>
          </span>
        </div>
        <button
          onClick={fetchTareas}
          className="btn-secondary"
          style={{ padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
        >
          <RefreshCw size={14} /> Refrescar
        </button>
      </div>

      {/* Listado de tareas */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>Mis Tareas Asignadas</h3>
        
        {loading ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>Buscando tareas asignadas...</p>
        ) : tareas.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>No tienes tareas asignadas pendientes de cierre.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {tareas.map(tarea => (
              <div key={tarea.id_servicio} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Ticket #{tarea.id_servicio} • {tarea.tipo_servicio}</span>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: tarea.estado_servicio === 'Finalizado' ? 'var(--status-finished)' : (tarea.estado_servicio === 'En Proceso' ? '#f59e0b' : 'var(--status-assigned)'),
                    background: tarea.estado_servicio === 'Finalizado' ? 'var(--status-finished-bg)' : (tarea.estado_servicio === 'En Proceso' ? 'rgba(245, 158, 11, 0.15)' : 'var(--status-assigned-bg)')
                  }}>
                    {tarea.estado_servicio}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{tarea.cliente_nombre}</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color="#00d2ff" />
                    <a href={`tel:${tarea.cliente_telefono}`} style={{ color: '#00d2ff', textDecoration: 'none', fontWeight: 500 }}>{tarea.cliente_telefono}</a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} color="#00d2ff" />
                    <span>{tarea.cliente_direccion}</span>
                  </div>
                </div>

                <div style={{ padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                  <strong>Detalle:</strong> {tarea.detalles_requerimiento}
                </div>

                {tarea.evidencia_url && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--status-finished)', display: 'flex', gap: '4px', alignItems: 'center', fontWeight: 500 }}>
                    <CheckCircle size={14} /> Evidencia registrada en PostgreSQL
                  </div>
                )}

                {/* Botones de acción */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  {tarea.estado_servicio === 'Asignado' && (
                    <button
                      onClick={() => handleStartService(tarea.id_servicio)}
                      disabled={updatingId === tarea.id_servicio}
                      className="btn-primary"
                      style={{ flex: 1, padding: '10px', fontSize: '0.85rem', justifyContent: 'center', gap: '6px' }}
                    >
                      <Play size={16} /> {updatingId === tarea.id_servicio ? 'Procesando...' : 'Iniciar Trabajo'}
                    </button>
                  )}
                  
                  {tarea.estado_servicio !== 'Finalizado' && (
                    <button
                      onClick={() => handleFinishService(tarea.id_servicio)}
                      disabled={updatingId === tarea.id_servicio}
                      className="btn-primary"
                      style={{
                        flex: 1,
                        padding: '10px',
                        fontSize: '0.85rem',
                        justifyContent: 'center',
                        gap: '6px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                      }}
                    >
                      <CheckCircle size={16} /> {updatingId === tarea.id_servicio ? 'Procesando...' : 'Cerrar & Evidencia'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

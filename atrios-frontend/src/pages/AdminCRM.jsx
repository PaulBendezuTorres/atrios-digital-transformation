import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle, Clock, Edit3, ArrowLeft, RefreshCw, LogOut, Shield } from 'lucide-react';

export default function AdminCRM() {
  const [tickets, setTickets] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [selectedTecnicos, setSelectedTecnicos] = useState({});
  const [selectedEstados, setSelectedEstados] = useState({});

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('atrios_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('atrios_user');
    navigate('/login');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const resTickets = await fetch('http://localhost:3001/api/tickets');
      const resTecnicos = await fetch('http://localhost:3001/api/tecnicos');
      
      if (resTickets.ok && resTecnicos.ok) {
        const dataTickets = await resTickets.json();
        const dataTecnicos = await resTecnicos.json();
        
        setTickets(dataTickets);
        setTecnicos(dataTecnicos);

        const initialTecs = {};
        const initialEsts = {};
        dataTickets.forEach(t => {
          const tecIdStr = t.tecnico_nombre ? dataTecnicos.find(tec => tec.nombre === t.tecnico_nombre)?.id_tecnico || '' : '';
          initialTecs[t.id_servicio] = tecIdStr;
          initialEsts[t.id_servicio] = t.estado_servicio;
        });
        setSelectedTecnicos(initialTecs);
        setSelectedEstados(initialEsts);
      }
    } catch (err) {
      console.error('Error al cargar datos del CRM:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateTicket = async (id_servicio) => {
    setUpdatingId(id_servicio);
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${id_servicio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado_servicio: selectedEstados[id_servicio],
          id_tecnico: selectedTecnicos[id_servicio],
        }),
      });

      if (response.ok) {
        alert('Ticket actualizado correctamente en PostgreSQL.');
        fetchData();
      } else {
        alert('Error al actualizar el ticket.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión.');
    } finally {
      setUpdatingId(null);
    }
  };

  const total = tickets.length;
  const pendientes = tickets.filter(t => t.estado_servicio === 'Pendiente').length;
  const enProceso = tickets.filter(t => t.estado_servicio === 'Asignado' || t.estado_servicio === 'En Proceso').length;
  const finalizados = tickets.filter(t => t.estado_servicio === 'Finalizado').length;

  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Cabecera del Panel */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 24px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ color: '#00d2ff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
          <ArrowLeft size={20} /> Volver a la Landing
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Conectado como: <strong>{user.nombre || 'Administrador'}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="btn-secondary"
            style={{ padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Título de la sección */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '8px' }}>Atrios CRM</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Panel de Control y Asignación de Servicios Técnicos (Carlos - Coordinador)</p>
        </div>
        <button
          onClick={fetchData}
          className="btn-secondary"
          style={{ padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
        >
          <RefreshCw size={16} /> Actualizar Datos
        </button>
      </div>

      {/* Grid de Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto 40px auto' }}>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={24} color="var(--text-secondary)" />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total de Órdenes</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{total}</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--status-pending-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} color="var(--status-pending)" />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pendientes</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--status-pending)' }}>{pendientes}</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--status-assigned-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} color="var(--status-assigned)" />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>En Proceso</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--status-assigned)' }}>{enProceso}</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--status-finished-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={24} color="var(--status-finished)" />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Finalizados</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--status-finished)' }}>{finalizados}</h2>
          </div>
        </div>
      </div>

      {/* Tabla de Servicios */}
      <div className="glass-panel" style={{ maxWidth: '1200px', margin: '0 auto', overflowX: 'auto', padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px' }}>Órdenes de Trabajo</h3>
        {loading ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>Cargando información de PostgreSQL...</p>
        ) : tickets.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>No hay tickets registrados en la base de datos.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Cliente / Teléfono</th>
                <th style={{ padding: '12px' }}>Dirección</th>
                <th style={{ padding: '12px' }}>Detalles Requerimiento</th>
                <th style={{ padding: '12px' }}>Estado</th>
                <th style={{ padding: '12px' }}>Técnico Asignado</th>
                <th style={{ padding: '12px' }}>Evidencia</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id_servicio} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem' }}>
                  <td style={{ padding: '16px 12px', fontWeight: 600 }}>#{ticket.id_servicio}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ fontWeight: 500 }}>{ticket.cliente_nombre}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ticket.cliente_telefono}</div>
                  </td>
                  <td style={{ padding: '16px 12px', color: 'var(--text-secondary)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ticket.cliente_direccion}</td>
                  <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>{ticket.detalles_requerimiento}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <select
                      value={selectedEstados[ticket.id_servicio] || ''}
                      onChange={(e) => setSelectedEstados({ ...selectedEstados, [ticket.id_servicio]: e.target.value })}
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.85rem'
                      }}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Asignado">Asignado</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <select
                      value={selectedTecnicos[ticket.id_servicio] || ''}
                      onChange={(e) => setSelectedTecnicos({ ...selectedTecnicos, [ticket.id_servicio]: e.target.value })}
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.85rem'
                      }}
                    >
                      <option value="">Sin Asignar</option>
                      {tecnicos.map(tec => (
                        <option key={tec.id_tecnico} value={tec.id_tecnico}>{tec.nombre}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    {ticket.evidencia_url ? (
                      <a href={ticket.evidencia_url} target="_blank" rel="noopener noreferrer" style={{ color: '#00d2ff', textDecoration: 'none', fontWeight: 500 }}>
                        Ver Foto
                      </a>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Ninguna</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleUpdateTicket(ticket.id_servicio)}
                      disabled={updatingId === ticket.id_servicio}
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '4px' }}
                    >
                      {updatingId === ticket.id_servicio ? 'Guardando...' : 'Guardar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

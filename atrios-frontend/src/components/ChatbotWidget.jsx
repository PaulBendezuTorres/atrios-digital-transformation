import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Phone, Calendar, ArrowRight, ExternalLink, Shield, CheckCircle, Sparkles } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Datos del cliente para la conversación (Por defecto el número de Evolution API de Paul)
  const [clientPhone, setClientPhone] = useState(localStorage.getItem('atrios_client_phone') || '51946937294');
  
  // Formulario de Reserva Rápida
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingAddress, setBookingAddress] = useState('');
  const [bookingDetails, setBookingDetails] = useState('Instalación de cámaras de seguridad');
  
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mensajes de la conversación
  const [messages, setMessages] = useState([
    { text: '¡Hola! Bienvenido a Atrios Digital. 🛡️ Soy tu asesor inteligente de seguridad. ¿Te gustaría cotizar la instalación de cámaras, un cerco eléctrico o coordinar soporte técnico?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (userMsgText) => {
    const textToSend = userMsgText || input.trim();
    if (!textToSend && !userMsgText) return;

    if (!userMsgText) setInput('');
    setMessages(prev => [...prev, { text: textToSend, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          phone: clientPhone,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al conectar con la IA');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.output || data.response || 'Disculpa, no logré procesar tu solicitud.', sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: 'Hubo un error de conexión con el Agente de IA de Atrios. Por favor intenta de nuevo.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim() || !bookingAddress.trim()) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    setBookingLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_completo: bookingName,
          telefono: bookingPhone,
          direccion: bookingAddress,
          detalles: bookingDetails
        }),
      });

      if (response.ok) {
        setBookingSuccess(true);
        // Guardar teléfono para futuras consultas del chat
        setClientPhone(bookingPhone);
        localStorage.setItem('atrios_client_phone', bookingPhone);
        
        // Agregar mensaje automático en el chat
        setMessages(prev => [
          ...prev,
          { text: `¡Reserva de instalación realizada con éxito! 📅 Cliente: ${bookingName}, Dirección: ${bookingAddress}.`, sender: 'bot' }
        ]);

        setTimeout(() => {
          setShowBookingForm(false);
          setBookingSuccess(false);
          setBookingName('');
          setBookingPhone('');
          setBookingAddress('');
        }, 3000);
      } else {
        alert('Error al procesar la reserva.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red al reservar.');
    } finally {
      setBookingLoading(false);
    }
  };

  const quickPrompts = [
    { text: '🎥 Cotizar Cámaras de Seguridad', label: 'Cámaras' },
    { text: '⚡ Cotizar Cerco Eléctrico', label: 'Cercos' },
    { text: '🛠️ Soporte Técnico', label: 'Soporte' }
  ];

  return (
    <div className="chatbot-container" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      
      {/* 1. BOTÓN FLOTANTE VERDE DE WHATSAPP */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.58 1.973 14.107.95 11.49.95c-5.447 0-9.877 4.373-9.882 9.8a9.636 9.636 0 0 0 1.488 4.96l-.973 3.548 3.639-.945zm11.302-6.58c-.33-.163-1.94-.945-2.24-1.053-.3-.11-.518-.163-.735.163-.217.327-.843 1.053-1.033 1.27-.19.219-.38.243-.71.082-.33-.162-1.393-.507-2.655-1.622-.98-.864-1.64-1.93-1.832-2.257-.19-.327-.02-.504.145-.668.148-.148.33-.382.495-.572.163-.19.219-.327.328-.545.11-.218.054-.41-.028-.572-.08-.163-.735-1.745-1.006-2.4-.265-.638-.535-.55-.735-.56l-.63-.01c-.218 0-.573.08-.872.41-.3.327-1.144 1.109-1.144 2.7 0 1.59 1.173 3.125 1.334 3.34.163.218 2.304 3.47 5.578 4.856.778.33 1.386.527 1.86.677.783.246 1.497.21 2.062.127.629-.093 1.94-.783 2.213-1.54.272-.756.272-1.403.19-1.54-.082-.136-.3-.218-.63-.382z"/>
          </svg>
        </button>
      )}

      {/* 2. VENTANA DE CHAT INTEGRADO */}
      {isOpen && (
        <div
          className="glass-panel"
          style={{
            width: '380px',
            height: '540px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
            animation: 'fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          {/* CABECERA ESTILO WHATSAPP */}
          <div
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f5b700',
                  color: '#0b0f19',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                AD
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Atrios Asistente <Sparkles size={14} color="#f5b700" />
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#c2f9d8' }}>En línea • Asesor de IA</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowBookingForm(false);
              }}
              style={{ background: 'transparent', border: 'none', color: '#e2e8f0', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* CUERPO DEL CHAT / FORMULARIO DE RESERVA */}
          {showBookingForm ? (
            /* FORMULARIO DE RESERVA DESLIZABLE */
            <div
              style={{
                flex: 1,
                padding: '20px',
                background: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <h4 style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={18} color="#f5b700" /> Reservar Visita Técnica
                </h4>
                <button 
                  onClick={() => setShowBookingForm(false)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Volver al Chat
                </button>
              </div>

              {bookingSuccess ? (
                <div 
                  style={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px',
                    textAlign: 'center',
                    color: '#10b981'
                  }}
                >
                  <CheckCircle size={48} />
                  <h3 style={{ fontWeight: 700 }}>¡Reserva Exitosa!</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tu orden ha sido registrada correctamente en el sistema de Atrios.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Nombre Completo *</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Carlos Pérez"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Teléfono Celular *</label>
                    <input 
                      type="tel" 
                      placeholder="Ej: 987654321"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Dirección de Instalación *</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Calle Los Sauces 456, Surco"
                      required
                      value={bookingAddress}
                      onChange={(e) => setBookingAddress(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Detalles del Requerimiento</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Instalación de 4 cámaras o cerco"
                      value={bookingDetails}
                      onChange={(e) => setBookingDetails(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={bookingLoading}
                    className="btn-primary" 
                    style={{ width: '100%', padding: '12px', justifyContent: 'center', background: '#f5b700', color: '#0b0f19', fontWeight: 700 }}
                  >
                    {bookingLoading ? 'Registrando...' : 'Confirmar Reserva'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* BANDEJA DE MENSAJES DEL CHAT DIRECTO */
            <>
              {/* Sugerencias Rápidas en la Cabecera */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  padding: '10px 16px', 
                  background: 'var(--bg-secondary)', 
                  borderBottom: '1px solid var(--border-color)',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  scrollbarWidth: 'none'
                }}
              >
                {quickPrompts.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q.text)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f5b700'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              <div
                style={{
                  flex: 1,
                  padding: '16px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  background: 'rgba(11, 15, 25, 0.4)'
                }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      animation: 'fadeIn 0.2s ease-in'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        padding: '10px 14px',
                        borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                        background: msg.sender === 'user' ? 'linear-gradient(135deg, #f5b700 0%, #d99e00 100%)' : 'var(--bg-secondary)',
                        color: msg.sender === 'user' ? '#0b0f19' : 'var(--text-primary)',
                        fontSize: '0.9rem',
                        lineHeight: '1.4',
                        border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                        boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(245, 183, 0, 0.2)' : 'none'
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '12px 12px 12px 0',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <span>Analizando requerimiento...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* BARRA DE ACCIÓN INFERIOR - RESERVA INSTALACIÓN */}
              <div 
                style={{ 
                  padding: '10px 16px', 
                  background: 'rgba(245, 183, 0, 0.05)', 
                  borderTop: '1px solid rgba(245, 183, 0, 0.15)', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center'
                }}
              >
                <button
                  onClick={() => setShowBookingForm(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#f5b700',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Calendar size={16} /> 📅 Reservar Visita Técnica
                </button>
                <a
                  href={`https://wa.me/51946937294?text=Hola%20Atrios%20Digital.%20Deseo%20cotizar%20camaras%20de%20seguridad.%20Mi%20telefono%20es%20${clientPhone}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#25D366', 
                    textDecoration: 'none', 
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  WhatsApp <ExternalLink size={12} />
                </a>
              </div>

              {/* CAJA DE ENVIAR MENSAJE */}
              <div
                style={{
                  padding: '12px',
                  borderTop: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }} 
                  style={{ display: 'flex', gap: '8px' }}
                >
                  <input
                    type="text"
                    placeholder="Pregúntame algo sobre las cámaras o servicios..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="btn-primary"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      padding: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

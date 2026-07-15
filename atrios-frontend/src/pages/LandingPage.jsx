import React, { useState, useEffect } from 'react';
import { Shield, Eye, Cpu, Bell, ExternalLink, ArrowRight, Sun, Moon, Check, Phone, Mail, Clock } from 'lucide-react';
import ChatbotWidget from '../components/ChatbotWidget';

export default function LandingPage() {
  const [theme, setTheme] = useState(localStorage.getItem('atrios_theme') || 'dark');

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

  const catalog = [
    { 
      name: 'Cámara Turret Hikvision 5MP 3K', 
      type: 'Smart Hybrid Light / Audio Integrado', 
      desc: 'Cámara domo de alta resolución con luz híbrida inteligente, visión nocturna a color y micrófono incorporado para grabación de audio.', 
      price: 'S/. 111.80',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Cámara Tubo Hikvision 2MP', 
      type: 'Smart Hybrid Light 25m', 
      desc: 'Cámara bala impermeable IP67 de alta resistencia para exteriores, visión híbrida inteligente por infrarrojos y micrófono integrado.', 
      price: 'S/. 90.80',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Cámara Tubo ColorVu Hikvision 2MP', 
      type: 'Visión Nocturna a Color 40m', 
      desc: 'Cámara de seguridad exterior ColorVu de alta gama, que permite visualización en color las 24 horas del día bajo oscuridad absoluta.', 
      price: 'S/. 142.60',
      image: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=500&q=80'
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Top Bar - Envíos Nacionales */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #00d2ff 0%, #0099ff 100%)', 
          color: '#0b0f19', 
          padding: '8px 40px', 
          fontSize: '0.85rem', 
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>Realizamos envíos e instalaciones a nivel nacional 🇵🇪</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> 960 310 542</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> ventas@atrios.pe</span>
        </div>
      </div>

      {/* Barra de Navegación Principal */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={32} color="#00d2ff" />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>
            ATRIOS <span style={{ color: '#00d2ff' }}>DIGITAL</span>
          </span>
        </div>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#inicio" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Inicio</a>
          <a href="#nosotros" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Nosotros</a>
          <a href="#servicios" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Servicios</a>
          <a href="#catalogo" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Catálogo</a>
          <a href="#contacto" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Contacto</a>
          
          {/* Botón de cambio de tema */}
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
            {theme === 'dark' ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} />}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        style={{
          padding: '100px 40px',
          textAlign: 'center',
          background: 'radial-gradient(circle at 50% 30%, rgba(0, 210, 255, 0.08) 0%, transparent 70%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <div
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(0, 210, 255, 0.1)',
            border: '1px solid rgba(0, 210, 255, 0.2)',
            color: '#00d2ff',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <span>Instalación profesional y asesoría especializada</span>
        </div>
        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            lineHeight: '1.2',
            maxWidth: '900px',
            margin: '0 auto',
            color: 'var(--text-primary)'
          }}
        >
          Protegemos lo que más importa con Tecnología de Vanguardia
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Equipos homologados de las mejores marcas del mercado (Hikvision, Dahua) con soporte técnico garantizado para tu tranquilidad.
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <button
            onClick={() => {
              const widgetBtn = document.querySelector('.chatbot-container button');
              if (widgetBtn) widgetBtn.click();
            }}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            Cotizar por Chatbot <ArrowRight size={20} />
          </button>
          <a
            href="https://wa.me/51960310542?text=Hola%20Atrios%20Digital.%20Deseo%20cotizar%20camaras%20de%20seguridad."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '14px 28px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            WhatsApp Directo <ExternalLink size={18} />
          </a>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" style={{ padding: '80px 40px', background: 'var(--bg-tertiary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#00d2ff', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Sobre Nosotros</span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '10px', marginBottom: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Más de 10 años protegiendo lo que amas
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
              En Atrios Digital nos dedicamos al diseño, venta e instalación de sistemas avanzados de seguridad electrónica, CCTV, alarmas inteligentes y cercos disuasivos a nivel nacional. Nuestra prioridad es brindar tranquilidad con asesoría a medida y equipos certificados.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <Check size={18} color="#10b981" /> <span>Equipos de las mejores marcas con garantía extendida.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <Check size={18} color="#10b981" /> <span>Técnicos certificados y homologados en CCTV.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <Check size={18} color="#10b981" /> <span>Soporte técnico y mantenimiento permanente 24/7.</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" 
              alt="Instalación de cámaras" 
              style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
            />
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" style={{ padding: '80px 40px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.25rem', marginBottom: '48px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Soluciones de Seguridad Integral
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '30px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <Eye size={40} color="#00d2ff" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Cámaras de Seguridad y CCTV</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Monitoreo permanente en tiempo real con grabación inteligente local y en la nube. Acceso remoto total desde tu smartphone.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '30px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <Cpu size={40} color="#00d2ff" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Cercos Eléctricos</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Protección de perímetros disuasiva y de alto impacto no letal. Energizadores homologados con alerta de intrusión y corte de línea.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '30px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <Bell size={40} color="#00d2ff" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Alarmas Monitoreadas</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Sistemas de intrusión avanzados con sensores de movimiento y magnéticos inalámbricos para puertas y ventanas.
            </p>
          </div>
        </div>
      </section>

      {/* Catálogo Section */}
      <section id="catalogo" style={{ padding: '80px 40px', background: 'var(--bg-tertiary)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.25rem', marginBottom: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Ofertas en Seguridad Electrónica
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '48px' }}>
          Visualiza nuestros productos certificados y realiza tu cotización o agenda tu instalación con nuestro asistente.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {catalog.map((cam, i) => (
            <div 
              key={i} 
              className="glass-card" 
              style={{ 
                padding: '0', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <img 
                src={cam.image} 
                alt={cam.name} 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.8rem', color: '#00d2ff', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{cam.type}</span>
                <h3 style={{ fontSize: '1.3rem', marginTop: '8px', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{cam.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>{cam.desc}</p>
              </div>
              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 700, color: '#10b981' }}>{cam.price}</span>
                <button
                  onClick={() => {
                    const widgetBtn = document.querySelector('.chatbot-container button');
                    if (widgetBtn) widgetBtn.click();
                  }}
                  className="btn-primary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                >
                  Cotizar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>¿Listo para proteger tu hogar o negocio?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Contáctanos ahora para recibir una asesoría gratuita e integral y una cotización sin compromisos de instalación.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone color="#00d2ff" /> <span>+51 960 310 542</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail color="#00d2ff" /> <span>ventas@atrios.pe</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock color="#00d2ff" /> <span>Lun-Sáb: 8:00 - 19:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          padding: '40px',
          textAlign: 'center',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem'
        }}
      >
        <p>© 2026 Atrios Digital. Todos los derechos reservados.</p>
        <p style={{ marginTop: '8px', fontSize: '0.8rem', color: '#64748b' }}>Lima, Ica, Perú.</p>
      </footer>

      {/* Widget Chatbot Flotante / WhatsApp */}
      <ChatbotWidget />
    </div>
  );
}

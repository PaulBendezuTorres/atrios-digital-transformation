import React from 'react';
import { Shield, Eye, Cpu, Bell, ExternalLink, ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          padding: '100px 40px',
          textAlign: 'center',
          background: 'radial-gradient(circle at 50% 30%, rgba(245, 183, 0, 0.05) 0%, transparent 70%)',
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
            background: 'rgba(245, 183, 0, 0.1)',
            border: '1px solid rgba(245, 183, 0, 0.2)',
            color: '#f5b700',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <span>Comprometidos por tu satisfacción e ingeniería de confianza</span>
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
          Soluciones de Ingeniería, Infraestructura y Seguridad
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
          Especialistas en cableado estructurado, centros de datos, aire acondicionado e instalación de cámaras de seguridad con soporte técnico certificado.
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <a
            href="/contacto"
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Solicitar Cotización <ArrowRight size={20} />
          </a>
          <a
            href="https://wa.me/51960310542?text=Hola%20Atrios%20Digital.%20Deseo%20cotizar%20servicios%20de%20ingenieria."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '14px 28px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            WhatsApp Ventas <ExternalLink size={18} />
          </a>
        </div>
      </section>

      {/* Marcas Aliadas */}
      <section style={{ padding: '40px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', gap: '30px', opacity: 0.6 }}>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Marcas líderes:</strong>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>HIKVISION</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>DAHUA</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>FURUKAWA</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>DSC ALARMS</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>INTEL</span>
        </div>
      </section>

      {/* Servicios Principales Destacados */}
      <section style={{ padding: '80px 40px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.25rem', marginBottom: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Nuestras Áreas de Experiencia
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
          Brindamos servicios de alta ingeniería para oficinas comerciales, industrias y residencias en Lima y a nivel nacional.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '30px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <Cpu size={40} color="#f5b700" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Cableado Estructurado</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Diseño e instalación de redes de datos Cat6, Cat6A y fibra óptica. Certificación de puntos de red para un rendimiento óptimo de tu empresa.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '30px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <Eye size={40} color="#f5b700" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Seguridad Electrónica y CCTV</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Instalación de cámaras IP Hikvision/Dahua con analíticas inteligentes de intrusión y visualización móvil en tiempo real.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '30px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <Bell size={40} color="#f5b700" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Sistemas Eléctricos y UPS</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Diseño de tableros eléctricos, pozos a tierra, suministro de sistemas de energía ininterrumpida UPS y grupos electrógenos.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonios o Proyectos */}
      <section style={{ padding: '80px 40px', background: 'var(--bg-tertiary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.25rem', marginBottom: '40px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Proyectos Exitosos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: '#f5b700', fontWeight: 600 }}>OFICINAS CORPORATIVAS - SAN ISIDRO</span>
              <p style={{ marginTop: '10px', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                "Implementación completa de 120 puntos de red Cat6, data center modular y sistema de aire acondicionado VRF. Entrega a tiempo y con certificación Fluke."
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: '#f5b700', fontWeight: 600 }}>ALMACENES Y LOGÍSTICA - CALLAO</span>
              <p style={{ marginTop: '10px', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                "Instalación perimetral de 24 cámaras IP de largo alcance con domos PTZ y cerco eléctrico homologado de 500 metros. Seguridad total garantizada."
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChatbotWidget />
      <Footer />
    </div>
  );
}

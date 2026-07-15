import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}
    >
      <div 
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '60px 40px 40px 40px',
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '40px' 
        }}
      >
        {/* Info Corporativa */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
            <Shield size={28} color="#f5b700" />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.5px' }}>
              ATRIOS <span style={{ color: '#f5b700' }}>DIGITAL</span>
            </span>
          </div>
          <p style={{ lineHeight: '1.6' }}>
            Empresa líder en ingeniería, infraestructura y seguridad electrónica en el Perú. +10 años de experiencia implementando soluciones tecnológicas de alta calidad.
          </p>
        </div>

        {/* Enlaces Rápidos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '4px' }}>Enlaces</h4>
          <NavLink to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Inicio</NavLink>
          <NavLink to="/nosotros" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Nosotros</NavLink>
          <NavLink to="/servicios" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Servicios</NavLink>
          <NavLink to="/productos" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Catálogo</NavLink>
          <NavLink to="/contacto" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contacto</NavLink>
        </div>

        {/* Contacto Arcring/Atrios */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '4px' }}>Contacto</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} color="#f5b700" /> <span>+51 960 310 542</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={16} color="#f5b700" /> <span>ventas@atrios.pe</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} color="#f5b700" /> <span>Jr. Bodegones 337, Santiago de Surco, Lima</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="#f5b700" /> <span>Lun-Vie: 8:00 - 18:00 | Sáb: 9:00 - 13:00</span>
          </div>
        </div>
      </div>

      <div 
        style={{ 
          textAlign: 'center', 
          padding: '24px 40px', 
          borderTop: '1px solid var(--border-color)', 
          fontSize: '0.8rem', 
          color: '#64748b' 
        }}
      >
        <p>ATRIOS DIGITAL © 2026 • RUC 20546985123 • Todos los derechos reservados. Lima, Perú.</p>
      </div>
    </footer>
  );
}

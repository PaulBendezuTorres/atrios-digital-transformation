import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

export default function Products() {
  const [search, setSearch] = useState('');

  const catalog = [
    { 
      name: 'Cámara Turret Hikvision 5MP 3K', 
      type: 'Smart Hybrid Light / Audio', 
      desc: 'Cámara domo con luz híbrida inteligente, visión nocturna a color de 20 metros y micrófono de alta fidelidad incorporado.', 
      price: 'S/. 111.80',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Cámara Tubo Hikvision 2MP', 
      type: 'Smart Hybrid Light 25m', 
      desc: 'Cámara bala impermeable IP67 de alta resistencia para exteriores, visión híbrida inteligente por infrarrojos.', 
      price: 'S/. 90.80',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Cámara Turret Hikvision 2MP', 
      type: 'Smart Hybrid Light 20m', 
      desc: 'Cámara domo de seguridad interior de 2MP con audio integrado por cable coaxial, lente gran angular de 2.8mm.', 
      price: 'S/. 90.80',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Cámara Tubo ColorVu Hikvision 2MP', 
      type: 'Visión Nocturna Color 40m', 
      desc: 'Cámara exterior ColorVu de alta gama para capturar imágenes a color de alta definición incluso bajo total oscuridad.', 
      price: 'S/. 142.60',
      image: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Cámara Tubo Hikvision 5MP Exterior', 
      type: 'Con Audio / Metalica IP67', 
      desc: 'Cámara bala metálica de 5MP, lente fijo de 2.8mm y micrófono incorporado para vigilancia de exteriores amplios.', 
      price: 'S/. 113.40',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Cámara Turret Hikvision 5MP', 
      type: 'Visión Nocturna Infrarroja 20m', 
      desc: 'Cámara domo fija de 5MP para techos interiores con audio sobre coaxial y carcasa de policarbonato reforzado.', 
      price: 'S/. 100.90',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Cámara Tubo Hikvision 1080P', 
      type: 'Exterior con IR 40m', 
      desc: 'Cámara tubo disuasiva de alta resistencia y alcance, ideal para pasajes, cocheras o perímetros abiertos.', 
      price: 'S/. 113.58',
      image: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Disco Duro SkyHawk Seagate 2TB', 
      type: 'Almacenamiento CCTV', 
      desc: 'Disco duro especial para videovigilancia de alta capacidad, optimizado para operaciones continuas 24/7 sin fallos.', 
      price: 'S/. 299.00',
      image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Grabador NVR Hikvision de 8 Canales', 
      type: 'DVR / NVR Sistemas', 
      desc: 'NVR de última generación para cámaras de red IP de hasta 8MP, salida HDMI 4K y capacidad para disco duro SATA.', 
      price: 'S/. 480.00',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const filtered = catalog.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar />

      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: '#f5b700', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Catálogo Técnico</span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginTop: '10px', marginBottom: '16px' }}>Equipos y Productos Certificados</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Consulta precios de importación en soles y cotiza la instalación inmediata con nuestro chatbot.</p>
          </div>

          {/* Buscador */}
          <div style={{ maxWidth: '600px', margin: '0 auto 48px auto' }}>
            <input 
              type="text" 
              placeholder="Buscar productos (Ej: Hikvision, ColorVu, Disco, 5MP)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Grid de Catálogo */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {filtered.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>No se encontraron productos coincidentes.</p>
            ) : (
              filtered.map((item, i) => (
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
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '24px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#f5b700', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.type}</span>
                    <h3 style={{ fontSize: '1.3rem', marginTop: '8px', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>{item.desc}</p>
                  </div>
                  <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
                    <span style={{ fontSize: '1.45rem', fontWeight: 700, color: '#10b981' }}>{item.price}</span>
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
              ))
            )}
          </div>

        </div>
      </section>

      <ChatbotWidget />
      <Footer />
    </div>
  );
}

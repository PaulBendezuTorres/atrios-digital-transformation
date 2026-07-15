import React from 'react';
import { Eye, Cpu, Bell, Shield, CheckCircle, Hammer, Wind, Bolt } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

export default function Services() {
  const serviceList = [
    {
      title: 'Cableado Estructurado y Redes',
      icon: <Cpu size={36} color="#f5b700" />,
      desc: 'Instalación de gabinetes rack, cableado estructurado Cat6 / Cat6A, conectividad en fibra óptica e implementación de data centers modulares.',
      points: ['Certificación Fluke Networks', 'Peinado y ordenamiento de gabinetes', 'Enlaces aéreos y subterráneos']
    },
    {
      title: 'Seguridad Electrónica y CCTV',
      icon: <Eye size={36} color="#f5b700" />,
      desc: 'Diseño e instalación de sistemas de videovigilancia avanzados de marcas como Hikvision y Dahua, con grabación local e integración remota a móviles.',
      points: ['Cámaras IP con detección inteligente', 'Configuración de NVR y visualización móvil', 'Cámaras térmicas y de largo alcance']
    },
    {
      title: 'Aire Acondicionado Comercial',
      icon: <Wind size={36} color="#f5b700" />,
      desc: 'Instalación y mantenimiento preventivo/correctivo de sistemas de aire acondicionado tipo Split decorativo, ducto, fancoil y sistemas de flujo variable VRF.',
      points: ['Cálculo de carga térmica', 'Protocolos de operatividad', 'Mantenimientos preventivos programados']
    },
    {
      title: 'Sistemas Eléctricos y Pozos a Tierra',
      icon: <Bolt size={36} color="#f5b700" />,
      desc: 'Implementación de redes eléctricas estabilizadas, tableros de transferencia, UPS de respaldo, grupos electrógenos y construcción de pozos a tierra con certificado firmado.',
      points: ['Medición de resistencia y protocolo firmado', 'Tableros de distribución eléctrica', 'Líneas a tierra exclusivas para servidores']
    },
    {
      title: 'Remodelación de Oficinas y Drywall',
      icon: <Hammer size={36} color="#f5b700" />,
      desc: 'Implementación llave en mano de oficinas comerciales, divisiones en drywall acústico, cielos rasos, pintura profesional e iluminación LED inteligente.',
      points: ['Paredes de drywall acústicas', 'Iluminación LED de alta eficiencia', 'Acabados arquitectónicos y comerciales']
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar />

      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#f5b700', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Nuestras Especialidades</span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginTop: '10px' }}>Servicios de Ingeniería Especializados</h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {serviceList.map((service, index) => (
              <div 
                key={index} 
                className="glass-panel" 
                style={{ 
                  padding: '40px', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '30px', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    {service.icon}
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{service.title}</h2>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                    {service.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '2px solid var(--border-color)', paddingLeft: '24px' }}>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', color: '#f5b700' }}>Alcance Técnico:</h4>
                  {service.points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <CheckCircle size={16} color="#10b981" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <ChatbotWidget />
      <Footer />
    </div>
  );
}

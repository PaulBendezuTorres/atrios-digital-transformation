import React from 'react';
import { Eye, Cpu, Bell, Shield, CheckCircle, Hammer, Wind, Bolt } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

// Importación de fotos de instalaciones reales para cada servicio
import imgCCTV from '../assets/480412017_122141890244447275_2364830553535877095_n.jpg';
import imgCerco from '../assets/480471935_122141888462447275_1015044705860419876_n.jpg';
import imgRedes from '../assets/480538252_122141890634447275_615097102769920800_n.jpg';
import imgInfra from '../assets/480581360_122141892392447275_1904833011360058591_n.jpg';
import imgEléctrico from '../assets/480609587_122141893706447275_1919165925348187743_n.jpg';

export default function Services() {
  const serviceList = [
    {
      title: 'Seguridad Electrónica y CCTV',
      icon: <Eye size={30} color="#f5b700" />,
      desc: 'Diseño e instalación de sistemas de videovigilancia avanzados. Cámaras IP Hikvision y Dahua con analíticas de intrusión, cruce de línea y visualización centralizada móvil.',
      points: ['Cámaras IP 2K y 4K con visión nocturna a color', 'Configuración de NVR, switches PoE y discos purpúra', 'Integración y enrutamiento remoto de imágenes'],
      image: imgCCTV
    },
    {
      title: 'Cercos Eléctricos Perimetrales',
      icon: <Shield size={30} color="#f5b700" />,
      desc: 'Sistemas de seguridad perimetral de alta tensión disuasiva y de protección física. Instalación homologada según normativas vigentes y calibración de paneles de alarma.',
      points: ['Tendido de cables de acero y postes templadores', 'Electrificadores inteligentes de alto impacto no letal', 'Sensores de flexión y alarmas acústicas'],
      image: imgCerco
    },
    {
      title: 'Cableado Estructurado y Redes',
      icon: <Cpu size={30} color="#f5b700" />,
      desc: 'Infraestructura física de datos para oficinas y almacenes. Peinado sistemático de racks de comunicaciones, rotulado de puntos y certificación Fluke Networks.',
      points: ['Puntos de red en Cat6 y Cat6A Furukawa/Leviton', 'Montaje y organización de gabinetes y racks', 'Certificación Fluke con reporte de atenuación y ruido'],
      image: imgRedes
    },
    {
      title: 'Enlaces de Radio y Telecomunicaciones',
      icon: <Wind size={30} color="#f5b700" />,
      desc: 'Instalación de radioenlaces y antenas punto a punto o punto multipunto para intercomunicar cámaras de vigilancia de forma inalámbrica en grandes distancias.',
      points: ['Alineación de antenas de alta ganancia Ubiquiti/Mikrotik', 'Enlaces de seguridad inalámbricos perimetrales', 'Soporte y reubicación de postes e infraestructura metálica'],
      image: imgInfra
    },
    {
      title: 'Sistemas Eléctricos y Tableros',
      icon: <Bolt size={30} color="#f5b700" />,
      desc: 'Diseño y montaje de tableros eléctricos de distribución, sistemas de puesta a tierra y suministro de energía ininterrumpida UPS para servidores.',
      points: ['Construcción y medición de pozos a tierra', 'Tableros eléctricos y llaves termomagnéticas Schneider/ABB', 'Sistemas de alimentación ininterrumpida UPS de respaldo'],
      image: imgEléctrico
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#090d16', color: '#f3f4f6', fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />

      <section style={{ padding: '100px 24px 80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ color: '#f5b700', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Nuestras Especialidades de Ingeniería</span>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '12px', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff 60%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Servicios de Ingeniería Especializados
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '16px auto 0 auto' }}>
              Soluciones integrales de seguridad electrónica e infraestructura de telecomunicaciones con garantía real y soporte técnico especializado.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {serviceList.map((service, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '40px', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                  gap: '40px', 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  alignItems: 'center',
                  transition: 'border-color 0.3s, transform 0.3s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(245, 183, 0, 0.25)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                {/* Texto descriptivo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'rgba(245, 183, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {service.icon}
                    </div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>{service.title}</h2>
                  </div>
                  <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1rem', margin: 0 }}>
                    {service.desc}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f5b700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Alcance del Servicio:</h4>
                    {service.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
                        <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: '#cbd5e1' }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imagen real */}
                <div style={{ overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
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

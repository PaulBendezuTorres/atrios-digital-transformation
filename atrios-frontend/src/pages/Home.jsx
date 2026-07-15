import React from 'react';
import { Shield, Eye, Cpu, Bell, ExternalLink, ArrowRight, Check, Award, Users, HardDrive } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

// Importación de assets reales de instalaciones de Atrios
import imgInstalacion1 from '../assets/480412017_122141890244447275_2364830553535877095_n.jpg';
import imgInstalacion2 from '../assets/480471935_122141888462447275_1015044705860419876_n.jpg';
import imgInstalacion3 from '../assets/480538252_122141890634447275_615097102769920800_n.jpg';
import imgInstalacion4 from '../assets/480581360_122141892392447275_1904833011360058591_n.jpg';
import imgInstalacion5 from '../assets/480609587_122141893706447275_1919165925348187743_n.jpg';
import imgInstalacion6 from '../assets/480621172_122141889356447275_454075466222127676_n.jpg';

export default function Home() {
  const proyectos = [
    {
      id: 1,
      titulo: 'Monitoreo CCTV Corporativo',
      ubicacion: 'San Isidro, Lima',
      descripcion: 'Implementación perimetral e interna de cámaras de ultra alta definición 4K con analíticas de cruce de línea.',
      imagen: imgInstalacion1
    },
    {
      id: 2,
      titulo: 'Cercos Eléctricos Homologados',
      ubicacion: 'Surco, Lima',
      descripcion: 'Seguridad perimetral con alta tensión controlada para protección y disuasión perimetral total.',
      imagen: imgInstalacion2
    },
    {
      id: 3,
      titulo: 'Cableado y Data Centers',
      ubicacion: 'Lince, Lima',
      descripcion: 'Organización de racks y gabinetes tecnológicos con cableado estructurado categoría 6A Furukawa.',
      imagen: imgInstalacion3
    },
    {
      id: 4,
      titulo: 'Soporte de Enlaces Inalámbricos',
      ubicacion: 'Callao, Lima',
      descripcion: 'Instalación de antenas de largo alcance para conectividad de cámaras de seguridad remotas.',
      imagen: imgInstalacion4
    },
    {
      id: 5,
      titulo: 'Centrales de Alarmas y Control',
      ubicacion: 'Miraflores, Lima',
      descripcion: 'Sistemas inteligentes anti-intrusión conectados a paneles centrales con alertas a dispositivos móviles.',
      imagen: imgInstalacion5
    },
    {
      id: 6,
      titulo: 'Mantenimiento de Cercos y Sensores',
      ubicacion: 'Chorrillos, Lima',
      descripcion: 'Ajuste, tensado de líneas de acero y calibración de sensores de vibración perimetrales.',
      imagen: imgInstalacion6
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#090d16', color: '#f3f4f6', fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '120px 24px 100px 24px',
          background: 'radial-gradient(circle at 80% 20%, rgba(245, 183, 0, 0.08) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '48px', alignItems: 'center' }}>
          
          {/* Texto Hero */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                alignSelf: 'flex-start',
                padding: '6px 16px',
                borderRadius: '20px',
                background: 'rgba(245, 183, 0, 0.08)',
                border: '1px solid rgba(245, 183, 0, 0.25)',
                color: '#f5b700',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              🚀 Ingeniería de Seguridad de Confianza
            </div>
            
            <h1
              style={{
                fontSize: '3.8rem',
                fontWeight: 800,
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to right, #ffffff 60%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}
            >
              Tecnología de Seguridad para proteger lo que más valoras
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
              Diseño, cotización e instalación profesional de sistemas de videovigilancia CCTV en alta definición, cercos eléctricos disuasivos y soporte tecnológico premium a medida.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px' }}>
              <a
                href="/contacto"
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f5b700',
                  color: '#090d16',
                  fontWeight: 700,
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(245, 183, 0, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(245, 183, 0, 0.4)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 183, 0, 0.3)'; }}
              >
                Solicitar Visita Técnica <ArrowRight size={20} />
              </a>
              <a
                href="https://wa.me/51946937294?text=Hola%20Atrios%20Digital.%20Deseo%20cotizar%20servicios%20de%20instalacion%20de%20camaras."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '14px 28px',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  color: '#f3f4f6',
                  border: '1px solid rgba(245, 183, 0, 0.3)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  fontWeight: 600,
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 183, 0, 0.08)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
              >
                WhatsApp Ventas <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Collage Premium con Foto Real */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '100%',
                height: '100%',
                border: '2px solid rgba(245, 183, 0, 0.3)',
                borderRadius: '16px',
                zIndex: 0
              }}
            ></div>
            <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img
                src={imgInstalacion1}
                alt="Instalación de cámaras de seguridad Atrios"
                style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1)', transition: 'transform 0.5s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  background: 'linear-gradient(to top, rgba(9, 13, 22, 0.95), transparent)',
                  padding: '24px',
                  color: '#ffffff'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f5b700' }}>CCTV San Isidro</div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px' }}>Instalación completada y activa de cámaras de alta gama.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Marcas Aliadas */}
      <section style={{ padding: '30px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0b1220' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '30px' }}>
          <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Marcas líderes de ingeniería:</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', opacity: 0.7, color: '#94a3b8' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>HIKVISION</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>DAHUA</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>FURUKAWA</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>DSC ALARMS</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>INTEL</span>
          </div>
        </div>
      </section>

      {/* Nuestras Áreas de Ingeniería */}
      <section style={{ padding: '100px 24px', background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 70%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>Nuestros Servicios Especializados</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Brindamos servicios integrales de ingeniería perimetral y de red para garantizar la máxima seguridad y conectividad de tu empresa u hogar.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
            
            {/* Tarjeta 1 */}
            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '32px',
                transition: 'border-color 0.25s, transform 0.25s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(245, 183, 0, 0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(245, 183, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Eye size={24} color="#f5b700" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Sistemas de Videovigilancia (CCTV)</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                Cámaras de seguridad IP con visión nocturna a color 24/7, almacenamiento local/nube y analíticas inteligentes para detección perimetral inmediata.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '32px',
                transition: 'border-color 0.25s, transform 0.25s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(245, 183, 0, 0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(245, 183, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Shield size={24} color="#f5b700" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Cercos Eléctricos Perimetrales</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                Diseño, tendido de líneas y mantenimiento preventivo/correctivo de cercos eléctricos energizados homologados con sensores de flexión de cables.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '32px',
                transition: 'border-color 0.25s, transform 0.25s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(245, 183, 0, 0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(245, 183, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Cpu size={24} color="#f5b700" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Cableado de Red y Racks</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                Infraestructura física de comunicaciones en oficinas y almacenes. Peinado de racks, rotulado sistemático y certificación con equipos Fluke.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Galería de Proyectos Reales de Atrios */}
      <section style={{ padding: '100px 24px', backgroundColor: '#0b1220' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>Galería de Proyectos Reales</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Evidencia visual de nuestras instalaciones corporativas y residenciales ejecutadas en campo por el equipo técnico especializado de Atrios.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' }}>
            
            {proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                style={{
                  background: '#090d16',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'transform 0.3s, border-color 0.3s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(245, 183, 0, 0.3)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(9, 13, 22, 0.85)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, color: '#f5b700', border: '1px solid rgba(245, 183, 0, 0.3)' }}>
                    {proyecto.ubicacion}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#f3f4f6' }}>{proyecto.titulo}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{proyecto.descripcion}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Estadísticas */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(to bottom, #090d16, #0b1220)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#f5b700', marginBottom: '8px' }}>+500</div>
            <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cámaras Instaladas</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#f5b700', marginBottom: '8px' }}>+200</div>
            <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clientes Satisfechos</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#f5b700', marginBottom: '8px' }}>100%</div>
            <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Garantía y Soporte</div>
          </div>
        </div>
      </section>

      <ChatbotWidget />
      <Footer />
    </div>
  );
}

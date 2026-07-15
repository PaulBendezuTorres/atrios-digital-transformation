import React from 'react';
import { CheckCircle, Shield, Users, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar />

      <section style={{ padding: '80px 40px', background: 'radial-gradient(circle at 50% 30%, rgba(245, 183, 0, 0.03) 0%, transparent 70%)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#f5b700', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>¿Quiénes Somos?</span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginTop: '10px' }}>Trayectoria y Compromiso en Ingeniería</h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center', marginBottom: '60px' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px' }}>Más de 10 años en el mercado peruano</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '16px' }}>
                Atrios Digital nació con el propósito de proveer soluciones de alto valor en infraestructura de TI y seguridad electrónica en Lima, Perú. A lo largo de esta década, nos hemos consolidado como socios tecnológicos de empresas corporativas y comerciales.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Cumplimos de forma estricta con los estándares técnicos peruanos e internacionales de cableado estructurado (ANSI/TIA), seguridad perimetral y normativas de INDECI, asegurando la máxima fiabilidad en cada proyecto.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=600&q=80" 
                alt="Ingenieros trabajando" 
                style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          {/* Pilares */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', marginTop: '40px' }}>
            <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <Shield size={32} color="#f5b700" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Garantía Total</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Todos nuestros trabajos cuentan con garantía de instalación y soporte post-venta permanente.</p>
            </div>
            <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <Users size={32} color="#f5b700" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Personal Propio</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Técnicos calificados contratados de forma directa bajo estrictas pólizas de seguro SCTR.</p>
            </div>
            <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <Award size={32} color="#f5b700" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Certificaciones</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Certificamos puntos de red con equipos de última generación Fluke Networks.</p>
            </div>
          </div>

        </div>
      </section>

      <ChatbotWidget />
      <Footer />
    </div>
  );
}

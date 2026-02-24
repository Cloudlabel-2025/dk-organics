"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CareerPage = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await fetch("/api/career");
      const data = await res.json();
      if (data.success) {
        setCareers(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch careers:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="position-relative py-5 d-flex align-items-center border-bottom" style={{ minHeight: '40vh' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
          <Image src="/1.jpg" alt="Farm" fill priority style={{ objectFit: 'cover' }} className="opacity-25" />
        </div>
        <div className="container position-relative py-5 text-center" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold text-dark">Join Our Team</h1>
          <p className="lead">Build your career with DK Organics</p>
        </div>
      </section>

      {/* Careers Grid */}
      <div style={{ backgroundColor: '#F2F7F0', minHeight: '100vh', padding: isMobile ? '40px 20px' : '60px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
            <h2 style={{ 
              fontSize: isMobile ? '2rem' : '2.8rem', 
              fontWeight: 'bold', 
              color: '#2F5233', 
              marginBottom: '15px' 
            }}>Open Positions</h2>
            <p style={{ 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              color: '#666', 
              maxWidth: '600px', 
              margin: '0 auto'
            }}>
              Explore exciting opportunities to grow with us
            </p>
          </div>

          {/* Jobs Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
            gap: isMobile ? '25px' : '40px'
          }}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading positions...</p>
              </div>
            ) : careers.length > 0 ? (
              careers.map((career) => (
                <div key={career._id} style={{
                  backgroundColor: 'white',
                  borderRadius: '30px',
                  padding: isMobile ? '25px' : '35px',
                  boxShadow: '0 10px 30px rgba(138, 180, 64, 0.1)',
                  border: '2px solid #8AB440',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(138, 180, 64, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(138, 180, 64, 0.1)';
                }}>
                  
                  {/* Job Title */}
                  <h3 style={{ 
                    fontSize: isMobile ? '1.3rem' : '1.6rem', 
                    fontWeight: 'bold', 
                    color: '#2F5233', 
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {career.title}
                  </h3>

                  {/* Job Meta */}
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span style={{
                      backgroundColor: '#8AB440',
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {career.type}
                    </span>
                    <span style={{
                      backgroundColor: '#E8F5E8',
                      color: '#2F5233',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      📍 {career.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ 
                    color: '#666', 
                    fontSize: isMobile ? '0.95rem' : '1rem', 
                    lineHeight: '1.6', 
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {career.description}
                  </p>

                  {/* Requirements Preview */}
                  <div style={{
                    backgroundColor: '#F9F9F9',
                    borderRadius: '15px',
                    padding: '15px',
                    marginBottom: '20px',
                    borderLeft: '4px solid #8AB440'
                  }}>
                    <p style={{ 
                      color: '#555', 
                      fontSize: '0.9rem', 
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      <strong>Requirements:</strong> {career.requirements}
                    </p>
                  </div>

                  {/* Apply Button */}
                  <button onClick={() => router.push('/contact')} style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2F5233',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1e3d22';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#2F5233';
                  }}>
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '80px 40px',
                backgroundColor: 'white',
                borderRadius: '30px',
                border: '2px solid #8AB440'
              }}>
                <h3 style={{ color: '#8AB440', marginBottom: '15px', fontSize: '1.5rem' }}>No Positions Available</h3>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Check back soon for new opportunities!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerPage;

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/productpage/${slug}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.data);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#F2F7F0'
      }}>
        <h2 style={{ color: '#8AB440' }}>Loading Product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#F2F7F0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#8AB440', marginBottom: '20px' }}>Product Not Found</h2>
          <Link href="/product">
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#2F5233',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer'
            }}>Back to Products</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#F2F7F0',
      padding: isMobile ? '40px 20px' : '50px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative Bubbles */}
      <div style={{
        position: 'fixed',
        top: '-50px',
        left: '-50px',
        width: '200px',
        height: '200px',
        backgroundColor: 'rgba(138, 180, 64, 0.08)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        top: '10%',
        right: '-80px',
        width: '250px',
        height: '250px',
        backgroundColor: 'rgba(47, 82, 51, 0.06)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '-60px',
        left: '5%',
        width: '220px',
        height: '220px',
        backgroundColor: 'rgba(138, 180, 64, 0.07)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '-70px',
        width: '240px',
        height: '240px',
        backgroundColor: 'rgba(47, 82, 51, 0.05)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* Main Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: '50px',
        padding: isMobile ? '40px 25px' : '60px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        border: '1px solid rgba(138, 180, 64, 0.1)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '40px' : '60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>

        {/* Back Button */}
        <Link href="/product" style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 10 }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: '#8AB440',
            border: '2px solid #8AB440',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#8AB440';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#8AB440';
          }}>
            ← Back
          </button>
        </Link>

        {/* Left Section - Image */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobile ? '0' : '40px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '30px',
            padding: '30px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '450px'
          }}>
            <img 
              src={product.image || '/1.jpg'} 
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '20px'
              }}
            />
          </div>
        </div>

        {/* Right Section - Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: isMobile ? '0' : '40px'
        }}>
          
          {/* Heading */}
          <h1 style={{
            fontSize: isMobile ? '2.2rem' : '3.2rem',
            fontWeight: 'bold',
            color: '#2F5233',
            marginBottom: '15px',
            lineHeight: '1.2',
            fontFamily: 'Georgia, serif'
          }}>
            {product.name}
          </h1>

          {/* Underline Accent */}
          <div style={{
            width: '80px',
            height: '4px',
            backgroundColor: '#8AB440',
            marginBottom: '30px',
            borderRadius: '2px'
          }}></div>

          {/* Description */}
          <p style={{
            fontSize: isMobile ? '1rem' : '1.15rem',
            lineHeight: '1.8',
            color: '#555',
            marginBottom: '35px',
            fontFamily: 'Georgia, serif',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}>
            {product.description}
          </p>

          {/* Highlight Card */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '25px',
            padding: '25px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            border: '1px solid rgba(138, 180, 64, 0.15)'
          }}>
            <h4 style={{
              color: '#2F5233',
              marginBottom: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              margin: '0 0 8px 0'
            }}>
              Good product
            </h4>
            <p style={{
              color: '#666',
              fontSize: '0.95rem',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Natural organic goodness for your health
            </p>
          </div>

          {/* Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'flex-start'
          }}>
            <button 
              style={{
                padding: '16px 40px',
                backgroundColor: '#2F5233',
                color: 'white',
                border: 'none',
                borderRadius: '45px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: isMobile ? '1' : 'auto'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1e3d22';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2F5233';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Add to Cart
            </button>
            
            <a 
              href="/product-brochure.pdf" 
              download
              style={{
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: '#2F5233',
                textDecoration: 'none',
                borderRadius: '45px',
                fontWeight: '600',
                border: '2px solid #2F5233',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2F5233';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#2F5233';
              }}
            >
              📄 Download Brochure
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

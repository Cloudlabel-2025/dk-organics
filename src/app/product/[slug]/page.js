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
        backgroundColor: '#FCFAF2'
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
        backgroundColor: '#FCFAF2'
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
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif'
    }}>
      
      {/* Left Side - Pure White */}
      <div style={{
        flex: '1',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px' : '40px',
        position: 'relative',
        minHeight: isMobile ? '50vh' : 'auto'
      }}>
        
        {/* Back Button */}
        <Link href="/product">
          <button style={{
            position: 'absolute',
            top: isMobile ? '10px' : '40px',
            left: isMobile ? '10px' : '40px',
            padding: isMobile ? '8px 16px' : '12px 20px',
            backgroundColor: 'transparent',
            color: '#8AB440',
            border: '2px solid #8AB440',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: isMobile ? '0.9rem' : '1rem',
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

        {/* Large Product Image */}
        <div style={{
          maxWidth: isMobile ? '100%' : '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          <img 
            src={product.image || '/1.jpg'} 
            alt={product.name}
            style={{
              width: '100%',
              maxWidth: isMobile ? '300px' : '450px',
              height: isMobile ? '300px' : '600px',
              objectFit: 'cover',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>

      {/* Right Side - Light Green */}
      <div style={{
        flex: '1',
        backgroundColor: '#F2F7F0',
        padding: isMobile ? '30px 20px' : '60px 50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        {/* Product Title */}
        <h1 style={{
          fontSize: isMobile ? '2.5rem' : '3.5rem',
          fontWeight: 'bold',
          color: '#2F5233',
          marginBottom: '20px',
          lineHeight: '1.1',
          fontFamily: 'Georgia, serif'
        }}>{product.name}</h1>
        
        {/* Green Accent Line */}
        <div style={{
          width: '80px',
          height: '4px',
          backgroundColor: '#8AB440',
          marginBottom: '30px',
          borderRadius: '2px'
        }}></div>
        
        {/* Product Description */}
        <p style={{
          fontSize: isMobile ? '1.1rem' : '1.3rem',
          lineHeight: '1.7',
          color: '#555',
          marginBottom: '40px',
          fontFamily: 'Georgia, serif'
        }}>{product.description}</p>
        
        {/* Benefit Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {product.benefits && product.benefits.length > 0 ? (
            product.benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <h4 style={{
                  color: '#2F5233',
                  marginBottom: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>{benefit}</h4>
                <p style={{
                  color: '#666',
                  fontSize: '0.95rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>Natural organic goodness for your health</p>
              </div>
            ))
          ) : (
            <>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <h4 style={{
                  color: '#2F5233',
                  marginBottom: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>100% Organic</h4>
                <p style={{
                  color: '#666',
                  fontSize: '0.95rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>Certified organic quality</p>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <h4 style={{
                  color: '#2F5233',
                  marginBottom: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>Fresh & Natural</h4>
                <p style={{
                  color: '#666',
                  fontSize: '0.95rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>Farm fresh goodness</p>
              </div>
            </>
          )}
        </div>
        
        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexDirection: 'column' }}>
          <button 
            style={{
              padding: '18px 35px',
              backgroundColor: '#2F5233',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '200px'
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
              padding: '12px 25px',
              backgroundColor: 'transparent',
              color: '#2F5233',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '600',
              border: '2px solid #2F5233',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
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
  );
};

export default ProductDetailPage;
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ProductsPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/productpage");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
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
        <h2 style={{ color: '#8AB440' }}>Loading Products...</h2>
      </div>
    );
  }

  return (
    <>
    <section className="position-relative py-5 d-flex align-items-center border-bottom" style={{ minHeight: '40vh' }}>
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
              <Image src="/1.jpg" alt="Farm" fill priority style={{ objectFit: 'cover' }} className="opacity-25" />
            </div>
            <div className="container position-relative py-5 text-center" style={{ zIndex: 1 }}>
              <h1 className="display-4 fw-bold text-dark">Roots to Remedies</h1>
              <p className="lead fw-bold text-dark" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
                Explore our natural, garlic-based crop protection and plant health solutions.
              </p>
            </div>
          </section>
    <div style={{ backgroundColor: '#FCFAF2', minHeight: '100vh', padding: isMobile ? '30px 15px' : '60px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
          <h1 style={{ 
            fontSize: isMobile ? '2.2rem' : '3rem', 
            fontWeight: 'bold', 
            color: '#8AB440', 
            marginBottom: '20px' 
          }}>Our Organic Collection</h1>
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.2rem', 
            color: '#666', 
            maxWidth: '600px', 
            margin: '0 auto',
            padding: isMobile ? '0 10px' : '0'
          }}>
            Discover our carefully curated selection of organic products
          </p>
        </div>

        {/* Products Grid - 3 Columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: isMobile ? '25px' : '40px'
        }}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={product._id} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #eef2e6',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(138, 180, 64, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
              }}>
                
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: 'rgba(138, 180, 64, 0.9)',
                  backdropFilter: 'blur(5px)',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  zIndex: 2,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                  {product.category || 'Organic'}
                </div>

                {/* Product Image */}
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  paddingTop: '75%', /* 4:3 Aspect Ratio */
                  overflow: 'hidden',
                  backgroundColor: '#f9fbf7'
                }}>
                  <Image 
                    src={product.image && product.image.startsWith('http') ? product.image : (product.image || '/1.jpg')} 
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/1.jpg'; // Note: onError with standard Next.js Image might require a separate state, but keeping logic similar
                      e.currentTarget.srcset = '';
                    }}
                  />
                </div>
                
                {/* Product Info */}
                <div style={{ padding: isMobile ? '20px' : '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.35rem', 
                    fontWeight: '700', 
                    color: '#2d3e2d', 
                    marginBottom: '10px',
                    lineHeight: '1.4'
                  }}>{product.name}</h3>
                  
                  <p style={{ 
                    color: '#666', 
                    fontSize: '1rem', 
                    lineHeight: '1.5', 
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>{product.description}</p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    marginBottom: '25px'
                  }}>
                    <span style={{ 
                      color: product.inStock ? '#8AB440' : '#dc3545',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {product.inStock ? '✓ Available' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <Link href={`/product/${product.slug}`}>
                    <button style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'transparent',
                      color: '#8AB440',
                      border: '2px solid #8AB440',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#8AB440';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#8AB440';
                    }}>
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '80px 40px',
              backgroundColor: 'white',
              borderRadius: '40px',
              border: '2px solid #8AB440'
            }}>
              <h3 style={{ color: '#8AB440', marginBottom: '15px', fontSize: '1.5rem' }}>No Products Available</h3>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>Check back soon for our fresh organic products!</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductsPage;

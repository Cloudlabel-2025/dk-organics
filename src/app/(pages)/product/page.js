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
              <h1 className="display-4 fw-bold text-dark">Organic Database</h1>
              <p className="lead">Manage and view your farm research records.</p>
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
                borderRadius: '40px',
                border: '2px solid #8AB440',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(138, 180, 64, 0.1)',
                transition: 'transform 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                
                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: '#8AB440',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  zIndex: 2
                }}>
                  {product.category || 'Organic'}
                </div>

                {/* Product Image */}
                <div style={{ height: '280px', overflow: 'hidden' }}>
                  <img 
                    src={product.image && product.image.startsWith('http') ? product.image : (product.image || '/1.jpg')} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = '/1.jpg';
                    }}
                  />
                </div>
                
                {/* Product Info */}
                <div style={{ padding: isMobile ? '25px' : '30px' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#333', 
                    marginBottom: '12px',
                    lineHeight: '1.3'
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
                      padding: '14px',
                      backgroundColor: '#8AB440',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#7a9f39';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#8AB440';
                      e.target.style.transform = 'scale(1)';
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

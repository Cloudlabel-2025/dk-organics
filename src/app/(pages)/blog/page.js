"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogpage");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setBlogs([]);
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
        <h2 style={{ color: '#8AB440' }}>Loading Blogs...</h2>
      </div>
    );
  }

  return (
   
    <div style={{ backgroundColor: '#FCFAF2', minHeight: '100vh' }}>      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '50vh', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}>
          <Image 
            src="/1.jpg" 
            alt="Farm" 
            fill 
            priority 
            style={{ objectFit: 'cover', opacity: 0.25 }} 
          />
        </div>
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: isMobile ? '40px 20px' : '80px 40px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          <h6 style={{
            color: '#8AB440',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '20px',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>The Knowledge Base</h6>
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: 'bold',
            color: '#2F5233',
            marginBottom: '25px',
            lineHeight: '1.2'
          }}>Scientific Transparency.<br />Organic Integrity.</h1>
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: '#2F5233',
            maxWidth: '650px',
            margin: '0 auto',
            fontWeight: '500'
          }}>
            Access our latest lab results, farm research, and sustainability audits.
          </p>
        </div>
      </section>

      {/* Header Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'white', borderBottom: '1px solid #E8F5E8' }}>
        <div style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 'bold', color: '#2F5233', marginBottom: '15px' }}>
            Our Blog
          </h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Insights from our organic journey</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '60px 20px', backgroundColor: '#FCFAF2' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '30px',
            alignItems: 'start'
          }}>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} style={{
                  backgroundColor: 'white',
                  borderRadius: '0px 0px 70px 0px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  
                  {/* Blog Image */}
                  <div style={{ height: '200px', position: 'relative' }}>
                    <Image 
                      src={blog.coverImage || '/1.jpg'} 
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Blog Content */}
                  <div style={{ padding: '20px', paddingBottom: '70px', flexGrow: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '15px',
                      alignItems: 'center'
                    }}>
                      <small style={{ 
                        color: '#8AB440', 
                        fontWeight: 'bold',
                        backgroundColor: '#E8F5E8',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}>ORGANIC</small>
                      <small style={{ color: '#666' }}>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <h5 style={{ 
                      fontWeight: 'bold', 
                      color: '#2F5233', 
                      marginBottom: '12px',
                      fontSize: '1.1rem',
                      lineHeight: '1.3',
                      minHeight: '2.6rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>{blog.title}</h5>
                    <p style={{ 
                      color: '#666', 
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '2.8rem'
                    }}>
                      {blog.content?.substring(0, 120)}...
                    </p>
                  </div>

                  {/* Action Button */}
                  <Link href={`/blog/${blog.slug}`}>
                    <button style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#8AB440',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px 0px 70px 0px',
                      fontSize: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(138, 180, 64, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#7a9f39';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#8AB440';
                      e.target.style.transform = 'scale(1)';
                    }}>
                      →
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '80px 40px',
                backgroundColor: 'white',
                borderRadius: '25px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#8AB440', marginBottom: '15px', fontSize: '1.5rem' }}>No Blog Posts Available</h3>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Check back soon for our latest insights!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;

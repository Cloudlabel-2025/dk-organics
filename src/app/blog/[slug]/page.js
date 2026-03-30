"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
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
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogpage/${slug}`);
      const data = await res.json();
      
      if (data.success) {
        setBlog(data.data);
      } else {
        setError("Blog post not found");
      }
    } catch (err) {
      console.error("Failed to fetch blog:", err);
      setError("Failed to load blog post");
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
        <h2 style={{ color: '#8AB440' }}>Loading Blog Post...</h2>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#F2F7F0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#8AB440', marginBottom: '20px' }}>Blog Post Not Found</h2>
          <Link href="/blog">
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#2F5233',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer'
            }}>Back to Blog</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#F2F7F0', 
      minHeight: '100vh', 
      padding: isMobile ? '40px 20px' : '50px',
      position: 'relative',
      overflow: 'hidden',
      scrollBehavior: 'smooth'
    }}>
      
      {/* Decorative Bubbles */}
      <div style={{
        position: 'fixed',
        top: '-80px',
        right: '-80px',
        width: '280px',
        height: '280px',
        backgroundColor: 'rgba(138, 180, 64, 0.08)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        backgroundColor: 'rgba(47, 82, 51, 0.06)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        top: '50%',
        right: '-120px',
        width: '250px',
        height: '250px',
        backgroundColor: 'rgba(138, 180, 64, 0.05)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <article style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: isMobile ? '16px' : '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeIn 0.6s ease-in-out',
        border: '1px solid #eef2e6'
      }}>
        
        {/* Back Button */}
        <div style={{ padding: isMobile ? '25px 20px 0' : '40px 40px 0', position: 'relative', zIndex: 10 }}>
          <Link href="/blog">
            <button style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: '#8AB440',
              border: '2px solid #8AB440',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '0.9rem',
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
              ← Back to Blog
            </button>
          </Link>
        </div>

        {/* Hero Section */}
        <div style={{ 
          height: isMobile ? '280px' : '450px', 
          position: 'relative', 
          margin: isMobile ? '20px 20px 0' : '30px 0 0',
          borderRadius: isMobile ? '12px' : '20px',
          overflow: 'hidden'
        }}>
          <Image 
            src={blog.coverImage || '/1.jpg'} 
            alt={blog.title}
            fill
            style={{ objectFit: 'contain', backgroundColor: '#F2F7F0' }}
            priority
          />
          
          {/* Dark Gradient Overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)',
            padding: isMobile ? '30px 25px' : '50px 40px',
            color: 'white'
          }}>
            {/* Category Badge */}
            <div style={{
              backgroundColor: '#8AB440',
              color: 'white',
              padding: '8px 18px',
              borderRadius: '25px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '20px',
              letterSpacing: '0.5px'
            }}>
              ORGANIC INSIGHTS
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: isMobile ? '1.8rem' : '3rem',
              fontWeight: 'bold',
              margin: '0 0 15px 0',
              lineHeight: '1.2',
              fontFamily: 'Georgia, serif'
            }}>
              {blog.title}
            </h1>

            {/* Metadata */}
            <p style={{
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              margin: '0',
              opacity: 0.95,
              letterSpacing: '0.3px'
            }}>
              5 min read • {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ 
          padding: isMobile ? '40px 25px' : '60px 60px',
          maxWidth: '750px',
          margin: '0 auto'
        }}>
          
          {/* Divider */}
          <div style={{
            height: '2px',
            backgroundColor: 'rgba(138, 180, 64, 0.2)',
            marginBottom: '40px'
          }}></div>

          {/* Article Content */}
          <div style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: '1.8',
            color: '#2F5233',
            fontFamily: 'Georgia, serif'
          }}>
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} style={{ 
                marginBottom: '30px',
                textAlign: 'justify'
              }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Button Section */}
          <div style={{
            marginTop: '60px',
            textAlign: 'center',
            paddingTop: '40px',
            borderTop: '2px solid rgba(138, 180, 64, 0.15)'
          }}>
            <Link href="/blog">
              <button style={{
                padding: '18px 45px',
                backgroundColor: '#2F5233',
                color: 'white',
                border: 'none',
                borderRadius: '45px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(47, 82, 51, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1e3d22';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2F5233';
                e.target.style.transform = 'scale(1)';
              }}>
                Read More Articles
              </button>
            </Link>
          </div>
        </div>
      </article>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BlogDetailPage;

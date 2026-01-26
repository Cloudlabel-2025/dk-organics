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
        backgroundColor: '#FCFAF2'
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
        backgroundColor: '#FCFAF2'
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
    <div style={{ backgroundColor: '#FCFAF2', minHeight: '100vh', padding: isMobile ? '20px' : '40px' }}>
      
      {/* Article Container */}
      <article style={{
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '0px 0px 100px 0px',
        overflow: 'hidden',
        boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        
        {/* Back Button */}
        <div style={{ padding: '30px 40px 0', position: 'relative', zIndex: 10 }}>
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

        {/* Hero Image */}
        <div style={{ height: isMobile ? '250px' : '400px', position: 'relative', margin: '20px 0' }}>
          <Image 
            src={blog.coverImage || '/1.jpg'} 
            alt={blog.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          
          {/* Overlay with blog info */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            padding: '40px',
            color: 'white'
          }}>
            <div style={{
              backgroundColor: '#8AB440',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '15px'
            }}>
              ORGANIC INSIGHTS
            </div>
            <h1 style={{
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              fontWeight: 'bold',
              margin: '0',
              lineHeight: '1.2'
            }}>{blog.title}</h1>
            <p style={{
              fontSize: '0.9rem',
              margin: '10px 0 0',
              opacity: 0.9
            }}>
              Published on {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Article Content */}
        <div style={{ padding: isMobile ? '30px 25px' : '50px 60px' }}>
          
          {/* Content */}
          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#444',
            fontFamily: 'Georgia, serif'
          }}>
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '25px' }}>
                {paragraph}
              </p>
            ))}
          </div>



          {/* Navigation */}
          <div style={{
            marginTop: '40px',
            textAlign: 'center',
            paddingTop: '30px',
            borderTop: '1px solid #E8F5E8'
          }}>
            <Link href="/blog">
              <button style={{
                padding: '15px 35px',
                backgroundColor: '#2F5233',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1e3d22';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2F5233';
                e.target.style.transform = 'translateY(0)';
              }}>
                Read More Articles
              </button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
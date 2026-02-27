"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UpdateProducts } from "./UpdateProducts";
import { UpdateBlogs } from "./UpdateBlogs";
import { CreateCareerForm, ViewCareers } from "./CareerManagement";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('products');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCFAF2' }}>
        <h2 style={{ color: '#2F5233' }}>Loading Dashboard...</h2>
      </div>
    );
  }

  const isProductSection = activeSection === 'products' || activeSection.includes('product');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FCFAF2' }}>

      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            backgroundColor: '#1a3d1e',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          ☰
        </button>
      )}

      <div style={{
        width: isMobile ? '100%' : '280px',
        backgroundColor: '#1a3d1e',
        position: isMobile ? 'fixed' : 'fixed',
        height: '100vh',
        left: isMobile && !sidebarOpen ? '-100%' : 0,
        top: 0,
        padding: '30px 0',
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
        transition: 'left 0.3s ease',
        zIndex: 999,
        overflowY: 'auto'
      }}>

        <div style={{ padding: '0 30px', marginBottom: '40px' }}>
          <h1 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: '#a8e6a8', fontSize: '0.9rem' }}>
            Welcome, {user?.username}
          </p>
        </div>

        <nav>
          <div
            onClick={() => {
              setActiveSection('products');
              if (isMobile) setSidebarOpen(false);
            }}
            style={{
              padding: '15px 30px',
              color: isProductSection ? '#1a3d1e' : 'white',
              backgroundColor: isProductSection ? '#8AB440' : 'transparent',
              cursor: 'pointer',
              borderLeft: isProductSection ? '4px solid #FCFAF2' : '4px solid transparent',
              transition: 'all 0.3s ease',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Product Management
          </div>

          <div
            onClick={() => {
              setActiveSection('blogs');
              if (isMobile) setSidebarOpen(false);
            }}
            style={{
              padding: '15px 30px',
              color: activeSection === 'blogs' || activeSection.includes('blog') ? '#1a3d1e' : 'white',
              backgroundColor: activeSection === 'blogs' || activeSection.includes('blog') ? '#8AB440' : 'transparent',
              cursor: 'pointer',
              borderLeft: activeSection === 'blogs' || activeSection.includes('blog') ? '4px solid #FCFAF2' : '4px solid transparent',
              transition: 'all 0.3s ease',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Blog Management
          </div>

          <div
            onClick={() => {
              setActiveSection('careers');
              if (isMobile) setSidebarOpen(false);
            }}
            style={{
              padding: '15px 30px',
              color: activeSection === 'careers' || activeSection.includes('career') ? '#1a3d1e' : 'white',
              backgroundColor: activeSection === 'careers' || activeSection.includes('career') ? '#8AB440' : 'transparent',
              cursor: 'pointer',
              borderLeft: activeSection === 'careers' || activeSection.includes('career') ? '4px solid #FCFAF2' : '4px solid transparent',
              transition: 'all 0.3s ease',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Career Management
          </div>
        </nav>

        <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
          <button
            onClick={() => {
              document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              router.push('/login');
            }}
            style={{
              width: '100%',
              padding: '12px',
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
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ marginLeft: isMobile ? 0 : '280px', flex: 1, padding: isMobile ? '80px 20px 20px' : '40px', width: isMobile ? '100%' : 'auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2F5233', marginBottom: '10px' }}>
            {activeSection === 'careers' ? 'Career Management' : isProductSection ? 'Product Management' : 'Blog Management'}
          </h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            {activeSection === 'careers' ? 'Manage job postings' : isProductSection ? 'Manage your organic product catalog' : 'Create and manage blog content'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>

          <ActionCard
            title="Create New"
            description={`Add new ${activeSection === 'careers' ? 'career posting' : isProductSection ? 'product' : 'blog post'}`}
            color="#8AB440"
            onClick={() => setActiveSection(activeSection === 'careers' ? 'create-career' : isProductSection ? 'create-product' : 'create-blog')}
          />

          <ActionCard
            title="View All"
            description={`Browse all ${activeSection === 'careers' ? 'career postings' : isProductSection ? 'products' : 'blog posts'}`}
            color="#2F5233"
            onClick={() => setActiveSection(activeSection === 'careers' ? 'view-careers' : isProductSection ? 'view-products' : 'view-blogs')}
          />

          {(isProductSection || activeSection === 'blogs') && (
            <>
              <ActionCard
                title="Update"
                description={`Edit existing ${isProductSection ? 'products' : 'blog posts'}`}
                color="#6b8e23"
                onClick={() => setActiveSection(isProductSection ? 'update-products' : 'update-blogs')}
              />

              <ActionCard
                title="Delete"
                description={`Remove ${isProductSection ? 'products' : 'blog posts'}`}
                color="#d2691e"
                onClick={() => setActiveSection(isProductSection ? 'delete-products' : 'delete-blogs')}
              />
            </>
          )}
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '25px',
          padding: isMobile ? '25px 15px' : '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          minHeight: '400px'
        }}>
          {renderContent()}
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
        />
      )}
    </div>
  );

  function renderContent() {
    switch (activeSection) {
      case 'create-product':
        return <CreateProductForm />;
      case 'create-blog':
        return <CreateBlogForm />;
      case 'create-career':
        return <CreateCareerForm />;
      case 'view-products':
        return <ViewProducts />;
      case 'view-blogs':
        return <ViewBlogs />;
      case 'view-careers':
        return <ViewCareers />;
      case 'update-products':
        return <UpdateProducts />;
      case 'update-blogs':
        return <UpdateBlogs />;
      case 'delete-products':
        return <UpdateProducts />;
      case 'delete-blogs':
        return <UpdateBlogs />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h3 style={{ color: '#2F5233', marginBottom: '15px' }}>
              Welcome to {activeSection === 'careers' ? 'Career' : isProductSection ? 'Product' : 'Blog'} Management
            </h3>
            <p style={{ color: '#666' }}>
              Select an action from the cards above to get started.
            </p>
          </div>
        );
    }
  }
};

const ActionCard = ({ title, description, color, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: `2px solid ${color}20`,
      textAlign: 'center'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
    }}
  >
    <h4 style={{ color: color, fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>
      {title}
    </h4>
    <p style={{ color: '#666', fontSize: '0.95rem' }}>{description}</p>
  </div>
);

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    category: '',
    benefits: [''],
    origin: '',
    brochure: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const canvas = document.createElement('canvas');
      const img = new Image();
      const reader = new FileReader();

      reader.onload = async (event) => {
        img.onload = async () => {
          const maxWidth = 800;
          const maxHeight = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(async (blob) => {
            const formDataUpload = new FormData();
            formDataUpload.append('file', blob, file.name);

            const res = await fetch('/api/upload', {
              method: 'POST',
              body: formDataUpload
            });

            const data = await res.json();
            if (data.success) {
              setFormData(prev => ({ ...prev, image: data.url }));
              setMessage('✓ Image uploaded successfully!');
              setTimeout(() => setMessage(''), 2000);
            } else {
              setMessage(`Error: ${data.message || 'Upload failed'}`);
              console.error('Upload failed:', data);
            }
            setUploading(false);
          }, 'image/jpeg', 0.8);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setMessage('Error uploading image');
      console.error('Error uploading image:', err);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (uploading) {
      setMessage('Error: Please wait for media upload to finish');
      setLoading(false);
      return;
    }

    const requiredFields = {
      name: 'Product Name',
      slug: 'Slug',
      description: 'Description',
      image: 'Product Image',
      category: 'Category'
    };

    const missing = Object.entries(requiredFields)
      .filter(([key]) => !formData[key]?.trim())
      .map(([, label]) => label);

    if (missing.length > 0) {
      setMessage(`Error: Missing required fields: ${missing.join(', ')}`);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/productpage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          slug: formData.slug.trim().toLowerCase().replace(/\s+/g, '-'),
          price: 0,
          inStock: true,
          organic: true,
          benefits: formData.benefits.filter(b => b.trim()),
          brochure: formData.brochure
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Product created successfully!');
        setFormData({
          name: '',
          slug: '',
          description: '',
          image: '',
          category: '',
          benefits: [''],
          origin: '',
          brochure: ''
        });
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err) {
      setMessage('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>Create New Product</h3>

      {message && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '10px',
          marginBottom: '20px',
          backgroundColor: message.includes('Error') ? '#fee' : '#efe',
          color: message.includes('Error') ? '#c33' : '#3c3',
          border: `1px solid ${message.includes('Error') ? '#fcc' : '#cfc'}`
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <FormField
            label="Product Name"
            value={formData.name}
            onChange={(value) => {
              setFormData({ ...formData, name: value, slug: value.toLowerCase().replace(/\s+/g, '-') });
            }}
            required
          />
          <FormField
            label="Slug"
            value={formData.slug}
            onChange={(value) => setFormData({ ...formData, slug: value })}
            required
          />
        </div>

        <FormField
          label="Description"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          multiline
          required
        />

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Image (Required)</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
          {formData.image && (
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <img src={formData.image} alt="preview" style={{ maxWidth: '150px', borderRadius: '8px' }} />
              <button type="button" onClick={() => setFormData({ ...formData, image: '' })} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', height: 'fit-content' }}>✕</button>
            </div>
          )}
          {formData.image && <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666', wordBreak: 'break-all' }}>{formData.image}</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <FormField
            label="Category"
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            required
          />
        </div>

        <FormField
          label="Origin"
          value={formData.origin}
          onChange={(value) => setFormData({ ...formData, origin: value })}
        />

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Brochure (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            disabled={uploading}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              setUploading(true);
              const formDataUpload = new FormData();
              formDataUpload.append('file', file);
              try {
                const res = await fetch('/api/upload', {
                  method: 'POST',
                  body: formDataUpload
                });
                const data = await res.json();
                if (data.success) {
                  setFormData(prev => ({ ...prev, brochure: data.url }));
                  setMessage('✓ Brochure uploaded successfully!');
                  setTimeout(() => setMessage(''), 2000);
                } else {
                  setMessage('Error: ' + (data.message || 'Upload failed'));
                }
              } catch (err) {
                console.error('Frontend brochure upload error:', err);
                setMessage('Error uploading brochure: ' + err.message);
              } finally {
                setUploading(false);
              }
            }}
            style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }}
          />
          {uploading && <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '5px' }}>Uploading file...</p>}
          {formData.brochure && (
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ color: '#2F5233', fontWeight: '600' }}>📄 Brochure uploaded</span>
              <button type="button" onClick={() => setFormData({ ...formData, brochure: '' })} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>✕</button>
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>
            Benefits
          </label>
          {formData.benefits.map((benefit, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                value={benefit}
                onChange={(e) => {
                  const newBenefits = [...formData.benefits];
                  newBenefits[index] = e.target.value;
                  setFormData({ ...formData, benefits: newBenefits });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid #E8F5E8',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
                placeholder={`Benefit ${index + 1}`}
              />
              {index === formData.benefits.length - 1 && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, benefits: [...formData.benefits, ''] })}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#8AB440',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '15px 30px',
            backgroundColor: loading ? '#ccc' : '#2F5233',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '20px'
          }}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

const CreateBlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    coverImage: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });

      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, coverImage: data.url }));
        setMessage('✓ Image uploaded successfully!');
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('Error: ' + (data.message || 'Upload failed'));
      }
    } catch (err) {
      setMessage('Error uploading image');
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!formData.title.trim() || !formData.slug.trim() || !formData.content.trim()) {
      setMessage('Error: Title, slug and content are required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/blogpage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          title: formData.title.trim(),
          slug: formData.slug.trim().toLowerCase().replace(/\s+/g, '-')
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Blog post created successfully!');
        setFormData({
          title: '',
          slug: '',
          coverImage: '',
          content: ''
        });
      } else {
        setMessage('Error: ' + (data.error || 'Failed to create blog'));
      }
    } catch (err) {
      setMessage('Error creating blog post');
      console.error('Blog creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>Create New Blog Post</h3>

      {message && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '10px',
          marginBottom: '20px',
          backgroundColor: message.includes('Error') ? '#fee' : '#efe',
          color: message.includes('Error') ? '#c33' : '#3c3',
          border: `1px solid ${message.includes('Error') ? '#fcc' : '#cfc'}`
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <FormField
            label="Blog Title"
            value={formData.title}
            onChange={(value) => {
              setFormData({ ...formData, title: value, slug: value.toLowerCase().replace(/\s+/g, '-') });
            }}
            required
          />
          <FormField
            label="Slug"
            value={formData.slug}
            onChange={(value) => setFormData({ ...formData, slug: value })}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
          {formData.coverImage && (
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <img src={formData.coverImage} alt="preview" style={{ maxWidth: '150px', borderRadius: '8px' }} />
              <button type="button" onClick={() => setFormData({ ...formData, coverImage: '' })} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', height: 'fit-content' }}>✕</button>
            </div>
          )}
          {formData.coverImage && <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666', wordBreak: 'break-all' }}>{formData.coverImage}</p>}
        </div>

        <FormField
          label="Content"
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          multiline
          rows={8}
          required
        />

        <button
          type="submit"
          disabled={loading || uploading}
          style={{
            padding: '15px 30px',
            backgroundColor: (loading || uploading) ? '#ccc' : '#2F5233',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: (loading || uploading) ? 'not-allowed' : 'pointer',
            marginTop: '20px'
          }}
        >
          {loading ? 'Creating...' : uploading ? 'Uploading...' : 'Create Blog Post'}
        </button>
      </form>
    </div>
  );
};

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/productpage');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading products...</div>;
  }

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>All Products</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {products.map(product => (
          <div key={product._id} style={{
            display: 'flex',
            gap: '20px',
            padding: '20px',
            border: '2px solid #E8F5E8',
            borderRadius: '15px',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <img
              src={product.image || '/1.jpg'}
              alt={product.name}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ color: '#2F5233', marginBottom: '5px' }}>{product.name}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{product.description}</p>
              <span style={{ color: '#8AB440', fontSize: '0.8rem', fontWeight: '600' }}>
                {product.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogpage');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading blog posts...</div>;
  }

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>All Blog Posts</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {blogs.map(blog => (
          <div key={blog._id} style={{
            display: 'flex',
            gap: '20px',
            padding: '20px',
            border: '2px solid #E8F5E8',
            borderRadius: '15px',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <img
              src={blog.coverImage || '/blog-default.jpg'}
              alt={blog.title}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ color: '#2F5233', marginBottom: '5px' }}>{blog.title}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                {blog.content?.substring(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FormField = ({ label, value, onChange, multiline, rows = 3, required, placeholder, ...props }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>
      {label} {required && <span style={{ color: '#ff6b6b' }}>*</span>}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '12px',
          border: '2px solid #E8F5E8',
          borderRadius: '10px',
          fontSize: '1rem',
          resize: 'vertical',
          fontFamily: 'inherit'
        }}
        {...props}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '12px',
          border: '2px solid #E8F5E8',
          borderRadius: '10px',
          fontSize: '1rem'
        }}
        {...props}
      />
    )}
  </div>
);

export default Dashboard;

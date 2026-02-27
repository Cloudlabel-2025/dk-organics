import { useState, useEffect } from "react";

export const UpdateBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        setEditData(prev => ({ ...prev, coverImage: data.url }));
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

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setEditData({ ...blog });
    setMessage('');
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/blogpage/${editData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setBlogs(blogs.map(b => b._id === editData._id ? result.data : b));
        setMessage('✓ Blog post updated successfully!');
        setEditingId(null);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error: ' + (result.error || 'Failed to update'));
      }
    } catch (err) {
      setMessage('Error updating blog');
      console.error('Error updating blog:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogpage/${id}`, { method: 'DELETE' });
      const result = await res.json();

      if (res.ok && result.success) {
        setBlogs(blogs.filter(b => b._id !== id));
        setMessage('✓ Blog post deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error: ' + (result.error || 'Failed to delete'));
      }
    } catch (err) {
      setMessage('Error deleting blog');
      console.error('Error deleting blog:', err);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>Update Blog Posts</h3>

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

      <div style={{ display: 'grid', gap: '20px' }}>
        {blogs.map(blog => (
          <div key={blog._id} style={{
            display: 'flex',
            gap: '20px',
            padding: '20px',
            border: '2px solid #E8F5E8',
            borderRadius: '15px',
            flexDirection: 'column'
          }}>
            {editingId === blog._id ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Title</label>
                  <input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} placeholder="Title" style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Slug</label>
                  <input type="text" value={editData.slug} onChange={(e) => setEditData({ ...editData, slug: e.target.value })} placeholder="Slug" style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Cover Image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
                  {editData.coverImage && <img src={editData.coverImage} alt="preview" style={{ marginTop: '10px', maxWidth: '150px', borderRadius: '8px' }} />}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Content</label>
                  <textarea value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })} placeholder="Content" style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px', minHeight: '120px' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#8AB440', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ padding: '10px 20px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={blog.coverImage || '/blog-default.jpg'} alt={blog.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#2F5233', marginBottom: '5px' }}>{blog.title}</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{blog.content?.substring(0, 100)}...</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                  <button onClick={() => handleEdit(blog)} style={{ padding: '8px 16px', backgroundColor: '#6b8e23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Edit</button>
                  <button onClick={() => handleDelete(blog._id)} style={{ padding: '8px 16px', backgroundColor: '#d2691e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

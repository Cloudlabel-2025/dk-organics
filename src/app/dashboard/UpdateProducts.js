import { useState, useEffect } from "react";

export const UpdateProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

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
        setEditData(prev => ({ ...prev, image: data.url }));
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

  const handleBrochureUpload = async (e) => {
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
        setEditData(prev => ({ ...prev, brochure: data.url }));
        setMessage('✓ Brochure uploaded successfully!');
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('Error: ' + (data.message || 'Upload failed'));
      }
    } catch (err) {
      setMessage('Error uploading brochure');
      console.error('Error uploading brochure:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditData({ ...product });
    setMessage('');
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/productpage/${editData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setProducts(products.map(p => p._id === editData._id ? result.data : p));
        setMessage('✓ Product updated successfully!');
        setEditingId(null);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error: ' + (result.error || 'Failed to update'));
      }
    } catch (err) {
      setMessage('Error updating product');
      console.error('Error updating product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/productpage/${id}`, { method: 'DELETE' });
      const result = await res.json();

      if (res.ok && result.success) {
        setProducts(products.filter(p => p._id !== id));
        setMessage('✓ Product deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error: ' + (result.error || 'Failed to delete'));
      }
    } catch (err) {
      setMessage('Error deleting product');
      console.error('Error deleting product:', err);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>Update Products</h3>

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
        {products.map(product => (
          <div key={product._id} style={{
            display: 'flex',
            gap: '20px',
            padding: '20px',
            border: '2px solid #E8F5E8',
            borderRadius: '15px',
            flexDirection: 'column'
          }}>
            {editingId === product._id ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Name</label>
                  <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} placeholder="Name" style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Description</label>
                  <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px', minHeight: '80px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
                  {editData.image && <img src={editData.image} alt="preview" style={{ marginTop: '10px', maxWidth: '150px', borderRadius: '8px' }} />}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Category</label>
                  <input type="text" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} placeholder="Category" style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Brochure (PDF)</label>
                  <input type="file" accept=".pdf" onChange={handleBrochureUpload} disabled={uploading} style={{ width: '100%', padding: '10px', border: '2px solid #E8F5E8', borderRadius: '8px' }} />
                  {editData.brochure && (
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ color: '#2F5233', fontWeight: '600' }}>📄 Brochure uploaded</span>
                      <button type="button" onClick={() => setEditData({ ...editData, brochure: '' })} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#8AB440', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ padding: '10px 20px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={product.image || '/1.jpg'} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#2F5233', marginBottom: '5px' }}>{product.name}</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{product.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                  <button onClick={() => handleEdit(product)} style={{ padding: '8px 16px', backgroundColor: '#6b8e23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Edit</button>
                  <button onClick={() => handleDelete(product._id)} style={{ padding: '8px 16px', backgroundColor: '#d2691e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

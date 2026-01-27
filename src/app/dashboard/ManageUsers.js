import { useState, useEffect } from "react";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setMessage('Username and password are required');
      return;
    }

    setCreating(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setMessage('✓ Admin user created successfully!');
        setFormData({ username: '', password: '' });
        fetchUsers();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err) {
      setMessage('Error creating user');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('✓ User deleted successfully!');
        fetchUsers();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage('Error deleting user');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading users...</div>;
  }

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>Manage Admin Users</h3>

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
        {/* CREATE NEW USER FORM */}
        <div style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '15px',
          padding: '25px',
          border: '2px solid #E8F5E8'
        }}>
          <h4 style={{ color: '#2F5233', marginBottom: '20px', fontSize: '1.2rem' }}>Create New Admin</h4>
          <form onSubmit={handleCreateUser} style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Enter username"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #E8F5E8',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #E8F5E8',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={creating}
              style={{
                padding: '12px',
                backgroundColor: creating ? '#ccc' : '#2F5233',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: creating ? 'not-allowed' : 'pointer'
              }}
            >
              {creating ? 'Creating...' : 'Create Admin'}
            </button>
          </form>
        </div>

        {/* EXISTING USERS LIST */}
        <div style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '15px',
          padding: '25px',
          border: '2px solid #E8F5E8'
        }}>
          <h4 style={{ color: '#2F5233', marginBottom: '20px', fontSize: '1.2rem' }}>Existing Admins ({users.length})</h4>
          <div style={{ display: 'grid', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
            {users.map(user => (
              <div key={user._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #E8F5E8'
              }}>
                <span style={{ color: '#2F5233', fontWeight: '600' }}>{user.username}</span>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

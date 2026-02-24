"use client";
import { useState, useEffect } from "react";

export const CreateCareerForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
    roleAndResponsibility: '',
    gender: 'Any',
    experience: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Career posting created successfully!');
        setFormData({
          title: '',
          location: '',
          type: '',
          description: '',
          requirements: '',
          roleAndResponsibility: '',
          gender: 'Any',
          experience: ''
        });
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err) {
      setMessage('Error creating career posting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>Create New Career Posting</h3>
      
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
            label="Job Title"
            value={formData.title}
            onChange={(value) => setFormData({...formData, title: value})}
            required
          />
          <FormField
            label="Location"
            value={formData.location}
            onChange={(value) => setFormData({...formData, location: value})}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <FormField
            label="Job Type"
            value={formData.type}
            onChange={(value) => setFormData({...formData, type: value})}
            placeholder="e.g., Full-time, Part-time, Contract"
            required
          />
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>
              Gender <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E8F5E8',
                borderRadius: '10px',
                fontSize: '1rem'
              }}
            >
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <FormField
          label="Description"
          value={formData.description}
          onChange={(value) => setFormData({...formData, description: value})}
          multiline
          rows={4}
          required
        />

        <FormField
          label="Role and Responsibility"
          value={formData.roleAndResponsibility}
          onChange={(value) => setFormData({...formData, roleAndResponsibility: value})}
          multiline
          rows={4}
          required
        />

        <FormField
          label="Requirements"
          value={formData.requirements}
          onChange={(value) => setFormData({...formData, requirements: value})}
          multiline
          rows={4}
          required
        />

        <FormField
          label="Experience (Optional)"
          value={formData.experience}
          onChange={(value) => setFormData({...formData, experience: value})}
          placeholder="e.g., 2-3 years"
        />

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
          {loading ? 'Creating...' : 'Create Career Posting'}
        </button>
      </form>
    </div>
  );
};

export const ViewCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await fetch('/api/career');
      const data = await res.json();
      if (data.success) {
        setCareers(data.data);
      }
    } catch (err) {
      console.error('Error fetching careers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this career posting?')) return;

    try {
      const res = await fetch(`/api/career/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMessage('Career posting deleted successfully!');
        setCareers(careers.filter(c => c._id !== id));
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (err) {
      setMessage('Error deleting career posting');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading career postings...</div>;
  }

  return (
    <div>
      <h3 style={{ color: '#2F5233', marginBottom: '30px', fontSize: '1.8rem' }}>All Career Postings</h3>
      
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
        {careers.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>No career postings yet</p>
        ) : (
          careers.map(career => (
            <div key={career._id} style={{
              padding: '25px',
              border: '2px solid #E8F5E8',
              borderRadius: '15px',
              backgroundColor: '#fafafa'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <h4 style={{ color: '#2F5233', marginBottom: '5px', fontSize: '1.3rem' }}>{career.title}</h4>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#E8F5E8', color: '#2F5233', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                      📍 {career.location}
                    </span>
                    <span style={{ backgroundColor: '#E8F5E8', color: '#2F5233', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                      💼 {career.type}
                    </span>
                    <span style={{ backgroundColor: '#E8F5E8', color: '#2F5233', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                      👤 {career.gender}
                    </span>
                    {career.experience && (
                      <span style={{ backgroundColor: '#E8F5E8', color: '#2F5233', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                        ⏱️ {career.experience}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(career._id)}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Delete
                </button>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ color: '#2F5233', marginBottom: '8px', fontWeight: '600' }}>Description</h5>
                <p style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>{career.description}</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ color: '#2F5233', marginBottom: '8px', fontWeight: '600' }}>Role and Responsibility</h5>
                <p style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>{career.roleAndResponsibility}</p>
              </div>

              <div>
                <h5 style={{ color: '#2F5233', marginBottom: '8px', fontWeight: '600' }}>Requirements</h5>
                <p style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>{career.requirements}</p>
              </div>
            </div>
          ))
        )}
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

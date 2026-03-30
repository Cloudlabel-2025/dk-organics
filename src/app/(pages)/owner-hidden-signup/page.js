"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretKey: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        router.push("/login?message=Account created successfully");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FCFAF2', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '50px 40px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
        border: '1px solid #eef2e6',
        maxWidth: '450px',
        width: '100%'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2F5233', marginBottom: '10px' }}>
            Join Us
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Create your organic account
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #eef2e6',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8AB440'}
              onBlur={(e) => e.target.style.borderColor = '#eef2e6'}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #eef2e6',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8AB440'}
              onBlur={(e) => e.target.style.borderColor = '#eef2e6'}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #eef2e6',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8AB440'}
              onBlur={(e) => e.target.style.borderColor = '#eef2e6'}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2F5233', fontWeight: '600' }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #eef2e6',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8AB440'}
              onBlur={(e) => e.target.style.borderColor = '#eef2e6'}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#8AB440', fontWeight: '600' }}>
              Admin Secret Key
            </label>
            <input
              type="password"
              value={formData.secretKey}
              onChange={(e) => setFormData({...formData, secretKey: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #eef2e6',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8AB440'}
              onBlur={(e) => e.target.style.borderColor = '#eef2e6'}
              required
            />
            <small style={{ color: '#888', display: 'block', marginTop: '5px' }}>Required to authorize owner registration.</small>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: loading ? '#ccc' : '#8AB440',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = '#7a9f39';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = '#8AB440';
            }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Already have an account?
          </p>
          <Link href="/login">
            <button style={{
              backgroundColor: 'transparent',
              color: '#8AB440',
              border: '1px solid #8AB440',
              padding: '12px 30px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
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
              Login Here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

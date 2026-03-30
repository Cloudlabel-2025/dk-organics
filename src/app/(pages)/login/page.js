"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const LoginContent = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) setMessage(msg);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    backgroundColor: '#FCFAF2',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    marginTop: '80px'
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '50px 40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
    border: '1px solid #eef2e6',
    maxWidth: '450px',
    width: '100%',
    margin: 'auto'
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2F5233', marginBottom: '10px' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Sign in to your organic dashboard
          </p>
        </div>

        {message && (
          <div style={{
            backgroundColor: '#efe',
            color: '#3c3',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

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
              Username or Email
            </label>
            <input
              type="text"
              value={formData.login}
              onChange={(e) => setFormData({...formData, login: e.target.value})}
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
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#8AB440', fontSize: '0.9rem', fontWeight: '500' }}>
            Secure Owner Portal
          </p>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#FCFAF2', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading...</p></div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;

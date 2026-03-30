
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined" && window.WOW) {
      new window.WOW({ live: false }).init();
    }
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div
      className="container-fluid mt-5 py-5 wow fadeIn"
      style={{ backgroundColor: '#FCFAF2', borderTop: '1px solid #eef2e6', color: '#555' }}
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row g-5">

          {/* Brand / About */}
          <div className="col-lg-3 col-md-6">
            <h4 className="mb-4" style={{ color: '#2F5233', fontWeight: 'bold' }}>DK ORGANIC</h4>
            <p className="mb-3" style={{ lineHeight: '1.6' }}>
              DK Organics is committed to delivering pure, natural, and
              chemical-free organic products directly from trusted farms.
              Healthy soil. Honest food. Sustainable living.
            </p>
            <div className="d-flex pt-2">
              <Link href="#" className="btn btn-square rounded-circle me-2" style={{ border: '1px solid #8AB440', color: '#8AB440', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#8AB440'; e.currentTarget.style.color = '#fff' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#8AB440' }}>
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" className="btn btn-square rounded-circle me-2" style={{ border: '1px solid #8AB440', color: '#8AB440', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#8AB440'; e.currentTarget.style.color = '#fff' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#8AB440' }}>
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="#" className="btn btn-square rounded-circle me-2" style={{ border: '1px solid #8AB440', color: '#8AB440', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#8AB440'; e.currentTarget.style.color = '#fff' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#8AB440' }}>
                <i className="fab fa-youtube"></i>
              </Link>
              <Link href="#" className="btn btn-square rounded-circle" style={{ border: '1px solid #8AB440', color: '#8AB440', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#8AB440'; e.currentTarget.style.color = '#fff' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#8AB440' }}>
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="mb-4" style={{ color: '#2F5233', fontWeight: 'bold' }}>Contact Info</h4>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3" style={{ color: '#8AB440' }}></i>+91 95855 25071
            </p>
            <p className="mb-2 ms-4">+91 97919 54107</p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3" style={{ color: '#8AB440' }}></i>dkorganics.rpt@gmail.com
            </p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3" style={{ color: '#8AB440' }}></i>
              Cumbum, Tamil Nadu, India
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="mb-4" style={{ color: '#2F5233', fontWeight: 'bold' }}>Quick Links</h4>
            <Link href="/home" className="btn btn-link" style={{ color: '#555', textDecoration: 'none' }}>Home</Link><br/>
            <Link href="/about" className="btn btn-link" style={{ color: '#555', textDecoration: 'none' }}>About Us</Link><br/>
            <Link href="/product" className="btn btn-link" style={{ color: '#555', textDecoration: 'none' }}>Products</Link><br/>
            <Link href="/services" className="btn btn-link" style={{ color: '#555', textDecoration: 'none' }}>Services</Link><br/>
            <Link href="/blog" className="btn btn-link" style={{ color: '#555', textDecoration: 'none' }}>Blog</Link><br/>
            <Link href="/contact" className="btn btn-link" style={{ color: '#555', textDecoration: 'none' }}>Contact</Link>
          </div>

          {/* Policies */}
          <div className="col-lg-3 col-md-6">
            <h4 className="mb-4" style={{ color: '#2F5233', fontWeight: 'bold' }}>Information</h4>
            <Link href="/privacy-policy" className="btn btn-link" style={{ color: '#555', textDecoration: 'none' }}>
              Privacy Policy
            </Link><br/>
            <Link href="/terms" className="btn btn-link" style={{ color: '#555', textDecoration: 'none' }}>
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div className="text-center pt-4 mt-4" style={{ borderTop: '1px solid #eef2e6', position: 'relative' }}>
          <p className="mb-0">
            © {new Date().getFullYear()} <strong style={{ color: '#2F5233' }}>DK Organics</strong>. All Rights Reserved.
          </p>
          <Link 
            href="/owner-hidden-signup" 
            style={{ 
              position: 'absolute', 
              right: '0', 
              bottom: '0', 
              fontSize: '0.75rem', 
              color: '#dcedc1', 
              textDecoration: 'none' 
            }}
          >
            Ω
          </Link>
        </div>
      </div>
    </div>
  );
}
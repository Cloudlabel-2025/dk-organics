
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
      className="container-fluid footer text-light mt-5 py-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row g-5">

          {/* Brand / About */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">DK ORGANIC</h4>
            <p className="mb-3">
              DK Organics is committed to delivering pure, natural, and
              chemical-free organic products directly from trusted farms
              Healthy soil. Honest food. Sustainable living.
            </p>
            <div className="d-flex pt-2">
              <Link href="#" className="btn btn-square btn-outline-light rounded-circle me-2">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" className="btn btn-square btn-outline-light rounded-circle me-2">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="#" className="btn btn-square btn-outline-light rounded-circle me-2">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link href="#" className="btn btn-square btn-outline-light rounded-circle">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">Contact Info</h4>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3"></i>+91 95855 25071
            </p>
            <p className="mb-2 ms-4">+91 97919 54107</p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3"></i>dkorganics.rpt@gmail.com
            </p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3"></i>
              Cumbum, Tamil Nadu, India
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">Quick Links</h4>
            <Link href="/home" className="btn btn-link">Home</Link>
            <Link href="/about" className="btn btn-link">About Us</Link>
            <Link href="/product" className="btn btn-link">Products</Link>
            <Link href="/services" className="btn btn-link">Services</Link>
            <Link href="/blog" className="btn btn-link">Blog</Link>
            <Link href="/contact" className="btn btn-link">Contact</Link>
          </div>

          {/* Policies */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">Information</h4>
            <Link href="/privacy-policy" className="btn btn-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="btn btn-link">
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div className="text-center pt-4 mt-4 border-top border-secondary">
          <p className="mb-0">
            © {new Date().getFullYear()} <strong>DK Organics</strong>. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
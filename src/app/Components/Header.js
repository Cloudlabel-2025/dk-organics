"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav className={`navbar-custom ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">

        {/* LOGO */}
        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="DK Organics"
            width={140}
            height={120}
            priority
          />
        </Link>

        {/* NAV LINKS */}
        <ul className={`nav-links ${open ? "active" : ""}`}>
          {/*<li><Link href="/" onClick={closeMenu}>Coming soon</Link></li>*/}
          <li><Link href="/home" onClick={closeMenu}>Home</Link></li>
          <li><Link href="/about" onClick={closeMenu}>About</Link></li>
          <li><Link href="/product" onClick={closeMenu}>Products</Link></li>
          <li><Link href="/services" onClick={closeMenu}>Services</Link></li>
         <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
          {/* Mobile-only CTA */}
        </ul>

        {/* RIGHT SECTION: Desktop Button + Toggle */}
        <div className="header-right">
          <Link href="/login">
            <button className="cta-btn-organic desktop-only">
              Login
            </button>
          </Link>

          <div className="menu-toggle" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </div>
        </div>

      </div>
    </nav>
  );
}
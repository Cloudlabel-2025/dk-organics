// app/contact/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus("All fields are required.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }
    
    if (form.mobile.length < 10) {
      setStatus("Phone number must be at least 10 digits.");
      return;
    }
    
    setStatus("Sending...");

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", mobile: "", subject: "", message: "" });
      } else {
        setStatus(data.message || "Failed to send message.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-light" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="container text-center py-5">
          <h6 className="text-success fw-bold text-uppercase">Contact Us</h6>
          <h1 className="display-4 fw-bold mb-4">Cultivating a Healthier </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            We believe that food should be grown the way nature intended. No chemicals,
            no shortcuts—just pure, honest farming.
          </p>
        </div>
      </section>

       {/* Contact Form Section */}
            <section className="py-5 bg-white">
              <div className="container">
                {/* Upper Section: Form and Images */}
                <div className="row g-5 align-items-stretch mb-5">
                  {/* Left Column: Form */}
                  <div className="col-lg-7">
                    <div
                      className="p-4 p-md-5 border-0 shadow-sm bg-white h-100"
                      style={{ borderRadius: "0px 0px 70px 0px" }}
                    >
                      <h3 className="fw-bold mb-4 text-dark">CONTACT US</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Name</label>
                            <input
                              type="text"
                              id="name"
                              className="form-control bg-light border-0 py-3"
                              placeholder="Your Name"
                              value={form.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Email</label>
                            <input
                              type="email"
                              id="email"
                              className="form-control bg-light border-0 py-3"
                              placeholder="Email Address"
                              value={form.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Phone</label>
                            <input
                              type="tel"
                              id="mobile"
                              className="form-control bg-light border-0 py-3"
                              placeholder="Phone Number"
                              value={form.mobile}
                              maxLength={10}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Subject</label>
                            <input
                              type="text"
                              id="subject"
                              className="form-control bg-light border-0 py-3"
                              placeholder="Subject"
                              value={form.subject}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label small fw-bold text-muted">Message</label>
                            <textarea
                              id="message"
                              className="form-control bg-light border-0 py-3"
                              rows="5"
                              placeholder="How can we help you?"
                              value={form.message}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <div className="col-12 mt-4 d-flex flex-column align-items-center">
                            <button
                              type="submit"
                              className="btn px-5 py-3"
                              style={{
                                backgroundColor: "#033504",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: "0px 15px 15px 15px",
                              }}
                            >
                              Send Message
                            </button>
                            {status && (
                              <p className={`mt-3 small ${status.includes("successfully") ? "text-success" : "text-danger"}`}>
                                {status}
                              </p>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
      
                  {/* Right Column: Image starting from the right edge */}
                  <div className="col-lg-5 position-relative d-flex align-items-center justify-content-end overflow-hidden mt-4 mt-lg-0">
                    <div style={{ width: "100%", maxWidth: "360px" }}>
                      <Image
                        src="/12.png"
                        alt="Platter Background"
                        width={500}
                        height={500}
                        priority
                        className="img-fluid"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
      
                    {/* OVERLAY GARLIC */}
                    <div
                      className="position-absolute"
                      style={{
                        width: "60%",
                        top: "50%",
                        right: "5%",
                        transform: "translateY(-50%)",
                        zIndex: 5,
                      }}
                    >
                      <Image
                        src="/14.png"
                        alt="Peeled Garlic"
                        width={500}
                        height={500}
                        className="img-fluid animate__animated animate__fadeInRight"
                      />
                    </div>
                  </div>
                </div>
      
                {/* Lower Section: Map and Address */}
                <div className="row g-0">
                  <div className="col-12">
                    <div
                      className="p-4 p-md-5 border-0 shadow-sm bg-light h-100 d-flex flex-column"
                      style={{ borderRadius: "0px 0px 70px 0px" }}
                    >
                      <h4 className="fw-bold mb-4">Visit the Farm</h4>
      
                      {/* Map wrapper */}
                      <div
                        className="flex-grow-1 rounded-4 overflow-hidden shadow-inner"
                        style={{ minHeight: "350px", position: "relative" }}
                      >
                        <iframe
                          className="position-absolute top-0 start-0 w-100 h-100"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.325988226955!2d77.3117518!3d9.8229878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06e903a45c0001%3A0x8670c5f21f0881c0!2sRoyappanpatti%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
      
                      <div className="mt-4">
                        <h6 className="fw-bold text-success mb-1">Our Location</h6>
                        <p className="text-muted small">
                          W2/465B, jenis Poultry Compound<br />
                          Royappanpatty - 625 526.<br />
                          Theni Dt, TN, India.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      

    </>
  );
}

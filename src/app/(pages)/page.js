"use client";

import { useState } from "react";
import { Accordion, Row, Col, Card, Carousel , Container } from "react-bootstrap";
import Image from "next/image";



export default function Home() {
  const [activeKey, setActiveKey] = useState("0");
  const features = [
    {
      title: "Eco-Friendly Sourcing",
      desc: "We prioritize materials that are kind to the earth and your home.",
      icon: "🌱"
    },
    {
      title: "Natural Process",
      desc: "Our methods follow the rhythms of nature, ensuring pure quality.",
      icon: "☀️"
    },
    {
      title: "Organic Growth",
      desc: "Supporting local ecosystems and  farming practices.",
      icon: "🍃"
    }
  ];
  return (
    <>
      {/* HERO SECTION */}
      <section>
        <Carousel controls={false} indicators={true}>
        <Carousel.Item>
          {/* Main Hero Container - Added overflow hidden to handle the large image bleed */}
          <div 
            className="hero-bg d-flex align-items-center" 
            style={{ 
              minHeight: "80vh", 
              width: "100%", 
              overflow: "hidden", 
              backgroundColor: "#fff",
             
            }}
          >
            <Container fluid className="p-0">
              <Row className="align-items-center g-0">
                
                {/* LEFT CONTENT */}
                <Col xs={6} md={6} className="ps-5">
                  <div className="animate__animated animate__fadeInLeft ms-lg-5">
                    <h1 
                      className="fw-bold mb-2 text-dark" 
                      style={{ fontSize: "calc(1rem + 2.5vw)", lineHeight: "1.1", color: "#333" }}
                    >
                      Organic Farming <br /> Healthy Living
                    </h1>
                    <p 
                      className="text-muted mb-4" 
                      style={{ fontSize: "calc(0.7rem + 0.3vw)" }}
                    >
                      Pure, responsibly grown organic produce...
                    </p>
                    <button 
                      className="btn btn-success px-4 py-2"
                      style={{ backgroundColor: "#053b0d", border: "none", borderRadius: "5px" }}
                    >
                      Explore
                    </button>
                  </div>
                </Col>

                {/* RIGHT IMAGE COMPOSITION */}
                <Col xs={6} md={6} className="position-relative d-flex justify-content-end">
                  {/* This wrapper mimics the "half-circle" look from your image */}
                  <div 
                    className="position-relative" 
                    style={{ 
                      width: "100%", // Scaled up to allow it to "bleed" off the right side
                      transform: "translateX(10%)", // Shifts the image slightly off-screen like the reference
                    }}
                  >
                    {/* BACKGROUND PLATTER (13.png) */}
                    <div className="position-relative">
                      <Image
                        src="/13.png"
                        alt="Platter Background"
                        width={700}
                        height={700}
                        priority
                        className="img-fluid"
                        style={{ width: "90%", height: "auto", display: "block" }}
                      />

                      {/* OVERLAY GARLIC (11.png) */}
                      <div
                        className="position-absolute"
                        style={{
                          width: "80%",   // Proportionate to the platter
                          bottom: "10%",   // Adjusted to sit inside the basket look
                          left: "12.5%",
                          zIndex: 5,
                        }}
                      >
                        <Image
                          src="/11.png"
                          alt="Peeled Garlic"
                          width={600}
                          height={600}
                          priority
                          className="img-fluid animate__animated animate__fadeInRight"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>

              </Row>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>
      </section>
      {/* WHO WE ARE SECTION */}
      <section className="curve-section" style={{ marginTop: "-1px" , paddingTop: "40px"}}>
        <div className="curve-blob blob-a"></div>
        <div className="curve-blob blob-b"></div>
        <div className="curve-blob blob-c"></div>

        <div className="marker-blob blob-sm-green" style={{ top: '10%', left: '2%' }}></div>
        <div className="marker-circle circle-outline" style={{ top: '25%', right: '5%' }}></div>
        <div className="marker-blob blob-tiny-cream" style={{ bottom: '15%', left: '8%' }}></div>
        <div className="marker-circle circle-solid" style={{ bottom: '20%', right: '12%' }}></div>
        <div className="marker-blob blob-sm-green" style={{ top: '30%', left: '2%' }}></div>
        <div className="marker-circle circle-outline" style={{ top: '55%', right: '5%' }}></div>
        <div className="marker-blob blob-tiny-cream" style={{ bottom: '35%', left: '8%' }}></div>
        <div className="marker-circle circle-solid" style={{ bottom: '40%', right: '12%' }}></div>
        <div className="container text-center">
          <h3 className="green-title">Who We Are?</h3>
        </div>

        <div className="container">
          <div className="decor-pebble"></div>
          <Row className="info-list accordion-item ">
            {/* LEFT ACCORDION */}
            <Col md={4} className="ms-4">
              <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Who we are</Accordion.Header>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>What We Do</Accordion.Header>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>About Our Products</Accordion.Header>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Why Choose DK Organics</Accordion.Header>
                </Accordion.Item>
              </Accordion>
            </Col>

            {/* RIGHT CONTENT */}
            <Col md={6}>
              <Card className="organic-card hover-shadow">
                <Card.Body>
                  {activeKey === "0" && (
                    <p>
                      DK Organics is an agriculture-focused organization dedicated to developing natural, garlic-based crop protection and plant health solutions. We combine traditional wisdom with scientific innovation to support farmers, agribusinesses, and sustainable food systems.
                    </p>
                  )}
                  {activeKey === "1" && (
                    <p>
                      We research, manufacture, and supply bioactive agricultural products that:
                      Protect crops from pests and diseases
                      Improve plant immunity and nutrient absorption
                      Reduce dependency on chemical pesticides
                      Support toxin-free and sustainable farming              </p>
                  )}
                  {activeKey === "2" && (
                    <p>
                      Our flagship products include:
                      Garlic Sakthi – A powerful garlic-based bio-stimulant and crop protector enriched with nutrients, amino acids, and bioactive compounds.
                      Mealy Out – A specialized garlic extract formulation designed to control mealybugs, thrips, mites, scales, and sucking pests.
                      Both products are suitable for fruits, vegetables, cereals, plantation crops, fodder, and ornamentals. </p>
                  )}
                  {activeKey === "3" && (
                    <p>
                      Our products are naturally grown, minimally processed, and free from harmful chemicals, pesticides, and artificial additives. Each item is selected to preserve its natural taste, nutritional value, and purity. Whether it's fresh produce, grains, or organic essentials, our products are designed to support a healthier lifestyle while respecting the environment.
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      <section className="organic-section">
        <div className="decor-leaf float-slow" style={{ top: '10%', left: '5%' }}></div>

        <div className="container">
          <div className="header-content">
            <span className="subtitle">Our Philosophy</span>
            <h2 className="title">Rooted in Nature</h2>
            <p className="description">
              We believe that the best results come from working with the environment,
              not against it. Explore our organic approach.
            </p>
          </div>

          <div className="grid">
            {features.map((item, index) => (
              <div key={index} className="card">
                <div className="icon-wrapper">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Organic Background Shape */}
        <div className="blob-shape"></div>
      </section>
      <section className="parallax-section">
        {/* Background image is handled in CSS */}
        <div className="parallax-overlay"></div>

        <div className="container content-wrapper">
          <div className="organic-glass-card">
            <div className="decor-sprout" style={{ top: '-15px', left: '50%', transform: 'translateX(-50%)' }}></div>
            {/*<span className="mini-tag">Since 1994</span>*/}
            <em>
              <h2>Grown with Patience, <br /> Harvested with Love</h2>
              <p>
                Nature doesn't rush, and neither do we. Our fields are allowed to rest
                between seasons, ensuring every grain and fruit carries the full
                vitality of the earth.
              </p>
            </em>
            <div className="button-group">
              <button className="primary-organic-btn">Our Farm</button>
              <button className="secondary-organic-btn">Our Products</button>
            </div>
          </div>
        </div>

        {/* Scattered background elements */}
        <div className="floating-elements">
          <div className="decor-leaf float-slow" style={{ top: '20%', left: '10%' }}></div>
          <div className="decor-pebble" style={{ bottom: '15%', right: '15%' }}></div>
          <div className="decor-seed" style={{ top: '40%', right: '5%' }}></div>
        </div>
      </section>
      {/* SECTION 2: OUR ESSENCE */}
    <section className="essence-section">
  <div className="container">

    {/* ===== BLOCK 1 ===== */}
    <div className="row align-items-center mb-5">
      <div className="col-lg-6 position-relative">
        <div className="pebble-image-container">
          <div className="pebble-bg-back"></div>
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000"
            alt="Organic Farming"
            className="pebble-img"
          />
        </div>
      </div>

      <div className="col-lg-6 ps-lg-5 mt-4 mt-lg-0">
        <span className="organic-tag">Pure & Conscious</span>
        <h2 className="essence-title">From the Earth,<br />For Your Soul</h2>
        <p className="essence-desc">
          Garlic Sakthi is a revolutionary garlic extract formulation enriched with nutrients, amino acids, and bioactive compounds that strengthen plants.
        </p>
      </div>
    </div>

    {/* ===== BLOCK 2 (REVERSED DESKTOP) ===== */}
    <div className="row align-items-center mb-5">
      <div className="col-lg-6 ps-lg-5 mt-4 mt-lg-0 order-2 order-lg-1">
        <span className="organic-tag">Pure & Conscious</span>
        <h2 className="essence-title">From the Earth,<br />For Your Soul</h2>
        <p className="essence-desc">
          Our solutions improve root development, nutrient uptake, soil health, and overall plant vigor.
        </p>
      </div>

      <div className="col-lg-6 position-relative order-1 order-lg-2">
        <div className="pebble-image-container">
          <div className="pebble-bg-back"></div>
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000"
            alt="Organic Farming"
            className="pebble-img"
          />
        </div>
      </div>
    </div>

    {/* ===== BLOCK 3 ===== */}
    <div className="row align-items-center">
      <div className="col-lg-6 position-relative">
        <div className="pebble-image-container">
          <div className="pebble-bg-back"></div>
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000"
            alt="Organic Farming"
            className="pebble-img"
          />
        </div>
      </div>

      <div className="col-lg-6 ps-lg-5 mt-4 mt-lg-0">
        <span className="organic-tag">Pure & Conscious</span>
        <h2 className="essence-title">From the Earth,<br />For Your Soul</h2>
        <p className="essence-desc">
          Mealy Out effectively controls pests while remaining safe for crops and beneficial organisms.
        </p>
      </div>
    </div>

  </div>
</section>

      
    </>
  );
}

"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "next/image";

export default function ServicesPage() {
  const services = [
    {
      title: "Soil Health & Nutrition",
      desc: "Comprehensive testing and natural soil revitalization programs tailored to your fields.",
      points: [
        "Microbial soil balancing",
        "Organic matter enrichment",
        "Long-term fertility planning",
      ],
    },
    {
      title: "Pest Management Advisory",
      desc: "Garlic-based, natural pest control strategies that protect yields without harming the ecosystem.",
      points: [
        "Biological pest disruption",
        "Safe for beneficial insects",
        "Chemical-free spray schedules",
      ],
    },
    {
      title: "Crop Yield Optimization",
      desc: "Bio-stimulant consulting to naturally improve root development, vigor, and nutrient uptake.",
      points: [
        "Amino-acid formulations",
        "Drip irrigation efficiency",
        "Post-harvest soil recovery",
      ],
    },
    {
      title: "Sustainable Farm Transition",
      desc: "Expert guidance for farmers transitioning from conventional to certified organic farming.",
      points: [
        "Compliance & auditing prep",
        "Sustainable practice coaching",
        "Yield drop mitigation",
      ],
    },
  ];

  return (
    <>
      <section className="position-relative py-5 d-flex align-items-center border-bottom" style={{ minHeight: '40vh' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
          <Image src="/1.jpg" alt="Farm" fill priority style={{ objectFit: 'cover' }} className="opacity-25" />
        </div>
        <div className="container position-relative py-5 text-center" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold text-dark">Our Services</h1>
          <p className="lead fw-bold text-dark" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
            Expert agricultural consulting and natural crop solutions.
          </p>
        </div>
      </section>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5 text-center">
        <Container>
          <h1 className="fw-bold">Agricultural Partnerships</h1>
          <p className="mt-3">
            We build sustainable, high-yield, and environment-friendly farming systems.
          </p>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">
                      {service.title}
                    </Card.Title>
                    <Card.Text>{service.desc}</Card.Text>
                    <ul className="small">
                      {service.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5 text-center">
        <Container>
          <h2 className="fw-bold">Ready to Transform Your Yield?</h2>
          <p className="mb-4">
            Let's discuss your farming goals and introduce pure, organic practices to your fields.
          </p>
          <Button variant="dark" size="lg">
            Contact Us
          </Button>
        </Container>
      </section>
    </>
  );
}

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
      title: "Web Development",
      desc: "High-performance, SEO-ready websites built with modern frameworks like Next.js and React.",
      points: [
        "Fast loading & mobile-first",
        "SEO-optimized structure",
        "Scalable architecture",
      ],
    },
    {
      title: "E-Commerce Solutions",
      desc: "Conversion-focused online stores that are easy to manage and built to scale.",
      points: [
        "Secure payment integration",
        "Product & order management",
        "Optimized checkout flow",
      ],
    },
    {
      title: "UI / UX Design",
      desc: "Clean, user-focused designs that turn visitors into customers.",
      points: [
        "Wireframes & prototypes",
        "User-journey optimization",
        "Modern, minimal layouts",
      ],
    },
    {
      title: "API & Backend Development",
      desc: "Reliable backend systems and APIs powered by Node.js and MongoDB.",
      points: [
        "REST APIs",
        "Database design",
        "Secure authentication",
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
          <h1 className="display-4 fw-bold text-dark">Organic Database</h1>
          <p className="lead">Manage and view your farm research records.</p>
        </div>
      </section>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5 text-center">
        <Container>
          <h1 className="fw-bold">Our Services</h1>
          <p className="mt-3">
            We build fast, scalable, and business-ready digital products.
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
          <h2 className="fw-bold">Have a Project in Mind?</h2>
          <p className="mb-4">
            Let's discuss your idea and turn it into a real product.
          </p>
          <Button variant="dark" size="lg">
            Contact Us
          </Button>
        </Container>
      </section>
    </>
  );
}

"use client";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      {/* SECTION 1: HERO HEADER */}
      <section className="py-5 bg-light" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="container text-center py-5">
          <h6 className="text-success fw-bold text-uppercase">About Us</h6>
          <h1 className="display-4 fw-bold mb-4">Cultivating a Healthier </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            We believe that food should be grown the way nature intended. No chemicals,
            no shortcuts—just pure, honest farming.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE FOUNDER / VISION */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="position-relative" style={{ height: "500px", width: "100%" }}>
                <Image
                  src="/garlic-farmingbg-1.png" // Replace with your image
                  alt="Farmer in the field"
                  fill
                  style={{ objectFit: "cover", borderRadius: "20px" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2 className="fw-bold mb-4">Rooted in Tradition, Grown with Care</h2>
              <p className="text-muted mb-4">
                Our journey started with a simple clove of garlic and a dream to restore the
                soil. Today, we manage over 200 acres of certified organic land, ensuring
                that every vegetable that reaches your table is packed with nutrients
                and free from synthetic pesticides.
                Our journey started with a simple clove of garlic and a dream to restore the
                soil. Today, we manage over 200 acres of certified organic land, ensuring
                that every vegetable that reaches your table is packed with nutrients
                and free from synthetic pesticides.<br/>
                Our journey started with a simple clove of garlic and a dream to restore the
                soil. Today, we manage over 200 acres of certified organic land, ensuring
                that every vegetable that reaches your table is packed with nutrients
                and free from synthetic pesticides.
                Our journey started with a simple clove of garlic and a dream to restore the
                soil. Today, we manage over 200 acres of certified organic land, ensuring
                that every vegetable that reaches your table is packed with nutrients
                and free from synthetic pesticides.
              </p>
              <div className="row g-4">
                <div className="col-sm-6">
                  <h5 className="fw-bold text-success">100% Organic</h5>
                  <p className="small">Certified sustainable practices that enrich the Earth.</p>
                </div>
                <div className="col-sm-6">
                  <h5 className="fw-bold text-success">Farm to Table</h5>
                  <p className="small">Harvested today, delivered to your doorstep tomorrow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 4: THE TEAM */}
      <section className="py-5 bg-white">
        {/* Title Container */}
        <div className="container text-center mb-5">
          <h2 className="fw-bold display-6">Meet Our Products</h2>
          <div className="bg-success mx-auto mt-3" style={{ width: '60px', height: '3px' }}></div>
        </div>

        {/* Products Grid Container */}
        <div className="container">
          <div className="row g-4 justify-content-center text-center">

            {/* Product 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="mx-auto mb-3" style={{ width: "140px", height: "140px", position: "relative" }}>
                  <Image src="/1.jpg" fill className="rounded-circle border border-3 border-light shadow-sm" style={{ objectFit: "cover" }} alt="Product" />
                </div>
                <h5 className="fw-bold mb-1">Garlic</h5>
                <p className="text-success small fw-bold text-uppercase">Premium Quality</p>
              </div>
            </div>

            {/* Product 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="mx-auto mb-3" style={{ width: "140px", height: "140px", position: "relative" }}>
                  <Image src="/2.jpg" fill className="rounded-circle border border-3 border-light shadow-sm" style={{ objectFit: "cover" }} alt="Product" />
                </div>
                <h5 className="fw-bold mb-1">Garlic</h5>
                <p className="text-success small fw-bold text-uppercase">Organic Grade</p>
              </div>
            </div>

            {/* Product 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="mx-auto mb-3" style={{ width: "140px", height: "140px", position: "relative" }}>
                  <Image src="/3.jpg" fill className="rounded-circle border border-3 border-light shadow-sm" style={{ objectFit: "cover" }} alt="Product" />
                </div>
                <h5 className="fw-bold mb-1">Garlic</h5>
                <p className="text-success small fw-bold text-uppercase">Bulk Export</p>
              </div>
            </div>

            {/* Product 4 (Added from your second row) */}
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="mx-auto mb-3" style={{ width: "140px", height: "140px", position: "relative" }}>
                  <Image src="/1.jpg" fill className="rounded-circle border border-3 border-light shadow-sm" style={{ objectFit: "cover" }} alt="Product" />
                </div>
                <h5 className="fw-bold mb-1">Garlic</h5>
                <p className="text-success small fw-bold text-uppercase">Seed Variety</p>
              </div>
            </div>

            {/* Product 5 (Added from your second row) */}
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="mx-auto mb-3" style={{ width: "140px", height: "140px", position: "relative" }}>
                  <Image src="/2.jpg" fill className="rounded-circle border border-3 border-light shadow-sm" style={{ objectFit: "cover" }} alt="Product" />
                </div>
                <h5 className="fw-bold mb-1">Garlic</h5>
                <p className="text-success small fw-bold text-uppercase">Natural Process</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* SECTION 3: CORE VALUES (ICONS) */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-4">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="mb-3"><i className="bi bi-shield-check fs-1 text-success"></i></div>
              <h4>Quality Guaranteed</h4>
              <p className="text-light-50">Rigorous testing on every batch of produce.</p>
            </div>
            <div className="col-md-4">
              <div className="mb-3"><i className="bi bi-water fs-1 text-success"></i></div>
              <h4>Eco-Friendly</h4>
              <p className="text-light-50">Using 40% less water through drip irrigation.</p>
            </div>
            <div className="col-md-4">
              <div className="mb-3"><i className="bi bi-heart fs-1 text-success"></i></div>
              <h4>Fair Trade</h4>
              <p className="text-light-50">Supporting our local farming community fairly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light border-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 rounded-5 p-4 p-md-5 bg-white shadow-sm overflow-hidden position-relative">
                <div className="row align-items-center position-relative" style={{ zIndex: 1 }}>
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <h3 className="fw-bold mb-2">Corporate Intelligence Brief</h3>
                    <p className="text-muted mb-0">Join 5,000+ industry professionals receiving our monthly harvest and sustainability reports.</p>
                  </div>
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <h3 className="fw-bold mb-2">Corporate Intelligence Brief</h3>
                    <p className="text-muted mb-0">Join 5,000+ industry professionals receiving our monthly harvest and sustainability reports.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
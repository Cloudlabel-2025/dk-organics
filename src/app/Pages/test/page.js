"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. FETCH ALL BLOGS (READ)
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 2. DELETE A BLOG (DELETE)
  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevents opening the modal
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <div className="p-5 text-center">Loading Farm Insight...</div>;

  return (
    <div className="position-relative">
      {/* HERO SECTION */}
      <section className="position-relative py-5 d-flex align-items-center border-bottom" style={{ minHeight: '40vh' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
          <Image src="/1.jpg" alt="Farm" fill priority style={{ objectFit: 'cover' }} className="opacity-25" />
        </div>
        <div className="container position-relative py-5 text-center" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold text-dark">Organic Database</h1>
          <p className="lead">Manage and view your farm research records.</p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <div className="col-lg-4 col-md-6" key={blog._id}>
                  <div className="h-100 shadow-sm bg-white position-relative" style={{ borderRadius: "0px 0px 70px 0px", overflow: "hidden" }}>
                    
                    {/* DELETE BUTTON */}
                    <button 
                      onClick={(e) => handleDelete(blog._id, e)}
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                      style={{ zIndex: 5, borderRadius: '50%' }}
                    >
                      ✕
                    </button>

                    <div className="position-relative" style={{ height: "200px" }}>
                      <Image src={blog.img || "/1.jpg"} alt={blog.title} fill style={{ objectFit: "cover" }} />
                    </div>

                    <div className="p-4 pb-5">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-success fw-bold">{blog.category}</small>
                        <small className="text-muted">{blog.date}</small>
                      </div>
                      <h5 className="fw-bold">{blog.title}</h5>
                      <p className="text-muted small">{blog.excerpt}</p>
                    </div>

                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="position-absolute bottom-0 end-0 btn btn-success border-0 d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px", borderRadius: "50px 0px 70px 0px" }}
                    >
                      →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No records found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MODAL OVERLAY */}
      {selectedBlog && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3" style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }} onClick={() => setSelectedBlog(null)}>
          <div className="bg-white shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px", width: "100%", borderRadius: "0px 0px 100px 0px" }}>
             <div className="row g-0">
                <div className="col-md-5 position-relative" style={{ minHeight: "300px" }}>
                   <Image src={selectedBlog.img} alt={selectedBlog.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="col-md-7 p-4">
                   <h2 className="fw-bold">{selectedBlog.title}</h2>
                   <p className="text-muted">{selectedBlog.content}</p>
                   <button className="btn btn-success" onClick={() => setSelectedBlog(null)}>Close</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

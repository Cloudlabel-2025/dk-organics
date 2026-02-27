"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ----- Fetch users on mount -----
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        const text = await res.text();
        console.error("API ERROR:", text);
        setError("Failed to fetch users");
        return;
      }

      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setUsers(json.data);
      } else {
        setError(json.error || "Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  // ----- Handle form submit -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to add user");
      }

      // Update users list immediately
      setUsers((prev) => [...prev, json.data]);
      setFormData({ name: "", email: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>User Management</h1>

      {/* ----- Form ----- */}
      <section style={{ marginBottom: "40px", background: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
        <h3 style={{ marginTop: 0 }}>Add New User</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          />
          <input
            type="email"
            placeholder="email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px",
              background: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>
      </section>

      {/* ----- Users List ----- */}
      <section>
        <h3>Existing Users ({users.length})</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <li
                key={user._id}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{user.name}</strong>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>{user.email}</div>
                </div>
                <span style={{ fontSize: "0.7rem", color: "#ccc" }}>{user._id}</span>
              </li>
            ))
          ) : (
            <p style={{ color: "#999" }}>No users found in database</p>
          )}
        </ul>
      </section>
    </main>
  );
}

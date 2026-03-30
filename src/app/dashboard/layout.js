export default function DashboardLayout({ children }) {
  // Route protection is now handled securely at the Edge by src/middleware.js
  // This layout simply passes the authenticated children through.
  return children;
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/verify');
        if (res.ok) {
          setIsAuthorized(true);
        } else {
          router.push('/login');
        }
      } catch (err) {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  if (!isAuthorized) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Redirecting...</div>;
  }

  return children;
}

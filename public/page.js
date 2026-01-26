"use client";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="glitter-page">
      <div className="glitter-card text-center">
        
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="logo mb-4"
          priority
        />

        <h1 className="glitter-title mb-3">
          Something Spectacular Is Coming
        </h1>

        <h3 className="glitter-badge mt-4">
          Coming Soon
        </h3>

        <p className="contact mt-4">
          dkorganics.rpt@gmail.com
        </p>
      </div>

      <div className="glitter-particles"></div>
    </div>
  );
}

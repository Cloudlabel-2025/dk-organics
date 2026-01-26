export default function Loading() {
  return (
    <>
      <section style={{ minHeight: '40vh', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ height: '40px', backgroundColor: '#e0e0e0', borderRadius: '8px', marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}></div>
          <div style={{ height: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px', maxWidth: '300px', margin: '0 auto' }}></div>
        </div>
      </section>
      <div style={{ backgroundColor: '#FCFAF2', minHeight: '100vh', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ height: '50px', backgroundColor: '#e0e0e0', borderRadius: '8px', marginBottom: '20px', maxWidth: '500px', margin: '0 auto 20px' }}></div>
            <div style={{ height: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div style={{ height: '280px', backgroundColor: '#e0e0e0' }}></div>
                <div style={{ padding: '30px' }}>
                  <div style={{ height: '24px', backgroundColor: '#e0e0e0', borderRadius: '8px', marginBottom: '15px' }}></div>
                  <div style={{ height: '60px', backgroundColor: '#e0e0e0', borderRadius: '8px', marginBottom: '20px' }}></div>
                  <div style={{ height: '40px', backgroundColor: '#e0e0e0', borderRadius: '25px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

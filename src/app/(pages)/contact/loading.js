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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ height: '40px', backgroundColor: '#e0e0e0', borderRadius: '8px', marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}></div>
            <div style={{ height: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px', maxWidth: '300px', margin: '0 auto' }}></div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ marginBottom: '30px' }}>
                <div style={{ height: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px', marginBottom: '10px', width: '30%' }}></div>
                <div style={{ height: '40px', backgroundColor: '#e0e0e0', borderRadius: '8px' }}></div>
              </div>
            ))}
            <div style={{ height: '50px', backgroundColor: '#e0e0e0', borderRadius: '25px', marginTop: '30px' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

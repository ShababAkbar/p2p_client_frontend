import { Wifi } from 'lucide-react'

function Header() {
  return (
    <header className="card" style={{ margin: '1rem', marginBottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Wifi size={24} color="#3b82f6" />
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
          P2P File Sharing
        </h1>
      </div>
    </header>
  )
}

export default Header
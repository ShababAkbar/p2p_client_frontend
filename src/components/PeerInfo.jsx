import { Server, Wifi } from 'lucide-react'

function PeerInfo({ peerInfo }) {
  return (
    <div className="card">
      <div className="card-header">
        <Server size={20} />
        <h2 className="card-title">Peer Information</h2>
        <div className={`status-indicator ${peerInfo.connected ? 'connected' : ''}`}></div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '500' }}>Peer ID:</span>
          <span style={{ fontFamily: 'monospace', color: '#3b82f6' }}>{peerInfo.peerId}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '500' }}>Port:</span>
          <span style={{ fontFamily: 'monospace' }}>{peerInfo.port}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '500' }}>Tracker Status:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wifi size={16} color={peerInfo.connected ? '#10b981' : '#ef4444'} />
            <span style={{ 
              color: peerInfo.connected ? '#10b981' : '#ef4444',
              fontWeight: '500',
              fontSize: '0.875rem'
            }}>
              {peerInfo.connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeerInfo
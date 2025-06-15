import { Download, X, User } from 'lucide-react'

function ActiveDownloads({ downloads, onCancelDownload }) {
  return (
    <div className="card">
      <div className="card-header">
        <Download size={20} />
        <h2 className="card-title">Active Downloads</h2>
      </div>
      
      {downloads.length === 0 ? (
        <div className="empty-state">
          No active downloads
        </div>
      ) : (
        <div>
          {downloads.map((download) => (
            <div key={download.id} className="download-item">
              <div className="download-header">
                <div className="download-info">
                  <h4 style={{ marginBottom: '0.25rem' }}>{download.fileName}</h4>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}>
                    <User size={12} />
                    from {download.fromPeer}
                  </div>
                </div>
                <div className="download-actions">
                  <button 
                    className="btn btn-danger btn-small"
                    onClick={() => onCancelDownload(download.id)}
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${download.progress}%` }}
                ></div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#64748b',
                marginTop: '0.5rem'
              }}>
                <span>Part {download.currentPart} of {download.totalParts}</span>
                <span>{Math.round(download.progress)}%</span>
              </div>
              
              <div style={{
                fontSize: '0.75rem',
                color: download.status === 'completed' ? '#059669' : '#0284c7',
                fontWeight: '500',
                marginTop: '0.25rem'
              }}>
                {download.status === 'starting' && 'Initializing...'}
                {download.status === 'downloading' && 'Downloading...'}
                {download.status === 'completed' && 'Reconstructing file...'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActiveDownloads
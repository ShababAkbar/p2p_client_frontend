import { FolderOpen, File } from 'lucide-react'

function MySharedFiles({ files }) {
  return (
    <div className="card">
      <div className="card-header">
        <FolderOpen size={20} />
        <h2 className="card-title">My Shared Files</h2>
      </div>
      
      {files.length === 0 ? (
        <div className="empty-state">
          <File size={32} style={{ margin: '0 auto 0.5rem', display: 'block', color: '#cbd5e1' }} />
          No files shared yet
        </div>
      ) : (
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={index} className="file-item">
              <div className="file-info">
                <h4>{file.name}</h4>
                <div className="file-meta">
                  {file.parts} parts • {file.size}
                </div>
              </div>
              <div style={{ 
                backgroundColor: '#dcfce7', 
                color: '#166534', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                Sharing
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MySharedFiles
import { CheckCircle, Trash2, FolderOpen } from 'lucide-react'

function CompletedFiles({ files, onDeleteChunks }) {
  return (
    <div className="card">
      <div className="card-header">
        <CheckCircle size={20} />
        <h2 className="card-title">Completed Downloads</h2>
      </div>
      
      {files.length === 0 ? (
        <div className="empty-state">
          <FolderOpen size={32} style={{ margin: '0 auto 0.5rem', display: 'block', color: '#cbd5e1' }} />
          No completed downloads yet
        </div>
      ) : (
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={index} className="file-item">
              <div className="file-info">
                <h4>{file.name}</h4>
                <div className="file-meta">
                  {file.size} • Downloaded {file.downloadedAt}
                </div>
              </div>
              <button 
                className="btn btn-secondary btn-small"
                onClick={() => onDeleteChunks(file.name)}
                title="Delete chunk files"
              >
                <Trash2 size={12} />
                Clean
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CompletedFiles
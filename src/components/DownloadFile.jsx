import { useState } from 'react'
import { Download, Users } from 'lucide-react'

function DownloadFile({ availableFiles, onDownloadFile }) {
  const [selectedFile, setSelectedFile] = useState('')

  const handleDownload = () => {
    if (selectedFile) {
      onDownloadFile(selectedFile)
      setSelectedFile('')
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <Download size={20} />
        <h2 className="card-title">Download File</h2>
      </div>
      
      <select 
        className="select"
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.value)}
      >
        <option value="">Select a file to download...</option>
        {availableFiles.map((file, index) => (
          <option key={index} value={file.name}>
            {file.name} ({file.parts} parts from {file.peers.length} peers)
          </option>
        ))}
      </select>
      
      {selectedFile && (
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: '#f1f5f9', 
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Users size={16} />
            <strong>Available from peers:</strong>
          </div>
          <div style={{ color: '#64748b' }}>
            {availableFiles.find(f => f.name === selectedFile)?.peers.join(', ')}
          </div>
        </div>
      )}
      
      <button 
        className="btn btn-primary"
        onClick={handleDownload}
        disabled={!selectedFile}
        style={{ 
          width: '100%',
          opacity: selectedFile ? 1 : 0.5,
          cursor: selectedFile ? 'pointer' : 'not-allowed'
        }}
      >
        <Download size={16} />
        Start Download
      </button>
    </div>
  )
}

export default DownloadFile
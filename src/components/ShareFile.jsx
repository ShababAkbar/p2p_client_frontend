import { useState } from 'react'
import { Upload, Plus } from 'lucide-react'

function ShareFile({ onShareFile }) {
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      onShareFile(file)
      event.target.value = '' // Reset input
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files[0]
    if (file) {
      onShareFile(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  return (
    <div className="card">
      <div className="card-header">
        <Upload size={20} />
        <h2 className="card-title">Share File</h2>
      </div>
      
      <div 
        className={`file-input ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          borderColor: dragOver ? '#3b82f6' : '#cbd5e1',
          backgroundColor: dragOver ? '#eff6ff' : '#f8fafc'
        }}
      >
        <input 
          type="file" 
          onChange={handleFileSelect}
          id="file-input"
        />
        <label htmlFor="file-input" style={{ cursor: 'pointer', display: 'block' }}>
          <Plus size={24} style={{ margin: '0 auto 0.5rem', display: 'block', color: '#64748b' }} />
          <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Click to select or drag & drop a file here
          </div>
        </label>
      </div>
    </div>
  )
}

export default ShareFile
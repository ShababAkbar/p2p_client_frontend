import { useState, useEffect } from 'react'
import Header from './components/Header'
import PeerInfo from './components/PeerInfo'
import ShareFile from './components/ShareFile'
import MySharedFiles from './components/MySharedFiles'
import DownloadFile from './components/DownloadFile'
import ActiveDownloads from './components/ActiveDownloads'
import CompletedFiles from './components/CompletedFiles'
import SystemLogs from './components/SystemLogs'
import './App.css'

function App() {
  const [peerInfo, setPeerInfo] = useState({
    peerId: 'peer1',
    port: 5001,
    connected: false
  })

  const [sharedFiles, setSharedFiles] = useState([
    { name: 'document.pdf', parts: 3, size: '2.4 MB' },
    { name: 'image.jpg', parts: 1, size: '856 KB' }
  ])

  const [availableFiles, setAvailableFiles] = useState([
    { name: 'notes.txt', peers: ['peer2', 'peer3'], parts: 2 },
    { name: 'video.mp4', peers: ['peer2'], parts: 8 },
    { name: 'presentation.pptx', peers: ['peer3'], parts: 4 }
  ])

  const [activeDownloads, setActiveDownloads] = useState([
    {
      id: 1,
      fileName: 'notes.txt',
      progress: 65,
      currentPart: 2,
      totalParts: 3,
      status: 'downloading',
      fromPeer: 'peer2'
    }
  ])

  const [completedFiles, setCompletedFiles] = useState([
    { name: 'report.docx', size: '1.2 MB', downloadedAt: '2025-01-27 14:30' },
    { name: 'music.mp3', size: '4.8 MB', downloadedAt: '2025-01-27 13:15' }
  ])

  const [systemLogs, setSystemLogs] = useState([
    { id: 1, message: 'Connected to tracker successfully', type: 'success', timestamp: '14:32:15' },
    { id: 2, message: 'Registered 2 shared files with tracker', type: 'info', timestamp: '14:32:16' },
    { id: 3, message: 'Started peer server on port 5001', type: 'info', timestamp: '14:32:17' },
    { id: 4, message: 'Downloading notes.txt from peer2...', type: 'info', timestamp: '14:35:22' }
  ])

  // Simulate connection to tracker
  useEffect(() => {
    const timer = setTimeout(() => {
      setPeerInfo(prev => ({ ...prev, connected: true }))
      addLog('Connected to tracker successfully', 'success')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const addLog = (message, type = 'info') => {
    const newLog = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }
    setSystemLogs(prev => [newLog, ...prev.slice(0, 9)])
  }

  const handleShareFile = (file) => {
    const newSharedFile = {
      name: file.name,
      parts: Math.ceil(file.size / (1024 * 1024)), // Simulate chunking
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    }
    setSharedFiles(prev => [...prev, newSharedFile])
    addLog(`Shared file: ${file.name} (${newSharedFile.parts} parts)`, 'success')
  }

  const handleDownloadFile = (fileName) => {
    const file = availableFiles.find(f => f.name === fileName)
    if (!file) return

    const newDownload = {
      id: Date.now(),
      fileName: file.name,
      progress: 0,
      currentPart: 0,
      totalParts: file.parts,
      status: 'starting',
      fromPeer: file.peers[0]
    }

    setActiveDownloads(prev => [...prev, newDownload])
    addLog(`Started downloading ${fileName} from ${file.peers[0]}`, 'info')

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setActiveDownloads(prev => prev.map(download => {
        if (download.id === newDownload.id) {
          const newProgress = Math.min(download.progress + Math.random() * 15, 100)
          const newCurrentPart = Math.floor((newProgress / 100) * download.totalParts)
          
          if (newProgress >= 100) {
            clearInterval(progressInterval)
            // Move to completed files
            setTimeout(() => {
              const completedFile = {
                name: download.fileName,
                size: '1.5 MB', // Simulated
                downloadedAt: new Date().toLocaleString()
              }
              setCompletedFiles(prev => [completedFile, ...prev])
              setActiveDownloads(prev => prev.filter(d => d.id !== download.id))
              addLog(`Download completed: ${download.fileName}`, 'success')
            }, 500)
            
            return { ...download, progress: 100, status: 'completed', currentPart: download.totalParts }
          }
          
          return { ...download, progress: newProgress, currentPart: newCurrentPart, status: 'downloading' }
        }
        return download
      }))
    }, 800)
  }

  const handleDeleteChunks = (fileName) => {
    addLog(`Deleted chunk files for ${fileName}`, 'info')
  }

  const handleCancelDownload = (downloadId) => {
    setActiveDownloads(prev => prev.filter(d => d.id !== downloadId))
    addLog('Download cancelled', 'warning')
  }

  return (
    <div className="app">
      <Header />
      
      <div className="container">
        <div className="grid">
          <div className="left-column">
            <PeerInfo peerInfo={peerInfo} />
            <ShareFile onShareFile={handleShareFile} />
            <MySharedFiles files={sharedFiles} />
          </div>
          
          <div className="right-column">
            <DownloadFile 
              availableFiles={availableFiles} 
              onDownloadFile={handleDownloadFile}
            />
            <ActiveDownloads 
              downloads={activeDownloads}
              onCancelDownload={handleCancelDownload}
            />
            <CompletedFiles 
              files={completedFiles}
              onDeleteChunks={handleDeleteChunks}
            />
          </div>
        </div>
        
        <SystemLogs logs={systemLogs} />
      </div>
    </div>
  )
}

export default App
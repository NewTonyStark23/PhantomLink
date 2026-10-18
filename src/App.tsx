import { useState, useEffect } from 'react'
import TitleBar from './components/TitleBar'
import SetupWizard from './components/SetupWizard'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import HowItWorks from './components/HowItWorks'
import FullIntegration from './components/FullIntegration'
import { AppProvider, useApp } from './context/AppContext'

function AppContent() {
  const { state } = useApp()
  const [minimized, setMinimized] = useState(false)

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 z-50 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-2xl shadow-indigo-500/30 flex items-center gap-2 transition-all"
      >
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        PhantomLink
      </button>
    )
  }

  const renderContent = () => {
    if (!state.setupComplete) {
      return <SetupWizard />
    }
    
    switch (state.activeTab) {
      case 'how-it-works':
        return <HowItWorks />
      case 'full-integration':
        return <FullIntegration />
      case 'dashboard':
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0a0a0f] overflow-hidden select-none">
      <TitleBar onMinimize={() => setMinimized(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

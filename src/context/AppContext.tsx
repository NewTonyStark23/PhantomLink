import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface NetworkStats {
  ping: number
  downloadSpeed: number
  uploadSpeed: number
  jitter: number
  packetLoss: number
  latency: number
  timestamp: number
}

export interface PhoneInfo {
  connected: boolean
  model: string
  battery: number
  connectionType: string
  signalStrength: number
  dataUsage: { used: number; total: number }
  uptime: number
}

export interface AppState {
  setupComplete: boolean
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error'
  phoneInfo: PhoneInfo
  networkStats: NetworkStats[]
  currentStats: NetworkStats
  isMonitoring: boolean
  activeTab: string
  bridgeMode: 'usb' | 'bluetooth' | 'proxy' | null
  dataTransferred: { up: number; down: number }
}

const initialState: AppState = {
  setupComplete: false,
  connectionStatus: 'disconnected',
  phoneInfo: {
    connected: false,
    model: 'Not Connected',
    battery: 0,
    connectionType: 'None',
    signalStrength: 0,
    dataUsage: { used: 0, total: 100 },
    uptime: 0
  },
  networkStats: [],
  currentStats: {
    ping: 0,
    downloadSpeed: 0,
    uploadSpeed: 0,
    jitter: 0,
    packetLoss: 0,
    latency: 0,
    timestamp: Date.now()
  },
  isMonitoring: false,
  activeTab: 'dashboard',
  bridgeMode: null,
  dataTransferred: { up: 0, down: 0 }
}

type Action =
  | { type: 'COMPLETE_SETUP' }
  | { type: 'SET_CONNECTION_STATUS'; payload: AppState['connectionStatus'] }
  | { type: 'SET_PHONE_INFO'; payload: Partial<PhoneInfo> }
  | { type: 'UPDATE_STATS'; payload: NetworkStats }
  | { type: 'SET_MONITORING'; payload: boolean }
  | { type: 'SET_TAB'; payload: string }
  | { type: 'SET_BRIDGE_MODE'; payload: AppState['bridgeMode'] }
  | { type: 'UPDATE_DATA_TRANSFERRED'; payload: { up: number; down: number } }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'COMPLETE_SETUP':
      return { ...state, setupComplete: true }
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload }
    case 'SET_PHONE_INFO':
      return { ...state, phoneInfo: { ...state.phoneInfo, ...action.payload } }
    case 'UPDATE_STATS':
      return {
        ...state,
        currentStats: action.payload,
        networkStats: [...state.networkStats.slice(-59), action.payload]
      }
    case 'SET_MONITORING':
      return { ...state, isMonitoring: action.payload }
    case 'SET_TAB':
      return { ...state, activeTab: action.payload }
    case 'SET_BRIDGE_MODE':
      return { ...state, bridgeMode: action.payload }
    case 'UPDATE_DATA_TRANSFERRED':
      return { ...state, dataTransferred: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Simulate network monitoring
  useEffect(() => {
    if (!state.isMonitoring || !state.setupComplete) return

    const interval = setInterval(() => {
      // Simulate realistic network stats
      const basePing = 25 + Math.random() * 30
      const jitter = Math.random() * 8
      const download = 15 + Math.random() * 35 // Mbps
      const upload = 5 + Math.random() * 15

      const stats: NetworkStats = {
        ping: Math.round(basePing),
        downloadSpeed: Math.round(download * 10) / 10,
        uploadSpeed: Math.round(upload * 10) / 10,
        jitter: Math.round(jitter * 10) / 10,
        packetLoss: Math.random() > 0.95 ? Math.round(Math.random() * 3) : 0,
        latency: Math.round(basePing + jitter),
        timestamp: Date.now()
      }

      dispatch({ type: 'UPDATE_STATS', payload: stats })
      dispatch({
        type: 'UPDATE_DATA_TRANSFERRED',
        payload: {
          up: state.dataTransferred.up + upload * 0.125,
          down: state.dataTransferred.down + download * 0.125
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [state.isMonitoring, state.setupComplete])

  // Simulate phone info updates
  useEffect(() => {
    if (!state.setupComplete || state.connectionStatus !== 'connected') return

    const interval = setInterval(() => {
      dispatch({
        type: 'SET_PHONE_INFO',
        payload: {
          battery: Math.max(10, state.phoneInfo.battery - 0.02),
          signalStrength: 75 + Math.floor(Math.random() * 25),
          uptime: state.phoneInfo.uptime + 2
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [state.setupComplete, state.connectionStatus, state.phoneInfo.battery, state.phoneInfo.signalStrength, state.phoneInfo.uptime])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}

import { useState } from 'react'
import HeroSection from './components/HeroSection'
import ProblemExplainer from './components/ProblemExplainer'
import MethodCards from './components/MethodCards'
import DeepDive from './components/DeepDive'
import ComparisonTable from './components/ComparisonTable'
import NetworkDiagram from './components/NetworkDiagram'
import ProxyConcept from './components/ProxyConcept'
import Footer from './components/Footer'

function App() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <HeroSection />
      <ProblemExplainer />
      <NetworkDiagram />
      <MethodCards activeMethod={activeMethod} setActiveMethod={setActiveMethod} />
      {activeMethod && <DeepDive method={activeMethod} onClose={() => setActiveMethod(null)} />}
      <ProxyConcept />
      <ComparisonTable />
      <Footer />
    </div>
  )
}

export default App

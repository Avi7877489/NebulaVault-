import React, { useState } from 'react'
import UniverseTab from './UniverseTab'


const UNIVERSSES = ["Artifacts", "Creatures", "Logs"]


const App = () => {

  const [currentTab, setCurrentTab] = useState(UNIVERSSES[0]);
  return (
    <div className="app p-6 min-h-screen slide-in">
      <h1 className="text-4xl font-bold mb-6 text-center text-glow font-mono">
        Welcome to NebulaVault
      </h1>
      <div className="flex gap-4 mb-8 justify-center flex-wrap">
        {UNIVERSSES.map((tab) => (
          <button
            key={tab}
            className={`nebula-button ${currentTab === tab ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="nebula-card p-6 max-w-4xl mx-auto">
        <UniverseTab universe={currentTab} />
      </div>
    </div>
  )
}

export default App

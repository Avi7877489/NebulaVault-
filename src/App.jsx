import React from 'react'



const UNIVERSSES = ["Artifacts", "Creatures", "Logs"]


const App = () => {
  return (
    <div className="app p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-mono mb-4">Welcome to NebulaVault</h1>
      <div className="flex gap-4 mb-6">
        {UNIVERSSES.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-semibold ${currentTab === tab ? "bg-blue-600" : "bg-grey-800"
              } hover:bg-blue-500 transition`}
          >
            {tab}
          </button>
        ))}
      </div>
      
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Xin chào 👋</h1>
        <p className="text-lg text-gray-600">Mình là <span className="font-semibold text-indigo-600">Lê Anh Tú</span></p>
        <p className="text-lg text-gray-600">MSSV: <span className="font-mono font-semibold">22110453</span></p>
        <p className="text-lg text-gray-600">Trường Đại học Sư phạm Kỹ Thuật TP.HCM</p>
      </div>
    </div>
  )
}

export default App

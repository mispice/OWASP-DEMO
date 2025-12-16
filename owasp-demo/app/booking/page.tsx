'use client';
import { useState, useEffect } from 'react';

export default function DosDemo() {
  const [status, setStatus] = useState('🟢 Online');
  const [logs, setLogs] = useState<string[]>([]);
  const [serverLoad, setServerLoad] = useState(0);

  // Poll server status every second
  useEffect(() => {
    const interval = setInterval(() => {
        fetch('/api/book').then(res => res.json()).then(data => {
            setServerLoad(data.active);
            if(data.active >= 50) setStatus('🔴 OFFLINE (503)');
            else setStatus('🟢 Online');
        })
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const bookLegitimate = async () => {
    const res = await fetch('/api/book', { method: 'POST' });
    const data = await res.json();
    setLogs(prev => [`User: ${data.message || data.error}`, ...prev].slice(0, 10));
  };

  const launchAttack = () => {
    setLogs(prev => ["⚠️ LAUNCHING DoS ATTACK...", ...prev]);
    // Send 100 requests instantly
    for (let i = 0; i < 100; i++) {
      fetch('/api/book', { method: 'POST' }).catch(err => console.error(err));
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="grid grid-cols-2 gap-8">
        
        {/* Left: The Innocent User */}
        <div className="border border-green-700 p-6 rounded">
          <h2 className="text-2xl mb-4 text-white">The "Booking" Site</h2>
          <div className={`p-2 mb-4 text-center font-bold text-black ${status.includes('OFFLINE') ? 'bg-red-500' : 'bg-green-500'}`}>
            System Status: {status}
          </div>
          <p>Active Connections: {serverLoad} / 50</p>
          <div className="w-full bg-gray-800 h-4 mt-2 rounded overflow-hidden">
             <div className="h-full bg-green-500 transition-all duration-200" style={{width: `${(serverLoad/50)*100}%`}}></div>
          </div>

          <button onClick={bookLegitimate} className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full">
            Book 1 Lesson (Normal User)
          </button>
        </div>

        {/* Right: The Attacker */}
        <div className="border border-red-700 p-6 rounded relative overflow-hidden">
          <h2 className="text-2xl mb-4 text-red-500">The Script Kiddie</h2>
          <p className="text-sm text-gray-400 mb-4">Design Flaw: API has no rate limiting (e.g. 10 req/min).</p>
          
          <button onClick={launchAttack} className="bg-red-600 text-white px-4 py-6 rounded hover:bg-red-500 w-full text-xl font-bold animate-pulse">
            🚀 LAUNCH DDOS ATTACK
          </button>

          <div className="mt-4 h-64 overflow-y-auto bg-gray-900 p-2 text-xs border border-gray-700">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('CRASHED') ? 'text-red-500 font-bold' : 'text-gray-300'}>
                {log}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

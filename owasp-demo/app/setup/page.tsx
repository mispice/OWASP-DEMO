'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function SetupPage() {
  const [url, setUrl] = useState('');
  const [isSet, setIsSet] = useState(false);

  const handleSetUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) setIsSet(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-2xl w-full space-y-12 text-center">
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Presenter Setup
          </h1>
          <p className="text-lg md:text-xl text-slate-400">Generate QR Code for Class</p>
        </div>

        {!isSet ? (
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
            <h2 className="text-lg font-semibold mb-4 text-white">Paste Tunnel URL</h2>
            <form onSubmit={handleSetUrl} className="flex gap-2">
              <input
                type="url"
                placeholder="https://..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Generate
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in zoom-in duration-500">
            <div className="bg-white p-8 rounded-3xl inline-block shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]">
              <QRCode 
                value={url} 
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">Scan to Join</p>
              <p className="text-blue-400 font-mono text-lg">{url}</p>
              <button 
                onClick={() => setIsSet(false)}
                className="text-sm text-slate-600 hover:text-slate-400 underline mt-4"
              >
                Change URL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

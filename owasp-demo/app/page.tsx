'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-2xl w-full space-y-12 text-center">
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            OWASP DEMO
          </h1>
          <p className="text-lg md:text-xl text-slate-400">Interactive Security Presentation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-slate-800">
          <Link href="/login" className="group block p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all">
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 mb-2">Demo 1: Fortress Corp</h3>
            <p className="text-sm text-slate-400">Insecure Design & MFA Bypass</p>
          </Link>
          
          <Link href="/booking" className="group block p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-red-500/50 hover:bg-slate-800 transition-all">
            <h3 className="text-lg font-bold text-white group-hover:text-red-400 mb-2">Demo 2: Booking DoS</h3>
            <p className="text-sm text-slate-400">Rate Limiting Failure</p>
          </Link>
        </div>

      </div>
    </div>
  );
}


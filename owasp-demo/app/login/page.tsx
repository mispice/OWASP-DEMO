'use client';

import { useState } from 'react';

export default function FortressLogin() {
  const [view, setView] = useState<'login' | 'mfa' | 'recovery' | 'dashboard'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [recoveryAnswer, setRecoveryAnswer] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Always proceed to MFA to simulate strong front door
    setView('mfa');
    setError('');
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Always fail MFA
    setError('❌ Access Denied: Invalid Hardware Token');
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // THE VULNERABILITY: Weak recovery question bypasses MFA
    if (recoveryAnswer.toLowerCase() === 'fluffy') {
      setView('dashboard');
    } else {
      setError('❌ Incorrect answer.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-slate-200">
      
      {/* Header / Branding */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4 border border-slate-700 shadow-lg">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h1 className="text-3xl font-bold tracking-wider text-white">FORTRESS CORP</h1>
        <p className="text-slate-500 text-sm uppercase tracking-widest mt-1">Enterprise Admin Portal</p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* LOGIN VIEW */}
        {view === 'login' && (
          <div className="p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Sign In</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Enterprise ID</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="admin@fortress.corp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors shadow-lg shadow-blue-900/20">
                Secure Login
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
              <hr className="w-full border-slate-700" />
              <span className="px-2 text-slate-500 text-xs whitespace-nowrap">OR LOGIN WITH</span>
              <hr className="w-full border-slate-700" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2 px-4 border border-slate-600 rounded hover:bg-slate-700 transition-colors text-sm font-medium">
                <span>Okta SSO</span>
              </button>
              <button className="flex items-center justify-center py-2 px-4 border border-slate-600 rounded hover:bg-slate-700 transition-colors text-sm font-medium">
                <span>YubiKey</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <button onClick={() => setView('recovery')} className="text-xs text-blue-400 hover:text-blue-300 hover:underline">
                Trouble signing in?
              </button>
            </div>
          </div>
        )}

        {/* MFA VIEW */}
        {view === 'mfa' && (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-block p-3 rounded-full bg-blue-900/30 text-blue-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Two-Factor Authentication</h2>
              <p className="text-slate-400 text-sm mt-2">Enter the 6-digit code from your hardware token.</p>
            </div>

            <form onSubmit={handleMfaSubmit} className="space-y-4">
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-center text-2xl tracking-[0.5em] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="000000"
                maxLength={6}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
              />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors">
                Verify Token
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm text-center animate-pulse">
                {error}
              </div>
            )}

            <button onClick={() => setView('login')} className="mt-6 w-full text-center text-xs text-slate-500 hover:text-slate-300">
              ← Back to Login
            </button>
          </div>
        )}

        {/* RECOVERY VIEW */}
        {view === 'recovery' && (
          <div className="p-8">
            <h2 className="text-xl font-semibold text-white mb-2">Account Recovery</h2>
            <p className="text-slate-400 text-sm mb-6">Answer your security question to reset access.</p>
            
            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Security Question</label>
                <div className="p-3 bg-slate-900/50 border border-slate-700 rounded text-slate-300 text-sm mb-3">
                  What is your pet's name?
                </div>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  placeholder="Answer..."
                  value={recoveryAnswer}
                  onChange={(e) => setRecoveryAnswer(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded transition-colors">
                Verify Identity
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button onClick={() => setView('login')} className="mt-6 w-full text-center text-xs text-slate-500 hover:text-slate-300">
              Cancel
            </button>
          </div>
        )}

        {/* DASHBOARD VIEW (COMPROMISED) */}
        {view === 'dashboard' && (
          <div className="bg-red-600 p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-white p-4 rounded-full mb-6 shadow-xl animate-bounce">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h1 className="text-4xl font-black text-white mb-2">SYSTEM COMPROMISED</h1>
            <p className="text-red-100 font-medium text-lg mb-8">Welcome, Administrator.</p>
            
            <div className="bg-red-800/50 p-4 rounded-lg border border-red-400/30 text-red-100 text-sm">
              <p className="font-bold mb-1">⚠️ Logic Flaw Exploited</p>
              <p>The recovery process was designed to bypass the strong MFA controls.</p>
            </div>

            <button onClick={() => {setView('login'); setRecoveryAnswer(''); setMfaCode('');}} className="mt-8 text-white underline hover:text-red-200">
              Sign Out
            </button>
          </div>
        )}

      </div>

      {/* Footer Badges */}
      <div className="mt-8 flex space-x-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-xs text-slate-400">256-bit SSL Encrypted</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          <span className="text-xs text-slate-400">SOC2 Compliant</span>
        </div>
      </div>
    </div>
  );
}

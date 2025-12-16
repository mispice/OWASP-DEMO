import { NextResponse } from 'next/server';

// Simulating a database connection pool limit
let activeConnections = 0;
const MAX_CONNECTIONS = 50; 

export async function POST() {
  // 1. Check if server is "overloaded"
  if (activeConnections >= MAX_CONNECTIONS) {
    return NextResponse.json(
      { error: "🔥 SERVER CRASHED: Too many requests! Service Unavailable (503)" }, 
      { status: 503 }
    );
  }

  // 2. Simulate processing a booking
  activeConnections++;
  
  // Simulate heavy processing time (db write)
  // We use a timeout to keep the connection "open" for a moment
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  activeConnections--;

  return NextResponse.json({ message: "✅ Booking Successful" });
}

export async function GET() {
    return NextResponse.json({ active: activeConnections, max: MAX_CONNECTIONS });
}

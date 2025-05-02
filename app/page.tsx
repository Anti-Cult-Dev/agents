import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Agent Platform</h1>
      <p className="mt-4">Welcome to the Next.js-based Agent Platform with MCP and Nile integration.</p>
      <nav className="mt-6 space-y-2 text-lg">
        <ul>
          <li><Link href="/workflow" className="text-blue-600 hover:underline">Workflow Builder</Link></li>
          <li><Link href="/server" className="text-blue-600 hover:underline">MCP Server Builder</Link></li>
          <li><Link href="/ui" className="text-blue-600 hover:underline">Web UI Builder</Link></li>
        </ul>
      </nav>
    </main>
  );
}

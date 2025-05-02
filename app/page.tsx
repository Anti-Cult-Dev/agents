'use client';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl px-10 py-12 max-w-xl w-full flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-4 tracking-tight">Agent Platform</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Build, connect, and deploy agents visually. Powered by Next.js, Supabase, and MCP.
        </p>
        <nav className="w-full">
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/workflow" className="block w-full px-6 py-3 rounded-lg text-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Workflow Builder
              </Link>
            </li>
            <li>
              <Link href="/server" className="block w-full px-6 py-3 rounded-lg text-xl font-semibold bg-blue-500 text-white hover:bg-blue-600 transition">
                MCP Server Builder
              </Link>
            </li>
            <li>
              <Link href="/ui" className="block w-full px-6 py-3 rounded-lg text-xl font-semibold bg-green-500 text-white hover:bg-green-600 transition">
                Web UI Builder
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}

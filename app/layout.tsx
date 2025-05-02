'use client';

import '../styles/globals.css';
import { ThemeProvider } from '../components/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

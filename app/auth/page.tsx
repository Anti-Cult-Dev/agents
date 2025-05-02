"use client";
import { useState } from "react";
import { createClient } from "../../lib/supabase";

export default function AuthPage() {
  console.log('Auth env check:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
  });
  
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setSuccess("Check your email for confirmation link.");
    setLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log('Login attempt:', { email });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      console.log('Login result:', { hasError: !!error, errorMessage: error?.message });
      if (error) setError(error.message);
      else setSuccess("Logged in!");
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred');
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <form className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl px-8 py-10 max-w-md w-full flex flex-col gap-4" onSubmit={handleSignup}>
        <h1 className="text-3xl font-bold text-center mb-2">Test Account Registration/Login</h1>
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <button
            type="button"
            className="flex-1 bg-green-600 text-white rounded px-4 py-2 font-semibold hover:bg-green-700 transition"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </div>
        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
      </form>
    </main>
  );
}

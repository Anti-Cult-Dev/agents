'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
  const supabase = createServerClient({ supabaseUrl: process.env.SUPABASE_URL!, supabaseKey: process.env.SUPABASE_SECRET_KEY!, cookies });
  const { data, error } = await supabase.from('servers').select();
  if (error) return NextResponse.error();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createServerClient({ supabaseUrl: process.env.SUPABASE_URL!, supabaseKey: process.env.SUPABASE_SECRET_KEY!, cookies });
  const { data, error } = await supabase.from('servers').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

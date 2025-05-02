'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerClient({ supabaseUrl: process.env.SUPABASE_URL!, supabaseKey: process.env.SUPABASE_SECRET_KEY!, cookies });
  const { data, error } = await supabase.from('workflows').select().eq('id', id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const supabase = createServerClient({ supabaseUrl: process.env.SUPABASE_URL!, supabaseKey: process.env.SUPABASE_SECRET_KEY!, cookies });
  const { data, error } = await supabase.from('workflows').update(body).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerClient({ supabaseUrl: process.env.SUPABASE_URL!, supabaseKey: process.env.SUPABASE_SECRET_KEY!, cookies });
  const { error } = await supabase.from('workflows').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

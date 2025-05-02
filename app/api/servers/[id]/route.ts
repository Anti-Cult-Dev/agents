'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  const { id } = params;
  const supabase = await createClient();
  const { data, error } = await supabase.from('servers').select().eq('id', id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  const { id } = params;
  const supabase = await createClient();
  const body = await request.json();
  const { data, error } = await supabase.from('servers').update(body).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  const { id } = params;
  const supabase = await createClient();
  const { error } = await supabase.from('servers').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

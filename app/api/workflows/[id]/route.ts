import { NextRequest, NextResponse } from 'next/server';
import { getNile } from '../../../../lib/nile';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const client = await getNile();
  const { data, error } = await client.from('workflows').select().eq('id', id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const client = await getNile();
  const { data, error } = await client.from('workflows').update(body).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const client = await getNile();
  const { error } = await client.from('workflows').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

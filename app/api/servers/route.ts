import { NextRequest, NextResponse } from 'next/server';
import { getNile } from '../../../lib/nile';

export async function GET() {
  const client = await getNile();
  const { data, error } = await client.from('servers').select();
  if (error) return NextResponse.error();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const client = await getNile();
  const { data, error } = await client.from('servers').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

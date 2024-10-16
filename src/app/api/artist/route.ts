import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const name = url.searchParams.get('name');
  const supabase = createClient();

  try {
    const { data } = await supabase.from('groups').select('*').like('id', `%${name}%`);

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

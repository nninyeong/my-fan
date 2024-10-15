import { NextResponse } from 'next/server';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const artistName = searchParams.get('artist');

  try {
    const response = await axios.get(
      `http://www.maniadb.com/api/search/${artistName}/?sr=artist&display=10&key=example&v=0.5`,
    );
    const jsonData = await parseStringPromise(response.data);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

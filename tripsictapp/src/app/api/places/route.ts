import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API Error:', data.status, data.error_message);
      return NextResponse.json({ error: data.error_message || 'Failed to fetch places' }, { status: 500 });
    }

    return NextResponse.json(data.results);
  } catch (error) {
    console.error('Error fetching data from Places API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

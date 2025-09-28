// netlify/functions/market.js
export const config = {
  schedule: "*/5 * * * *" // هر 5 دقیقه (UTC)
};

export default async function handler(event, context) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  const url = 'https://brsapi.ir/Api/Market/Gold_Currency.php?key=Free5fSNxPOc3bgaSOYBHOqXmALA2CPE';

  try {
    const r = await fetch(url);
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=120'
      },
      body: JSON.stringify(data)
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: true, message: String(e) })
    };
  }
}

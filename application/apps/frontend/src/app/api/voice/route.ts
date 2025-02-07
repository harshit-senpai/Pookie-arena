import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const audioBlob = await req.blob();
  
  // Google Cloud Speech-to-Text (Free tier: 60min/month)
  const response = await fetch(
    `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        audio: {
          content: await audioBlob.arrayBuffer().then(buf => Buffer.from(buf).toString('base64'))
        },
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          model: 'medical_conversation'
        }
      })
    }
  );

  const data = await response.json();
  return NextResponse.json(data.results[0].alternatives[0].transcript);
}
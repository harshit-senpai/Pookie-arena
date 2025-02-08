import { personalities } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, personalityId } = await req.json();
  const ELEVEN_LABS_API_KEY = "";

  const personality = personalities.find((p) => p.id === personalityId);

  if (!personality) {
    return NextResponse.json(
      { error: "Personality not found" },
      { status: 404 }
    );
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${personality.voice_id}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVEN_LABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    }
  );

  const audioBuffer = await response.arrayBuffer();
  return new NextResponse(audioBuffer, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}

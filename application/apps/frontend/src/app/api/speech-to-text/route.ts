import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference("");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await hf.automaticSpeechRecognition({
      model: "openai/whisper-base",
      inputs: buffer,
    });

    if (!response.text) {
      throw new Error("No transcription returned");
    }

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("STT Error:", error);
    return NextResponse.json(
      {
        error: "Speech recognition failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

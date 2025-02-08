import { HfInference } from "@huggingface/inference"
import { NextResponse } from "next/server"

const hf = new HfInference("")

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File
    const arrayBuffer = await audioFile.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)

    const output = await hf.automaticSpeechRecognition({
      data,
      model: "openai/whisper-base",
      provider: "hf-inference",
    })

    console.log("Transcription:", output.text)

    return NextResponse.json({ text: output.text })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to transcribe" }, { status: 500 })
  }
}


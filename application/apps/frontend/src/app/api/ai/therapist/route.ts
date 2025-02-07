import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("");

const therapyPrompt = `You are a compassionate AI therapist. Follow these rules:
1. Use active listening and validation
2. Ask open-ended questions
3. Focus on present emotions
4. Keep responses under 50 words`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      systemInstruction: therapyPrompt,
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    return NextResponse.json({
      content:
        response.text() || "I'm here to listen. Could you please repeat that?",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
  }
}

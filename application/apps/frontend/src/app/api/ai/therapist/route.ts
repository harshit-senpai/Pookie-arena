import { personalities } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("");

export async function POST(req: Request) {
  try {
    const { message, personalityId } = await req.json();

    const personality = personalities.find((p) => p.id === personalityId);

    if (!personality) {
      return NextResponse.json(
        { error: "Personality not found" },
        { status: 404 }
      );
    }

    const therapyPrompt = `You are a ${personality.name} companion. 
    Your personality traits: ${personality.description}.. Follow these rules:
1. Use active listening and validation
2. Ask open-ended questions
3. Focus on present emotions
4. Keep responses under 50 words`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: therapyPrompt,
    });

    const result = await model.generateContent([message]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
  }
}

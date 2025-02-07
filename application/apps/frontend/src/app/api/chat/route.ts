import { NextResponse } from "next/server";
import { Message, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { AuthUser, personalities } from "@/types";
import { getUser } from "@/lib/auth";
import client from "@repo/db";

const google = createGoogleGenerativeAI({
  apiKey: "",
});

const model = google.chat("gemini-1.5-flash");

const generationConfig = {
  safetySettings: [
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ],
};

export async function POST(req: Request) {
  try {
    const auth = (await getUser()) as AuthUser | null;
    const userPersonality = await client.userPersonality.findUnique({
      where: { userId: auth?.id },
      select: {
        extraversion: true,
        openness: true,
        agreeableness: true,
        conscientiousness: true,
        neuroticism: true,
      },
    });

    const reqBody = await req.json();
    const personalityId = reqBody.personalityId;
    const messages: Message[] = reqBody.messages;

    if (!messages || !personalityId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const personality = personalities.find((p) => p.id === personalityId);
    if (!personality) {
      return NextResponse.json(
        { error: "Personality not found" },
        { status: 404 }
      );
    }

    const lastMessageContent =
      messages[messages.length - 1]?.content?.toLowerCase() || "";

    const crisisKeywords = ["suicide", "self-harm", "abuse", "hurt myself"];
    if (
      crisisKeywords.some((keyword) => lastMessageContent.includes(keyword))
    ) {
      // Crisis response as a streaming text response

      const crisisMessage =
        "I'm deeply concerned about your safety. Please contact:\n\n" +
        "1. National Suicide Prevention Lifeline: 1-800-273-8255 (US)\n" +
        "2. Crisis Text Line: Text HOME to 741741 (US)\n\n" +
        "Would you like me to help you find local resources?";

      const crisisStream = streamText({
        model,
        prompt: `SYSTEM: "Do not do anything and just send":  ${crisisMessage}`,
        ...generationConfig,
      });

      return crisisStream.toDataStreamResponse();
      // Send message as single chunk to prevent model interference
    }

    const formattedPrompt = `
    You are a ${personality.name} companion. 
    Your personality traits: ${personality.description}.
    You are talking to a user with the following personality traits:
      - Extraversion: ${userPersonality?.extraversion}%
      - Openness: ${userPersonality?.openness}%
      - Agreeableness: ${userPersonality?.agreeableness}%
      - Conscientiousness: ${userPersonality?.conscientiousness}%
      - Neuroticism: ${userPersonality?.neuroticism}%
      Adjust your communication style accordingly.
Previous conversation:
${messages
  .slice(-4)
  .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
  .join("\n")}
Current request: ${messages[messages.length - 1]?.content}
`;

    const result = await streamText({
      model,
      prompt: formattedPrompt,
      ...generationConfig,
    });

    console.log(result);

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

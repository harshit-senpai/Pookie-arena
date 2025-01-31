import { personalities } from "@/types";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN!);

export async function POST(req: Request) {
  const { message, personalityId } = await req.json();

  const personality = personalities.find((p) => p.id === personalityId);

  const response = await hf.textGeneration({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    inputs: `
    ${personality?.systemPrompt}
    ${message.map((m: any) => `${m.role}: ${m.content}`).join("\n")}
    assistant:
    `,
    parameters: {
      max_new_tokens: 200,
      temperature: 0.7,
    },
  });

  return new Response(response.generated_text);
}

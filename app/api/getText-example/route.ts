import { generateText } from 'ai';
import { model } from '@/lib/ai_sdk/openai';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const { text } = await generateText({
    model,
    temperature: 0.7,
    system: `You are a comedian creating poetic but meaningless roasts. At first check characters living in one world/fairy tale, with a character provided by the user. Next randomly select a character of those and create a roast for the character you choose. Reply in Polish. Anserw in pattern:"
    Chosen Name
    Roast
    "`,
    prompt,
  });

  return Response.json({ text });
}

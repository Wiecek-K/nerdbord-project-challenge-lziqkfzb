import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  baseURL: 'https://training.nerdbord.io/api/v1/openai',
  apiKey: process.env.NEXT_PUBLIC_NERDBORD_API_KEY,
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const model = openai('gpt-4-turbo', {
  // additional settings
});

import dotenv from 'dotenv';

dotenv.config();

export const env = {

  openAIKey:
    process.env.OPENAI_API_KEY!
};
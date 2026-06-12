import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function test() {
  try {
    // List models is not directly available in the simple SDK usually, 
    // but we can try to use a known stable model.
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const result = await model.generateContent('Hello');
    console.log('Success:', result.response.text());
  } catch (error) {
    console.error('Failure:', error);
  }
}

test();

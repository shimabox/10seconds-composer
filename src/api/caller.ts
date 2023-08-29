import { OpenAI } from 'openai';
import { FormValues } from '../types';
import Prompt from '../constants/prompt';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const caller = async (data: FormValues) => {
  return await openai.chat.completions.create({
    model: process.env.REACT_APP_OPENAI_MODEL as string,
    messages: [
      {role: "system", content: Prompt},
      {role: 'user', content: data.name}
    ],
  });
};

export default caller;

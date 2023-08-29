import { OpenAI } from 'openai';
import { CodeStructureType, FormValues } from '../types';
import Prompt from '../constants/prompt';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const caller = async (data: FormValues) => {
  const completion = await openai.chat.completions.create({
    model: process.env.REACT_APP_OPENAI_MODEL as string,
    messages: [
      {role: "system", content: Prompt},
      {role: 'user', content: data.name}
    ],
  });

  const regex = /(\[.*\])/s; // jsonを抜き出す
  const content = completion.choices[0].message.content?.match(regex);
  if (!content) {
    throw new Error(JSON.stringify(completion.choices))
  }
  return JSON.parse(content[1]) as CodeStructureType;
};

export default caller;

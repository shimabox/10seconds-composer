import { FormValues } from "../types";
import Prompt from "../constants/prompt";

const caller = async (data: FormValues) => {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY as string;

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    model: process.env.REACT_APP_OPENAI_MODEL as string,
    messages: [
      {role: "system", content: Prompt},
      {role: 'user', content: data.name}
    ],
  });

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: body
  });
  const result = await response.json();

  const content = result.choices[0].message.content;
  const regex = /(\[.*\])/s; // jsonを抜き出す
  const jsonMatch = content.match(regex);
  return JSON.parse(jsonMatch[1]);
};

export default caller;

import { FormValues } from '../types';
import Prompt from '../constants/prompt';

const caller = async (data: FormValues) => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      systemPrompt: Prompt,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate composition');
  }

  return await response.json();
};

export default caller;

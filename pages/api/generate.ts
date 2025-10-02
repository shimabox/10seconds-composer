import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, model } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Composer name is required' });
    }

    const completion = await openai.chat.completions.create({
      model: model || process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: req.body.systemPrompt },
        { role: 'user', content: name }
      ],
    });

    return res.status(200).json(completion);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({
      error: 'Failed to generate composition',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

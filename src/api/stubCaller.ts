import { ChatCompletion } from 'openai/resources/chat';
import { FormValues } from '../types';
import { sleep } from '../utils';

const dummy: ChatCompletion = {
  "id": "chatcmpl-xxxxx",
  "object": "chat.completion",
  "created": 1693227166,
  "model": "gpt-4-0314",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": `ショパンをイメージしたコード進行を以下に示します。
\`\`\`
[
  { "startTime": "0", "chord": [ "C4", "E4", "G4", "B4" ], "duration": "2n", "velocity": 0.8 },
  { "startTime": "1", "chord": [ "A3", "C4", "E4", "G4" ], "duration": "2n", "velocity": 0.5 },
  { "startTime": "2", "chord": [ "D4", "F#4", "A4", "C5" ], "duration": "4n", "velocity": 0.9 },
  { "startTime": "2:2", "chord": [ "B3", "D4", "F#4", "A4" ], "duration": "4n", "velocity": 1 },
  { "startTime": "3", "chord": [ "E4", "G4", "B4", "D5" ], "duration": "2n", "velocity": 0.7 },
  { "startTime": "4", "chord": [ "F4", "A4", "C5", "E5" ], "duration": "2n", "velocity": 0.4 },
  { "startTime": "5", "chord": [ "G4", "B4", "D5", "F5" ], "duration": "4n", "velocity": 0.6 },
  { "startTime": "5:2", "chord": [ "A4", "C5", "E5", "G5" ], "duration": "4n", "velocity": 0.9 },
  { "startTime": "6", "chord": [ "B4", "D5", "F5", "A5" ], "duration": "2n", "velocity": 0.8 },
  { "startTime": "7", "chord": [ "C5", "E5", "G5", "B5" ], "duration": "2n", "velocity": 0.5 }
]
\`\`\`
このコード進行は、ショパンの優美で繊細なピアノの旋律をイメージして作曲しました。それぞれのコードは、ショパンらしい転調や変化を持っています。`
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 701,
    "completion_tokens": 490,
    "total_tokens": 1191
  }
};

const caller = async (_: FormValues): Promise<ChatCompletion> => {
  await sleep(5000);
  return await dummy;
}

export default caller;

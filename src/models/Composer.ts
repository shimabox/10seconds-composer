import { ChatCompletion } from 'openai/resources/chat';
import { CodeStructureType } from '../types';

export class Composer {
  private codeStructure: CodeStructureType;
  private thoughtsWhenComposing: string;

  constructor(chatCompletion: ChatCompletion) {
    const content = chatCompletion.choices[0].message.content;
    if (!content) {
      throw new Error(JSON.stringify(chatCompletion.choices));
    }

    // Extracted json.
    const extractedCodeStructure = content.match(/(\[.*\])/s);
    if (!extractedCodeStructure) {
      throw new Error(content);
    }

    // Extracted thoughts when composing.
    // (Extract string after code (json))
    const extractedThoughtsWhenComposing = content.match(/\]\n*```([\s\S]*)/);
    if (!extractedThoughtsWhenComposing) {
      throw new Error(content);
    }

    this.codeStructure = JSON.parse(extractedCodeStructure[1]) as CodeStructureType;
    this.thoughtsWhenComposing = extractedThoughtsWhenComposing[1].trim();
  }

  public getCodeStructure(): CodeStructureType {
    return this.codeStructure;
  }

  public getThoughtsWhenComposing(): string {
    return this.thoughtsWhenComposing;
  }
}

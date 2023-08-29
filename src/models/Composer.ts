import { ChatCompletion } from 'openai/resources/chat';
import { CodeStructureType } from '../types';

export class Composer {
  private codeStructure: CodeStructureType;

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

    this.codeStructure = JSON.parse(extractedCodeStructure[1]) as CodeStructureType;
  }

  public getCodeStructure(): CodeStructureType {
    return this.codeStructure;
  }
}

import { CodeStructureType } from "../types";

const codeStructureKeyName = 'codeStructure'

export const setCodeStructureToStorage = (response: CodeStructureType) => {
  sessionStorage.setItem(codeStructureKeyName, JSON.stringify(response));
}

export const getCodeStructureFromStorage = () => {
  return sessionStorage.getItem(codeStructureKeyName);
}

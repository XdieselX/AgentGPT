import type { TFunction } from "i18next";
import { Task } from "./agent";

export type ModelSettings = {
  customApiKey?: string;
  customModelName?: string;
  customTemperature?: number;
  customMaxLoops?: number;
  maxTokens?: number;
};

export type SettingModel = {
  settings: ModelSettings;
  saveSettings: (settings: ModelSettings) => void;
  resetSettings: () => void;
};

export type Goal = {
  name: string;
  description: string;
  tasks: Task[];
  completed: boolean;
  createdBy: string;
  createdOn: string;
  completedOn: string;
}

/*export type Task = {
  id: number;
  name: string;
  description: string;
  actions: Action[];
  result: string;
  approved: boolean;
  completed: boolean;
  createdBy: string;
  createdOn: string;
}
*/
export type Action = {
  id: number;
  name: string;
  description: string;
  operation: Command | Prompt;
  approved: boolean;
  completed: boolean;
  createdBy: string;
  createdOn: string;
}

export type Command = {
  name: string;
  args: string;
  body: string;
  result: string;
}

export type Prompt = {
  input: string;
  type: string;
  result: string;
}

export type Translation = TFunction<"translation", undefined>;
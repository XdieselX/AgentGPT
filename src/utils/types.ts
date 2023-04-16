import { OpenAIApi } from "openai";
import { Config } from "../hooks/useConfig";

export type ModelSettings = {
  customApiKey: string;
  customModelName: string;
  temperature: string;
  maxTokens: string;
};

export interface Goal{
  name: string;
  description: string;
  tasks: Task[];
  completed: boolean;
  createdBy: string;
  createdOn: string;
  completedOn: string;
}

export interface Task{
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

export interface Action{
  id: number;
  name: string;
  description: string;
  operation: Command | Prompt;
  approved: boolean;
  completed: boolean;
  createdBy: string;
  createdOn: string;
}

export interface Command{
  name: string;
  args: string;
  body: string;
  result: string;
}

export interface Prompt{
  input: string;
  type: string;
  result: string;
}

export interface Plugin {
  ID(): string;
  Name(): string;
  Example(): string;
  Prompt(): string;
  Description(): string;
  Execute(body: Record<string, any>): Promise<{ response: string; error: Error | null }>;
}

export interface Component {
  Load(config: Config, client: OpenAIApi | null): Promise<Error | null>;
  UpdateConfig(config: Config): void;
  ID(): string;
  Name(): string;
  Prompt(): string;
  Example(): string;
  Description(): string;
  Execute(args: string, body: string): Promise<{ response: string; error: Error | null }>;
  Types(): {name: string; description: string;}[];
}

export interface IntervalPrompt {
  IntervalPrompt(): string;
}

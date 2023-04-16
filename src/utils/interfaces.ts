import type { ModelSettings } from "./types";
import { OpenAIApi } from "openai";
import { Config } from "../hooks/useConfig";

export interface RequestBody {
  modelSettings: ModelSettings;
  goal: string;
  task?: string;//Task
  tasks?: string[];//Task[]
  lastTask?: string;
  result?: string;
  completedTasks?: string[];
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

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import type { ModelSettings } from "./types";
import { GPT_35_TURBO, tasksParser } from ".";

export const createModel = (settings: ModelSettings) =>
  new OpenAI({
    openAIApiKey:
      settings.customApiKey === ""
        ? process.env.OPENAI_API_KEY
        : settings.customApiKey,
    temperature: settings.customTemperature || 0.9,
    modelName:
      settings.customModelName === "" ? GPT_35_TURBO : settings.customModelName,
    maxTokens: settings.maxTokens === "" ? 1000 : Number(settings.maxTokens),
  });

const startGoalPrompt = new PromptTemplate({
  template:
    "You are an autonomous task creation AI called AgentGPT. You have the following objective `{goal}`. Create a list of zero to three tasks to be completed by your AI system such that your goal is more closely reached or completely reached. Return the response as an array of strings that can be used in JSON.parse()",
  inputVariables: ["goal"],
});
export const startGoalAgent = async (model: OpenAI, goal: string) => {
  return await new LLMChain({
    llm: model,
    prompt: startGoalPrompt,
  }).call({
    goal,
  });
};

const executeTaskPrompt = new PromptTemplate({
  template:
    "You are an autonomous task execution AI called AgentGPT. You have the following objective `{goal}`. You have the following tasks `{task}`. Execute the task and return the response as a string.",
  inputVariables: ["goal", "task"],
});
export const executeTaskAgent = async (
  model: OpenAI,
  goal: string,
  task: string
) => {
  return await new LLMChain({ llm: model, prompt: executeTaskPrompt }).call({
    goal,
    task,
  });
};

const createTaskPrompt = new PromptTemplate({
  template:
    "You are an AI task creation agent. You have the following objective `{goal}`. You have the following incomplete tasks `{tasks}` and have just executed the following task `{lastTask}` and received the following result `{result}`. Based on this, create a new task to be completed by your AI system ONLY IF NEEDED such that your goal is more closely reached or completely reached. Return the response as an array of strings that can be used in JSON.parse() and NOTHING ELSE",
  inputVariables: ["goal", "tasks", "lastTask", "result"],
});
export const executeCreateTaskAgent = async (
  model: OpenAI,
  goal: string,
  tasks: string[],
  lastTask: string,
  result: string
) => {
  return await new LLMChain({ llm: model, prompt: createTaskPrompt }).call({
    goal,
    tasks,
    lastTask,
    result,
  });
};

const PrioritizationTaskPrompt = new PromptTemplate({
  template:
    "You are a task prioritization AI tasked with cleaning the formatting of and repioritizing"+
    " the following task list: {tasks}." + 
    "Consider the ultimate goal:  {goal}."+
    "Do not remove any aks. Return the result as a numbered list, like:"+
    "#.First task:"+
    "#.Second task:"+
    "Start the task list with the most important task.",
  inputVariables: ["goal", "tasks"],
});

export const executePrioritizationAgent = async (
  model: OpenAI,
  goal: string,
  tasks: string[]
) => {
  return await new LLMChain({ llm: model, prompt: PrioritizationTaskPrompt }).call({
    goal,
    tasks,
  });
};

const executeChainPrompt = new PromptTemplate({
  template: "You are an AI who performs one task based on the following objective: {goal}."+
  "Take into account these previously completed task list: {context}."+
  "You are currently tasked with: {current_task}."+
  "Responds with how you would complete this task:",
  inputVariables: ["goal", "context", "current_task"],
});

export const executeChainAgent = async (
  model: OpenAI,
  goal: string,
  context: string[],
  current_task: string
) => {
  return await new LLMChain({ llm: model, prompt: executeChainPrompt }).call({
    goal,
    current_task,
    context,
  });
};

export const extractArray = (inputStr: string): string[] => {
  // Match an outer array of strings (including nested arrays)
  const regex = /(\[(?:\s*"(?:[^"\\]|\\.)*"\s*,?)+\s*\])/;
  const match = inputStr.match(regex);

  if (match && match[0]) {
    try {
      // Parse the matched string to get the array
      return JSON.parse(match[0]) as string[];
    } catch (error) {
      console.error("Error parsing the matched array:", error);
    }
  }

  console.warn("Error, could not extract array from inputString:", inputStr);
  return [];
};

// Model will return tasks such as "No tasks added". We should filter these
export const realTasksFilter = (input: string): boolean => {
  const noTaskRegex =
    /^No( (new|further|additional|extra|other))? tasks? (is )?(required|needed|added|created|inputted).*$/i;
  const taskCompleteRegex =
    /^Task (complete|completed|finished|done|over|success).*/i;
  const doNothingRegex = /^(\s*|Do nothing(\s.*)?)$/i;

  return (
    !noTaskRegex.test(input) &&
    !taskCompleteRegex.test(input) &&
    !doNothingRegex.test(input)
  );
};
import type { Session } from "next-auth";
import type { Message, ModelSettings } from ".";
import type { AxiosError } from "axios";
import axios from "axios";
import AgentService from "../services/agent-service";
import {
  DEFAULT_MAX_LOOPS_CUSTOM_API_KEY,
  DEFAULT_MAX_LOOPS_FREE,
  DEFAULT_MAX_LOOPS_PAID,
} from "../utils"
import { env } from "../env/client.mjs";
import { v4 } from "uuid";
import { RequestBody } from "../utils";

const TIMEOUT_LONG = 1000;
const TIMEOUT_SHORT = 800;

class AutonomousAgent {
  name: string;
  goal: string;
  tasks: string[] = [];
  completedTasks: string[] = [];
  modelSettings: ModelSettings;
  isRunning = true;
  renderMessage: (message: Message) => void;
  shutdown: () => void;
  numLoops = 0;
  session?: Session;
  _id: string;

  constructor(
    name: string,
    goal: string,
    renderMessage: (message: Message) => void,
    shutdown: () => void,
    modelSettings: ModelSettings,
    session?: Session
  ) {
    this._id = v4();
    this.name = name;
    this.goal = goal;
    this.renderMessage = renderMessage;
    this.shutdown = shutdown;
    this.modelSettings = modelSettings;
    this.session = session;
  }

  async run() {
    this.sendGoalMessage();
    this.sendThinkingMessage();

    // Initialize by getting tasks
    try {
      this.tasks = await this.getInitialTasks();
      for (const task of this.tasks) {
        await new Promise((r) => setTimeout(r, TIMEOUT_LONG));
        this.sendTaskMessage(task);
      }
    } catch (e) {
      console.log(e);
      this.sendErrorMessage(getMessageFromError(e));
      this.shutdown();
      return;
    }

    await this.loop();
  }

  async loop() {
    console.log(`Loop ${this.numLoops}`);
    console.log(this.tasks);

    if (!this.isRunning) {
      this.sendManualShutdownMessage();
      this.shutdown();
      return;
    }

    if (this.tasks.length === 0) {
      this.sendCompletedMessage();
      this.shutdown();
      return;
    }

    this.numLoops += 1;
    const maxLoops = this.maxLoops();
    if (this.numLoops > maxLoops) {
      this.sendLoopMessage();
      this.shutdown();
      return;
    }

    // Wait before starting
    await new Promise((r) => setTimeout(r, TIMEOUT_SHORT));

    // Execute first task
    // Get and remove first task
    this.completedTasks.push(this.tasks[0] || "");
    const currentTask = this.tasks.shift();
    this.sendThinkingMessage();

    const result = await this.executeTask(currentTask as string);
    this.sendExecutionMessage(currentTask as string, result);

    // Wait before adding tasks
    await new Promise((r) => setTimeout(r, TIMEOUT_SHORT));
    this.sendThinkingMessage();

    // Add new tasks
    try {
      const newTasks = await this.getAdditionalTasks(
        currentTask as string,
        result
      );
      this.tasks = this.tasks.concat(newTasks);
      for (const task of newTasks) {
        await new Promise((r) => setTimeout(r, TIMEOUT_SHORT));
        this.sendTaskMessage(task);
      }

      if (newTasks.length == 0) {
        this.sendActionMessage("Task marked as complete!");
      }
    } catch (e) {
      console.log(e);
      this.sendErrorMessage(
        `ERROR adding additional task(s). It might have been against our model's policies to run them. Continuing.`
      );
      this.sendActionMessage("Task marked as complete.");
    }

    await this.loop();
  }

  private maxLoops() {
    const defaultLoops = !!this.session?.user.subscriptionId ?
      DEFAULT_MAX_LOOPS_PAID : DEFAULT_MAX_LOOPS_FREE;
    return !!this.modelSettings.customApiKey ?
      DEFAULT_MAX_LOOPS_CUSTOM_API_KEY : defaultLoops;
  }

  async getInitialTasks(): Promise<string[]> {
    if (this.shouldRunClientSide()) {
      if(!env.NEXT_PUBLIC_FF_MOCK_MODE_ENABLED){
        await testConnection(this.modelSettings);
      }
      //await testConnection(this.modelSettings);
      return await AgentService.startGoalAgent(this.modelSettings, this.goal);
    }

    const data = {
      modelSettings: this.modelSettings,
      goal: this.goal,
    }
    const res = await this.post(`/api/start`, data);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    return res.data.newTasks as string[];
  }

  async getAdditionalTasks(
    currentTask: string,
    result: string
  ): Promise<string[]> {
    if (this.shouldRunClientSide()) {
      return await AgentService.createTasksAgent(
        this.modelSettings,
        this.goal,
        this.tasks,
        currentTask,
        result,
        this.completedTasks
      );
    }

    const data = {
      modelSettings: this.modelSettings,
      goal: this.goal,
      tasks: this.tasks,
      lastTask: currentTask,
      result: result,
      completedTasks: this.completedTasks,
    }

    const res = await this.post(`/api/create`, data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    return res.data.newTasks as string[];
  }

  async executeTask(task: string): Promise<string> {
    if (this.shouldRunClientSide()) {
      return await AgentService.executeTaskAgent(this.modelSettings, this.goal, task);
    }

    const res = await this.post(`/api/execute`, {
      modelSettings: this.modelSettings,
      goal: this.goal,
      task: task,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    return res.data.response as string;
  }

  private shouldRunClientSide() {
    return this.modelSettings.customApiKey != "";
  }

  stopAgent() {
    this.sendManualShutdownMessage();
    this.isRunning = false;
    this.shutdown();
    return;
  }

  sendMessage(message: Message) {
    if(this.isRunning) {
      this.renderMessage(message);
    }
  }

  sendGoalMessage() {
    this.renderMessage({ type: "goal", value: this.goal });
  }

  sendLoopMessage() {
    this.renderMessage({
      type: "system",
      value:
        this.modelSettings.customApiKey !== ""
          ? `This agent has maxed out on loops. To save your wallet, this agent is shutting down. You can configure the number of loops in the advanced settings.`
          : "We're sorry, because this is a demo, we cannot have our agents running for too long. Note, if you desire longer runs, please provide your own API key in Settings. Shutting down.",
    });
  }

  sendManualShutdownMessage() {
    this.renderMessage({
      type: "system",
      value: `The agent has been manually shutdown.`,
    });
  }

  sendCompletedMessage() {
    this.renderMessage({
      type: "system",
      value: "All tasks completed. Shutting down.",
    });
  }

  sendThinkingMessage() {
    this.renderMessage({ type: "thinking", value: "" });
  }

  sendTaskMessage(task: string) {
    this.renderMessage({ type: "task", value: task });
  }

  sendErrorMessage(error: string) {
    this.renderMessage({ type: "system", value: error });
  }

  sendExecutionMessage(task: string, execution: string) {
    this.renderMessage({
      type: "action",
      info: `Executing "${task}"`,
      value: execution,
    });
  }

  sendActionMessage(message: string) {
    this.renderMessage({
      type: "action",
      info: message,
      value: "",
    });
  }

  sendApprovalMessage(message: string) {
    this.renderMessage({
      type: "approval",
      info: message,
      value: "",
    });
  }

  private async post(url: string, data: RequestBody) {
    try {
      return await axios.post(url, data);
    } catch (e) {
      this.shutdown();

      if (axios.isAxiosError(e) && e.response?.status === 429) {
        this.sendErrorMessage("Rate limit exceeded. Please slow down. 😅");
      }

      throw e;
    }
  }
}

const testConnection = async (modelSettings: ModelSettings) => {
  // A dummy connection to see if the key is valid
  // Can't use LangChain / OpenAI libraries to test because they have retries in place
  const data = {
    model: modelSettings.customModelName,
    messages: [{ role: "user", content: "Say this is a test" }],
    max_tokens: 7,
    temperature: 0,
  }
  return await axios.post(
    "https://api.openai.com/v1/chat/completions",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${modelSettings.customApiKey}`,//might be a problem
      },
    }
  );
};

const getMessageFromError = (e: unknown) => {
  let message =
    "ERROR accessing OpenAI APIs. Please check your API key or try again later";
  if (axios.isAxiosError(e)) {
    const axiosError = e as AxiosError;
    if (axiosError.response?.status === 429) {
      message = `ERROR using your OpenAI API key. You've exceeded your current quota, please check your plan and billing details.`;
    }
    if (axiosError.response?.status === 404) {
      message = `ERROR your API key does not have GPT-4 access. You must first join OpenAI's wait-list. (This is different from ChatGPT Plus)`;
    }
  } else {
    message = `ERROR retrieving initial tasks array. Retry, make your goal more clear, or revise your goal such that it is within our model's policies to run. Shutting Down.`;
  }
  return message;
};



export default AutonomousAgent;

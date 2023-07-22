import { AgentLifecycle } from "../../../services/agent/agent-run-model";

export type AgentControlsProps = {
  disablePlay: boolean;
  lifecycle: AgentLifecycle;
  handlePlay: () => void;
  handlePause: () => void;
  handleStop: () => void;
};

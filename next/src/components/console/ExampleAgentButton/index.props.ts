export interface ExampleAgentButtonProps {
  name: string;
  children: string;
  setAgentRun?: (name: string, goal: string) => void;
}

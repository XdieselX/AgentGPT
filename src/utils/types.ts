export type ModelSettings = {
  customApiKey: string;
  customModelName: string;
  temperature: string;
};

interface Goal{
  name: string;
  description: string;
  tasks: Task[];
  completed: boolean;
  createdBy: string;
  createdOn: string;
  completedOn: string;
}

interface Task{
  id: number;
  name: string;
  description: string;
  result: string;
  approved: boolean;
  completed: boolean;
  createdBy: string;
  createdOn: string;
}
import type { Message, Task } from "../..";

export interface TaskWindowProps{
  visibleOnMobile: boolean;
};

export interface TaskProps{
  task: Task;
  index: number;
}

import React from "react";
import { FaListAlt } from "react-icons/fa";
import { 
  FadeIn, 
  Expand 
} from "../..";
import { 
  TaskProps, 
  TaskWindowProps 
} from "./index.props";

export const TaskWindow = (props: TaskWindowProps) => {
  const { tasks } = props;
  return (
    <Expand className="xl mx-2 mt-4 hidden w-[20rem] flex-col items-center rounded-2xl border-2 border-white/20 bg-zinc-900 px-1 font-mono shadow-2xl xl:flex">  
      <div className="sticky top-0 my-2 flex items-center justify-center gap-2 bg-zinc-900 p-2 text-gray-300">
        <FaListAlt /> Current tasks
      </div>
      <div className="window-heights mb-2 w-full px-1 ">
        <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
          {tasks.map((task, i) => (
            <Task key={i} task={task} />
          ))}
        </div>
      </div>
    </Expand>
  );
};

const Task = (props: TaskProps) => {
  const { task } = props;
  return (
    <FadeIn delay={1}>
      <div className="w-full rounded-md border-2 border-white/20 p-2 text-sm text-white hover:border-white/40">
        {task.value}//TODO - add the other properties
      </div>
    </FadeIn>
  );
};

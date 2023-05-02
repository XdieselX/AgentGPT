import React from "react";
import {
  TaskProps,
  TaskWindowProps
} from "./index.props";
import {
  FadeIn,
  Expand,
  Task,
  useMessageStore,
  useAgentStore,
  getMessageContainerStyle,
  getTaskStatusIcon
} from "../..";
import { FaListAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export const TaskWindow = () => {
  const tasks = useMessageStore.use.tasks();
  const [t] = useTranslation();
  return (
    <Expand className="xl mx-2 mt-4 hidden w-[20rem] flex-col items-center rounded-2xl border-2 border-white/20 bg-zinc-900 px-1 font-mono shadow-2xl xl:flex">
      <div className="sticky top-0 my-2 flex items-center justify-center gap-2 bg-zinc-900 p-2 text-gray-300">
        <FaListAlt /> {t("Current tasks")}
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
  const isAgentStopped = useAgentStore.use.isAgentStopped();
  return (
    <FadeIn>
      <div
        className={clsx(
          "w-full animate-[rotate] rounded-md border-2 p-2 text-xs text-white",
          isAgentStopped && "opacity-50",
          getMessageContainerStyle(task)
        )}
      >
        {getTaskStatusIcon(task, { isAgentStopped })}
        <span>{task.value}</span>//TODO - add the other properties
      </div>
    </FadeIn>
  );
};

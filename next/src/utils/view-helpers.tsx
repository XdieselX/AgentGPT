import {
  FaBrain,
  FaCircleNotch,
  FaRegCheckCircle,
  FaCheckCircle,
  FaStar,
  FaStopCircle,
  FaThumbtack,
} from "react-icons/fa";
import {
  TASK_STATUS_STARTED,
  TASK_STATUS_EXECUTING,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_FINAL,
  MESSAGE_TYPE_GOAL,
  MESSAGE_TYPE_THINKING,
  getTaskStatus,
} from "../components";

import type { Message } from "../components";

export const getTaskStatusIcon = (
  message: Message,
  config: { [key: string]: string | boolean | undefined }
) => {
  const taskStatusIconClass = "mr-1 mb-1 inline-block";
  const { isAgentStopped } = config;

  if (message.type === MESSAGE_TYPE_GOAL) {
    return (<FaStar className="text-yellow-300" />);
  } else if (message.type === MESSAGE_TYPE_THINKING) {
    return <FaBrain className="mt-[0.1em] text-pink-400" />;
  } else if (getTaskStatus(message) === TASK_STATUS_STARTED) {
    return <FaThumbtack className={`${taskStatusIconClass} -rotate-45`} />;
  } else if (getTaskStatus(message) === TASK_STATUS_EXECUTING) {
    return isAgentStopped ? (
      <FaStopCircle className={`${taskStatusIconClass}`} />
    ) : (
      <FaCircleNotch className={`${taskStatusIconClass} animate-spin`} />
    );
  } else if (getTaskStatus(message) === TASK_STATUS_COMPLETED) {
    return (
      <FaRegCheckCircle
        className={`${taskStatusIconClass} text-green-500 hover:text-green-400`}
      />
    );
  } else if (getTaskStatus(message) === TASK_STATUS_FINAL) {
    return (
      <FaCheckCircle
        className={`${taskStatusIconClass} text-green-500 hover:text-green-400`}
      />
    );
  }
};

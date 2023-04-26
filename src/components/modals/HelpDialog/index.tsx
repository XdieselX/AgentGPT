import React from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { Dialog } from "..";
import { HelpDialogProps } from "./index.props";

export function HelpDialog(props: HelpDialogProps) {
  const [t] = useTranslation();
  const { show, close } = props;
  return (
    <Dialog
      header={t("Welcome to AgentGPT 🤖")}
      isShown={show}
      close={close}
    >
      <div className="text-md relative flex-auto p-2 leading-relaxed">
        <p>
          <strong>AgentGPT</strong> {t(`allows you to configure and deploy
          Autonomous AI agents. Name your custom AI and have it embark on any
          goal imaginable. It will attempt to reach the goal by thinking of
          tasks to do, executing them, and learning from the results 🚀`)}
        </p>
        <div>
          <br />
          This platform is currently in beta, we are currently working on:
          <ul className="ml-5 list-inside list-disc">
            <li>{t("Long term memory 🧠")}</li>
            <li>{t("Web browsing 🌐")}</li>
            <li>{t("Interaction with websites and people 👨‍👩‍👦")}</li>
          </ul>
          <br />
          <p className="mt-2">{t("Follow the journey below:")}</p>
        </div>
        <div className="mt-4 flex w-full items-center justify-center gap-5">
          <div
            className="cursor-pointer rounded-full bg-black/30 p-3 hover:bg-black/70"
            onClick={() => window.open("", "_blank")}
          >
            <FaDiscord size={30} />
          </div>
          <div
            className="cursor-pointer rounded-full bg-black/30 p-3 hover:bg-black/70"
            onClick={() =>
              window.open("","_blank")
            }
          >
            <FaTwitter size={30} />
          </div>
          <div
            className="cursor-pointer rounded-full bg-black/30 p-3 hover:bg-black/70"
            onClick={() =>
              window.open("", "_blank")
            }
          >
            <FaGithub size={30} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

import { type NextPage, type GetStaticProps } from "next";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaRobot, FaStar, FaPlay, FaCog } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import DefaultLayout from "../layout/default";
import type { Message } from "../components";
import {
  Button,
  ChatWindow,
  Expand,
  Input,
  isTask,
  HelpDialog,
  TaskWindow,
  useMessageStore,
  useAgentStore,
  resetAllMessageSlices,
  FadeIn,
  AppTitle,
  SignInDialog,
  ToolsDialog
} from "../components";
import AutonomousAgent from "../components/AutonomousAgent";
import {
  isEmptyOrBlank,
  languages
} from "../utils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  useAgent,
  useSettings,
  useAuth
} from "../hooks";
import nextI18nextConfig from "../../next-i18next.config";
import { useRouter } from "next/router";
import { SidebarLayout } from "../layout";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const Home: NextPage = () => {
  const { i18n } = useTranslation();
  // zustand states with state dependencies
  const addMessage = useMessageStore.use.addMessage();
  const messages = useMessageStore.use.messages();
  const updateTaskStatus = useMessageStore.use.updateTaskStatus();
  const { query } = useRouter();

  const setAgent = useAgentStore.use.setAgent();
  const isAgentStopped = useAgentStore.use.isAgentStopped();
  const updateIsAgentStopped = useAgentStore.use.updateIsAgentStopped();

  const agent = useAgentStore.use.agent();

  const fullscreen = agent !== null;
  const { session, status } = useAuth();

  const nameInput = useAgentStore.use.nameInput();
  const setNameInput = useAgentStore.use.setNameInput();
  const goalInput = useAgentStore.use.goalInput();
  const setGoalInput = useAgentStore.use.setGoalInput();
  const [mobileVisibleWindow, setMobileVisibleWindow] = React.useState<"Chat" | "Tasks">("Chat");
  const { settings } = useSettings();

  const [showHelpDialog, setShowHelpDialog] = React.useState(false);
  const [showSignInDialog, setShowSignInDialog] = React.useState(false);
  const [showToolsDialog, setShowToolsDialog] = React.useState(false);
  const [hasSaved, setHasSaved] = React.useState(false);
  const agentUtils = useAgent();

  useEffect(() => {
    const key = "gptsmart-modal-opened-v0.2";//FIXME - Look out for these keys in on all projects.
    const savedModalData = localStorage.getItem(key);

    setTimeout(() => {
      if (savedModalData == null) {
        setShowHelpDialog(true);
      }
    }, 1800);

    localStorage.setItem(key, JSON.stringify(true));
  }, []);

  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef?.current?.focus();
  }, []);

  useEffect(() => {
    updateIsAgentStopped();
  }, [agent, updateIsAgentStopped]);



  const setAgentRun = (newName: string, newGoal: string) => {
    if (agent != null) {
      return;
    }

    setNameInput(newName);
    setGoalInput(newGoal);
    handleNewGoal(newName, newGoal);
  };

  const handleAddMessage = (message: Message) => {
    if (isTask(message))
      updateTaskStatus(message);
    addMessage(message);
  };

  const disableDeployAgent =
    agent != null || isEmptyOrBlank(nameInput) || isEmptyOrBlank(goalInput);

  const handleNewGoal = (name: string, goal: string) => {
    if (name.trim() === "" || goal.trim() === "") {
      return;
    }

    // Do not force login locally for people that don't have auth setup
    if (session === null) {
      setShowSignInDialog(true);
      return;
    }

    const newAgent = new AutonomousAgent(
      name.trim(),
      goal.trim(),
      handleAddMessage,
      () => setAgent(null),
      settings,
      session ?? undefined
    );
    setAgent(newAgent);
    setHasSaved(false);
    resetAllMessageSlices();
    newAgent?.run().then(console.log).catch(console.error);
  };

  const handleContinue = () => {
    if (!agent) {
      return;
    }

    agent.updateIsRunning(true);
    agent.run().then(console.log).catch(console.error);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    // Only Enter is pressed, execute the function
    if (e.key === "Enter" && !disableDeployAgent && !e.shiftKey) {
      handleNewGoal(nameInput, goalInput);
    }
  };

  const handleStopAgent = () => {
    agent?.stopAgent();
    updateIsAgentStopped();
  };

  const handleVisibleWindowClick = (visibleWindow: "Chat" | "Tasks") => {
    // This controls whether the ChatWindow or TaskWindow is visible on mobile
    setMobileVisibleWindow(visibleWindow);
  };

  const shouldShowSave =
    status === "authenticated" && isAgentStopped && messages.length && !hasSaved;

  const firstButton = (
    <Button
      ping={!disableDeployAgent}
      disabled={disableDeployAgent}
      onClick={() => handleNewGoal(nameInput, goalInput)}
    >
      {agent == null ? (
        i18n.t("BUTTON_DEPLOY_AGENT", { ns: "indexPage" })
      ) : (
        <>
          <VscLoading className="animate-spin" size={20} />
          <span className="ml-2">{i18n.t("RUNNING", { ns: "common" })}</span>
        </>
      )}
    </Button>
  );

  return (
    <SidebarLayout>
      <HelpDialog show={showHelpDialog} close={() => setShowHelpDialog(false)} />
      <ToolsDialog show={showToolsDialog} close={() => setShowToolsDialog(false)} />

      <SignInDialog show={showSignInDialog} close={() => setShowSignInDialog(false)} />
      <div id="content" className="flex min-h-screen w-full items-center justify-center">
        <div
          id="layout"
          className="flex h-screen w-full max-w-screen-xl flex-col items-center gap-1 p-2 sm:gap-3 sm:p-4"
        >
          {
            <AnimatePresence>
              {!fullscreen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "fit-content" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, type: "easeInOut" }}
                >
                  <AppTitle />
                </motion.div>
              )}
            </AnimatePresence>
          }
          <div>
            <Button
              className={clsx(
                "rounded-r-none py-0 text-sm sm:py-[0.25em] xl:hidden",
                mobileVisibleWindow == "Chat" ||
                  "border-2 border-white/20 bg-gradient-to-t from-sky-500 to-sky-600 hover:bg-gradient-to-t hover:from-sky-400 hover:to-sky-600"
              )}
              disabled={mobileVisibleWindow == "Chat"}
              onClick={() => handleVisibleWindowClick("Chat")}
            >
              Chat
            </Button>
            <Button
              className={clsx(
                "rounded-l-none py-0 text-sm sm:py-[0.25em] xl:hidden",
                mobileVisibleWindow == "Tasks" ||
                  "border-2 border-white/20 bg-gradient-to-t from-sky-500 to-sky-600 hover:bg-gradient-to-t hover:from-sky-400 hover:to-sky-600"
              )}
              disabled={mobileVisibleWindow == "Tasks"}
              onClick={() => handleVisibleWindowClick("Tasks")}
            >
              Tasks
            </Button>
          </div>
          <Expand className="flex w-full flex-grow overflow-hidden">
            <ChatWindow
              messages={messages}
              title={<ChatWindowTitle model={settings.customModelName} />}
              onSave={
                shouldShowSave
                  ? (format) => {
                      setHasSaved(true);
                      agentUtils.saveAgent({
                        goal: goalInput.trim(),
                        name: nameInput.trim(),
                        tasks: messages,
                      });
                    }
                  : undefined
              }
              scrollToBottom
              setAgentRun={setAgentRun}
              visibleOnMobile={mobileVisibleWindow === "Chat"}
            />
            <TaskWindow visibleOnMobile={mobileVisibleWindow === "Tasks"} />
          </Expand>

          <FadeIn
            delay={0}
            initialY={30}
            duration={1}
            className="flex w-full flex-col items-center gap-2"
          >
            <AnimatePresence>
              {!fullscreen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "fit-content" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, type: "easeInOut" }}
                  className="flex w-full flex-col gap-2"
                >
                  <div className="flex w-full flex-row items-end gap-2 md:items-center">
                    <Input
                      inputRef={nameInputRef}
                      left={
                        <>
                          <FaRobot />
                          <span className="ml-2">{`${i18n?.t("AGENT_NAME", {
                            ns: "indexPage",
                          })}`}</span>
                        </>
                      }
                      value={nameInput}
                      disabled={agent != null}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e)}
                      placeholder="AgentGPT"
                      type="text"
                    />
                    <Button
                      ping
                      onClick={() => setShowToolsDialog(true)}
                      className="border-white/20 bg-gradient-to-t from-sky-500 to-sky-600 transition-all hover:bg-gradient-to-t hover:from-sky-400 hover:to-sky-600"
                    >
                      <p className="mr-3">Tools</p>
                      <FaCog />
                    </Button>
                  </div>
                  <Input
                    left={
                      <>
                        <FaStar />
                        <span className="ml-2">{`${i18n?.t("LABEL_AGENT_GOAL", {
                          ns: "indexPage",
                        })}`}</span>
                      </>
                    }
                    disabled={agent != null}
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    placeholder={`${i18n?.t("PLACEHOLDER_AGENT_GOAL", {
                      ns: "indexPage",
                    })}`}
                    type="textarea"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              {firstButton}
              <Button
                disabled={agent === null}
                onClick={handleStopAgent}
                enabledClassName={"bg-red-600 hover:bg-red-400"}
              >
                {!isAgentStopped && agent === null ? (
                  <>
                    <VscLoading className="animate-spin" size={20} />
                    <span className="ml-2">{`${i18n?.t("BUTTON_STOPPING", {
                      ns: "indexPage",
                    })}`}</span>
                  </>
                ) : (
                  `${i18n?.t("BUTTON_STOP_AGENT", "BUTTON_STOP_AGENT", {
                    ns: "indexPage",
                  })}`
                )}
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </SidebarLayout>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18nextConfig.ns)),
    },
  };
};

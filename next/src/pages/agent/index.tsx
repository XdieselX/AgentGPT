import { type NextPage, type GetStaticProps } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaTrash, FaShare, FaBackspace } from "react-icons/fa";

import {
  languages,
  api
} from "../../utils";
import nextI18NextConfig from "../../../next-i18next.config";
import DefaultLayout from "../../layout/default";
import {
  Button,
  ChatWindow,
  Toast,
} from "../../components";
import type { Message } from "../../components";
import { env } from "../../env/client.mjs";
import { SidebarLayout } from "../../layout";

const AgentPage: NextPage = () => {
  const [ t ] = useTranslation();
  const [showCopied, setShowCopied] = useState(false);
  const router = useRouter();

  const agentId = typeof router.query.id === "string" ? router.query.id : "";

  const getAgent = api.agent.findById.useQuery(agentId, {
    enabled: router.isReady,
  });

  const deleteAgent = api.agent.deleteById.useMutation({
    onSuccess: () => {
      void router.push("/");
    },
  });

  const messages = getAgent.data ? (getAgent.data.tasks as Message[]) : [];

  const shareLink = () => {
    return encodeURI(`${env.NEXT_PUBLIC_VERCEL_URL as string}${router.asPath}`);
  };

  return (
    <SidebarLayout>
      <div
        id="content"
        className="flex h-screen w-full flex-col items-center justify-center gap-3 px-3 pt-7 md:px-10"
      >
        <ChatWindow
          messages={messages.filter((m) => m.type !== "thinking")}
          title={getAgent?.data?.name}
          visibleOnMobile
        />
        <div className="flex flex-row gap-2">
          <Button icon={<FaBackspace />} onClick={() => void router.push("/")}>
            Back
          </Button>
          <Button
            icon={<FaTrash />}
            onClick={() => {
              deleteAgent.mutate(agentId);
            }}
            enabledClassName={"bg-red-600 hover:bg-red-400"}
          >
            Delete
          </Button>

          <Button
            icon={<FaShare />}
            onClick={() => {
              void window.navigator.clipboard
                .writeText(shareLink())
                .then(() => setShowCopied(true));
            }}
            enabledClassName={"bg-green-600 hover:bg-green-400"}
          >
            Share
          </Button>
        </div>
        <Toast
          model={[showCopied, setShowCopied]}
          title={`${t("COPIED_TO_CLIPBOARD", { ns: "common" })}`}
          className="bg-gray-950 text-sm"
        />
      </div>
    </SidebarLayout>
  );
};

export default AgentPage;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18NextConfig.ns)),
    },
  };
};

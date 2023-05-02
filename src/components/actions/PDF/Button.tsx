import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { MESSAGE_TYPE_GOAL, MESSAGE_TYPE_TASK, WindowButton } from "../..";
import { FaSave } from "react-icons/fa";
import { pdf } from "@react-pdf/renderer";
import type { Message } from "../..";
import MyDocument from "./MyDocument";
import { PDFButtonProps } from "./index.props";

const IPDFButton = (props: PDFButtonProps) => {
  const { messages, name } = props;

  const textSections = getTextSections(messages);

  const downloadPDF = async () => {
    const blob = await pdf(<MyDocument textSections={textSections} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-document.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <WindowButton
        delay={0.2}
        onClick={() => {
          downloadPDF().catch(console.error);
        }}
        icon={<FaSave size={12} />}
        name={name}
      />
    </>
  );
};

const getTextSections = (messages: Message[]): string[] => {
  const [t] = useTranslation();

  // Note "Thinking" messages have no `value` so they show up as new lines
  return messages
    .map((message) => {
      if (message.type == MESSAGE_TYPE_GOAL) {
        return `${t("AGENT_GOAL", { ns: "indexPage" })}: ${message.value}`;
      }
      if (message.type == MESSAGE_TYPE_TASK) {
        if (message.info) {
          return `${t("EXECUTING", { ns: "common" })} "${message.value}": ${
            message.info
          }`;
        } else {
          return `${t("ADDING_TASK", { ns: "common" })}: ${message.value}`;
        }
      }
      return message.value;
    })
    .filter((message) => message !== "");
};

const PDFButton = memo(IPDFButton);

export {
  PDFButton
};

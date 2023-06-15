import React from "react";
import { useTranslation } from "next-i18next";
import * as htmlToImage from "html-to-image";
import {
  WindowButton,
  PDFButton,
  PopIn,
  Expand,
  Menu,
} from "../..";
import { FaClipboard, FaImage, FaSave } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { CgExport } from "react-icons/cg";
import type { HeaderProps } from "./index.props";

export const messageListId = "chat-window-message-list";

export const MacWindowHeader = (props: HeaderProps) => {
  const {
    messages,
    onSave,
    title
  } = props;
  const [t] = useTranslation();

  const saveElementAsImage = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    htmlToImage
      .toJpeg(element, {
        height: element.scrollHeight,
        style: {
          overflowY: "visible",
          maxHeight: "none",
          border: "none",
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "agent-gpt-output.png";
        link.click();
      })
      .catch(() =>
        alert("Error saving image! Note this doesn't work if the AI generated an image")
      );
  };

  const copyElementText = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    const text = element.innerText;

    if (navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    } else {
      // Fallback to a different method for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        console.log("Text copied to clipboard");
      } catch (err) {
        console.error("Unable to copy text to clipboard", err);
      }

      document.body.removeChild(textArea);
    }
  };

  const exportOptions = [
    <WindowButton
      key="Image"
      onClick={(): void => saveElementAsImage(messageListId)}
      icon={<FaImage size={12} />}
      name={`${t("IMAGE", { ns: "common" })}`}
    />,
    <WindowButton
      key="Copy"
      onClick={(): void => copyElementText(messageListId)}
      icon={<FaClipboard size={12} />}
      name={`${t("COPY", { ns: "common" })}`}
    />,
    <PDFButton key="PDF" name="PDF" messages={messages} />,
  ];

  return (
    <div className="flex items-center gap-1 overflow-visible rounded-t-3xl p-3">
      <PopIn delay={0.4}>
        <div className="h-3 w-3 rounded-full bg-red-500" />
      </PopIn>
      <PopIn delay={0.5}>
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
      </PopIn>
      <PopIn delay={0.6}>
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </PopIn>
      <Expand
        delay={0.75}
        className="flex flex-grow font-mono text-xs font-bold text-gray-500 sm:ml-2 sm:text-sm"
      >
        {title}
      </Expand>

      <AnimatePresence>
        {onSave && (
          <PopIn>
            <WindowButton
              ping
              key="Agent"
              onClick={() => onSave?.("db")}
              icon={<FaSave size={12} />}
              name={`${t("SAVE", { ns: "common" })}`}
              border
            />
          </PopIn>
        )}
      </AnimatePresence>

      <Menu icon={<CgExport size={15} />} items={exportOptions} />
    </div>
  );
};

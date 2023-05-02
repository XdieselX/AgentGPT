import type { Message } from "../..";

export interface MyDocumentProps {
  textSections: string[];
}

export interface PDFButtonProps {
  messages: Message[];
  name: string;
}

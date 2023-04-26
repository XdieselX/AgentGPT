import { ModelSettings } from "../../types";

export interface SettingsDialogProps {
  show: boolean;
  close: () => void;
  customSettings: [ModelSettings, (settings: ModelSettings) => void]
}

import { ModelSettings, SettingModel } from "../../types";

export interface SettingsDialogProps {
  show: boolean;
  close: () => void;
  customSettings: SettingModel
}

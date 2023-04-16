export interface SettingsDialogProps {
    show: boolean;
    close: () => void;
    customApiKey: string;
    setCustomApiKey: (key: string) => void;
    customModelName: string;
    setCustomModelName: (key: string) => void;
    temperature: string;
    setTemperature: (value: string) => void;
    maxTokens: string;
    setMaxTokens: (value: string) => void;
}
export type reactModelStates = {
    customApiKey: string;
    setCustomApiKey: (key: string) => void;
    customModelName: string;
    setCustomModelName: (key: string) => void;
    customTemperature: number;
    setCustomTemperature: (temperature: number) => void;
    customMaxLoops: number;
    setCustomMaxLoops: (numberOfLoops: number) => void;
    maxTokens: string;
    setMaxTokens: (maxTokens: string) => void;
}

export interface SettingsDialogProps {
    show: boolean;
    close: () => void;
    reactModelStates: reactModelStates;
}
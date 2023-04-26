export interface DialogProps {
    header: React.ReactNode;
    children: React.ReactNode;
    isShown: boolean;
    close: () => void;
    footerButton?: React.ReactNode;
    contentClassName?: string;
}

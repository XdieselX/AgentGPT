export interface DialogProps {
    header: React.ReactNode;
    children: React.ReactNode;
    isShown: boolean;
    close: () => void;
    footerButton?: React.ReactNode;
}

export interface DialogBackgroundProps{
  isShown: boolean;
  children: React.ReactNode;
  close: () => void;
}

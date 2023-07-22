export interface DialogProps {
    header: React.ReactNode;
    children: React.ReactNode;
    inline?: boolean;
    isShown: boolean;
    close: () => void;
    footerButton?: React.ReactNode;
}

export interface DialogBackgroundProps{
  isShown: boolean;
  children: React.ReactNode;
  close: () => void;
}

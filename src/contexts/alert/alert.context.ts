import { createContext, useContext } from "react";

export type DialogType = "newOperation" | "editOperation" | null;

export type AlertData = {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export type DialogContextValue = {
  isOpen: boolean;
  data: AlertData;
  showAlert: (data: Partial<AlertData>) => void
  closeAlert: () => void
};

export const DialogContext = createContext<DialogContextValue | undefined>(
  undefined,
);

export const useAlertContext = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }

  return context;
};

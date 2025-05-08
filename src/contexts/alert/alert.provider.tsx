import { useState, ReactNode } from "react";
import { DialogContext, AlertData } from "./alert.context";

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const default_alert_data = {
    title: "",
    description: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    onConfirm: () => {},
    onCancel: () => {},
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<AlertData>(default_alert_data);

  const showAlert = (data: Partial<AlertData>) => {
    setIsOpen(true);
    setData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const closeAlert = () => {
    setIsOpen(false);
    setData(default_alert_data)
  };

  return (
    <DialogContext.Provider value={{ isOpen, data, showAlert, closeAlert }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider

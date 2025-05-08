import { AlertData, useAlertContext } from "../../contexts/alert";

type UseAlertHook = {
  showAlert: (data: Partial<AlertData>) => void;
};

const useAlert = (): UseAlertHook => {
  const { showAlert } = useAlertContext();

  return {
    showAlert
  };
};

export default useAlert;

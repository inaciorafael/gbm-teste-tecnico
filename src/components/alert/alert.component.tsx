// NOTE: Componente usando context que pode ser invocado de forma programatica. // showAlert({...alertProps})
import React from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

import { useAlertContext } from "../../contexts/alert";

const Alert: React.FC = () => {
  const { isOpen, data, closeAlert } = useAlertContext();

  const handleCancelAlert = () => {
    if (data.onCancel) {
      data.onCancel();
      return;
    }

    closeAlert();
  };

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{data.title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button onClick={handleCancelAlert} variant="soft" color="gray">
              {data.cancelText}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={data.onConfirm} variant="solid" color="red">
              {data.confirmText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Alert;

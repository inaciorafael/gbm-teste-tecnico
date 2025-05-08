import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Button, Flex } from "@radix-ui/themes";
import toast from "react-hot-toast";

import { TextArea, Select } from "../../components";
import {
  AddOperationDialogProps,
  OperationNormalizer,
  terminalOptions,
  typeOptions,
} from "./add_operation_dialog.model.ts";
import OperationsService from "../../services/operations/operations.service";
import { FormData } from "./add_operation_dialog.schema";
import {
  OperationTerminal,
  OperationType,
} from "../../services/operations/operations.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./add_operation_dialog.schema";

const AddOperationDialog: React.FC<AddOperationDialogProps> = ({
  data = null,
  isOpen = false,
  onClose = () => {},
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isValid },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      type: "",
      terminal: "",
    },
    resolver: zodResolver(schema),
  });

  const handleAddNewOperation = (form: FormData) => {
    const operation = new OperationNormalizer({
      ...form,
      type: form.type as OperationType,
      terminal: form.terminal as OperationTerminal,
    }).getNewOperation();

    toast.promise(OperationsService().postOperation(operation), {
      loading: "Salvando...",
      success: "Operação criada com sucesso",
      error: "Não foi possível executar a ação",
    });
  };

  const handleUpdateOperation = (form: FormData) => {
    if (data) {
      toast.promise(
        OperationsService().patchOperation({
          ...form,
          id: data.id,
          type: form.type as OperationType,
          terminal: form.terminal as OperationTerminal,
        }),
        {
          loading: "Salvando...",
          success: "Operação atualizada com sucesso!",
          error: "Não foi possível executar a ação",
        },
      );
    }
  };

  const handleFillForm = () => {
    if (data) {
      clearErrors();
      setValue("terminal", data.terminal);
      setValue("type", data.type);
      setValue("title", data.title);
    }
  };

  useEffect(() => {
    if (data) {
      handleFillForm();
    } else {
      reset();
    }
  }, [data]);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Nova operação</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Preencha os campos abaixo para criar uma nova operação de terminal.
        </Dialog.Description>

        <Flex direction="column" gap="3" pb="3">
          <TextArea
            label="Descrição da operação"
            placeholder="Digite a descrição aqui"
            control={control}
            name="title"
          />
          <Select
            options={typeOptions}
            control={control}
            name="type"
            label="Tipo"
          />
          <Select
            options={terminalOptions}
            control={control}
            name="terminal"
            label="Terminal"
          />
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button onClick={onClose} variant="soft" color="gray">
              Cancelar
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              disabled={!isValid}
              onClick={handleSubmit(
                data ? handleUpdateOperation : handleAddNewOperation,
              )}
            >
              {data ? "Atualizar operação" : "Criar operação"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddOperationDialog;

import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { Table, IconButton, Button } from "@radix-ui/themes";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import {
  ErrorBoundary,
  Status,
  AddOperationDialog,
  OperationCard,
  Select,
} from "../../../components";
import pipe, { format_empty, truncate } from "../../../utils/pipes";
import {
  Operation,
  OperationStatusEnum,
  OperationType,
} from "../../../services/operations/operations.model";
import OperationsService from "../../../services/operations/operations.service";
import { Form } from "./operations.model";
import { useBreakpoint } from "../../../hooks";
import { typeOptions } from "../../../components/add_operation_dialog";

const Operations: React.FC = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [selectedOpetarion, setSelectedOperation] = useState<Operation | null>(
    null,
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const { isMobile } = useBreakpoint();
  const { control, watch, reset } = useForm<Form>({
    defaultValues: {
      status: "" as OperationStatusEnum,
      type: "" as OperationType,
    },
  });

  const watchStatus = watch("status");
  const watchType = watch("type");

  useEffect(() => {
    getOperations();
  }, []);

  const getFilteredOperations = (): Operation[] => {
    if (!watchStatus && !watchType) {
      return operations;
    }

    return operations.filter((operation: Operation) => {
      const statusMatch = watchStatus
        ? operation.status.toLowerCase().includes(watchStatus.toLowerCase())
        : true;

      const typeMatch = watchType
        ? operation.type.toLowerCase().includes(watchType.toLowerCase())
        : true;

      return statusMatch && typeMatch;
    });
  };

  const getOperations = (): void => {
    OperationsService()
      .getOperations()
      .then((response) => {
        if (response.status === 200) {
          setOperations(response.data);
        }
      });
  };

  const handleDeleteOperation = (operationId: string): void => {
    toast.promise(OperationsService().deleteOperation(operationId), {
      loading: "Removendo operação...",
      success: "Operação removida com sucesso!",
      error: "Houve um erro ao remover a operação...",
    });
  };

  const handleMarkOperationHasCompleted = (operation: Operation): void => {
    toast.promise(
      OperationsService().patchOperation({
        id: operation.id,
        status: OperationStatusEnum.finalizada,
        finalizedAt: dayjs().toISOString(),
      }),
      {
        loading: "Finalizando operação",
        success: "Operação finalizada com sucesso!",
        error: "Houve um erro ao finalizar a operação...",
      },
    );
  };

  const handleOpenCreateOperationDialog = (): void => {
    setSelectedOperation(null);
    setIsEditDialogOpen(true);
  };

  const handleEditOperation = (operation: Operation): void => {
    setSelectedOperation(operation);
    setIsEditDialogOpen(true);
  };

  const handleClearFilters = (): void => {
    reset();
  };

  return (
    <div className="flex flex-col gap-10">
      <span className="text-2xl">Operações</span>

      <ErrorBoundary>
        <div className="flex flex-col gap-3 md:flex-row items-end justify-between">
          <div className="flex gap-3 flex-col md:w-[60%] w-full md:flex-row items-end">
            <Select
              label="Status"
              control={control}
              name="status"
              options={[
                {
                  label: "Pendente",
                  value: OperationStatusEnum.pendente,
                },
                { label: "Finalizada", value: OperationStatusEnum.finalizada },
              ]}
            />

            <Select
              label="Tipo"
              control={control}
              name="type"
              options={typeOptions}
            />

            <Button color="red" onClick={handleClearFilters} size="2">
              <MdClear />
              Limpar filtros
            </Button>
          </div>

          <Button
            style={{ width: isMobile ? "100%" : "auto" }}
            onClick={handleOpenCreateOperationDialog}
          >
            <FaPlus /> Adicionar nova operação
          </Button>
          <AddOperationDialog
            isOpen={isEditDialogOpen}
            data={selectedOpetarion}
            onClose={() => setIsEditDialogOpen(false)}
          />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        {operations.length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <span className="text-gray-400">
              Não existem operações para gerenciar
            </span>
          </div>
        ) : null}

        {getFilteredOperations().length > 0 ? (
          <>
            {isMobile ? (
              getFilteredOperations().map((operation: Operation) => (
                  <React.Fragment key={operation.id}>
                    <OperationCard
                      onEditOperation={(selectedOperation: Operation) =>
                        handleEditOperation(selectedOperation)
                      }
                      operation={operation}
                    />
                  </React.Fragment>
              ))
            ) : (
              <Table.Root>
                <Table.Header className="bg-orange-200">
                  <Table.Row>
                    <Table.ColumnHeaderCell className="text-orange-500">
                      Descrição da Carga
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-orange-500">
                      Tipo
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-orange-500">
                      Terminal
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-orange-500">
                      Status
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-orange-500">
                      Data de Criação
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-orange-500">
                      Data de Finalização
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-orange-500">
                      Ações
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {getFilteredOperations().map((operation: Operation) => (
                    <Table.Row key={operation.id}>
                      <Table.Cell>
                        {pipe(operation.title, format_empty, truncate(50))}
                      </Table.Cell>
                      <Table.Cell>
                        {pipe(operation.type, format_empty)}
                      </Table.Cell>
                      <Table.Cell>
                        {pipe(operation.terminal, format_empty)}
                      </Table.Cell>
                      <Table.Cell>
                        <Status status={operation.status} />
                      </Table.Cell>
                      <Table.Cell>
                        {pipe(
                          dayjs(operation.createdAt).format("DD/MM/YYYY"),
                          format_empty,
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {pipe(
                          dayjs(operation.finalizedAt).format("DD/MM/YYYY"),
                          format_empty,
                        )}
                      </Table.Cell>
                      <Table.Cell className="flex flex-row items-center gap-3">
                        <IconButton
                          onClick={() => handleEditOperation(operation)}
                        >
                          <LuPencil />
                        </IconButton>

                        <IconButton
                          onClick={() => handleDeleteOperation(operation.id)}
                          color="tomato"
                        >
                          <FaTrashCan />
                        </IconButton>

                        {operation.status === "Pendente" ? (
                          <IconButton
                            onClick={() =>
                              handleMarkOperationHasCompleted(operation)
                            }
                            color="green"
                          >
                            <FaCheck />
                          </IconButton>
                        ) : null}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </>
        ) : null}
      </ErrorBoundary>
    </div>
  );
};

export default Operations;

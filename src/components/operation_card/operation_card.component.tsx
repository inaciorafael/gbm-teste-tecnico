import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { IconButton } from "@radix-ui/themes";

import { OperationCardProps } from "./operation_card.model.ts";
import pipe, { truncate, format_empty } from "../../utils/pipes";
import Status from "../status";
import dayjs from "dayjs";
import OperationsService from "../../services/operations/operations.service";
import {
  Operation,
  OperationStatusEnum,
} from "../../services/operations/operations.model";

const OperationCard: React.FC<OperationCardProps> = ({ operation, onEditOperation }) => {
  const handleDeleteOperation = (operationId: string) => {
    OperationsService().deleteOperation(operationId);
  };

  const handleMarkOperationHasCompleted = (operation: Operation) => {
    OperationsService().patchOperation({
      id: operation.id,
      status: OperationStatusEnum.finalizada,
      finalizedAt: dayjs().toISOString(),
    });
  };

  const handleEditOperation = () => {
    onEditOperation(operation)
  }

  return (
    <div className="p-3 flex flex-col gap-3 bg-white rounded-xl">
      <span className="font-[500] text-xl text-md">
        {pipe(operation.title, truncate(50), format_empty)}
      </span>
      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col">
          <span className="font-[500]">Tipo</span>
          <span>{operation.type}</span>
        </div>

        <div className="flex w-1/2 flex-col">
          <span className="font-[500]">Terminal</span>
          <span>{operation.terminal}</span>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col">
          <span className="font-[500]">Data de criação</span>
          <span>
            {pipe(
              dayjs(operation.createdAt).format("DD/MM/YYYY"),
              format_empty,
            )}
          </span>
        </div>

        <div className="flex w-1/2 flex-col">
          <span className="font-[500]">Data de Finalização </span>
          <span>
            {pipe(
              dayjs(operation.finalizedAt).format("DD/MM/YYYY"),
              format_empty,
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex w-1/3 flex-col">
          <span className="font-[500]">Status</span>
          <Status status={operation.status} />
        </div>
      </div>

      <div className="flex gap-5 flex-row">
        <IconButton onClick={() => handleEditOperation(operation)}>
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
            onClick={() => handleMarkOperationHasCompleted(operation)}
            color="green"
          >
            <FaCheck />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
};

export default OperationCard;

import { OperationStatusEnum, OperationType } from "../../../services/operations/operations.model";

export type Form = {
  status: OperationStatusEnum
  type: OperationType
};

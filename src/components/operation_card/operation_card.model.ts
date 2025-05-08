import { Operation } from "../../services/operations/operations.model";

export interface OperationCardProps {
  operation: Operation;
  onEditOperation: (operation: Operation) => void;
}

export enum OperationStatusEnum {
  pendente = "Pendente",
  finalizada = "Finalizada",
}
export type OperationStatus = "Pendente" | "Finalizada";
export type OperationType = "Embarque" | "Descarga";
export type OperationTerminal =
  | "Terminal Norte"
  | "Terminal Sul"
  | "Terminal Leste"
  | "Terminal Oeste"
  | "Terminal Central";

export type Operation = {
  id: string;
  title: string;
  type: OperationType;
  terminal: OperationTerminal;
  status: OperationStatus;
  createdAt: string;
  finalizedAt: string | null;
  views: number;
};

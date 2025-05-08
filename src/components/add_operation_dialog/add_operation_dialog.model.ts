import { v4 as uuid } from "uuid";
import {
  Operation,
  OperationStatusEnum,
  OperationTerminal,
  OperationType,
} from "../../services/operations/operations.model";
import dayjs from "dayjs";
import { SelectOption } from "../select/select.model";

export interface AddOperationDialogProps {
  data: Operation | null;
  isOpen: boolean;
  onClose: () => void;
}

export type Form = {
  title: string;
  type: OperationType;
  terminal: OperationTerminal;
};

export class OperationNormalizer {
  form!: Form;

  constructor(form: Form) {
    this.form = form;
  }

  getNewOperation(): Operation {
    return {
      id: uuid(),
      title: this.form.title,
      type: this.form.type,
      terminal: this.form.terminal,
      status: OperationStatusEnum.pendente,
      createdAt: dayjs().toISOString(),
      finalizedAt: null,
      views: 0,
    };
  }
}

export const typeOptions: SelectOption[] = [
  {
    label: "Embarque",
    value: "Embarque",
  },
  {
    label: "Descarga",
    value: "Descarga",
  },
];

export const terminalOptions: SelectOption[] = [
  { label: "Terminal Norte", value: "Terminal Norte" },
  { label: "Terminal Sul", value: "Terminal Sul" },
  { label: "Terminal Leste", value: "Terminal Leste" },
  { label: "Terminal Oeste", value: "Terminal Oeste" },
  { label: "Terminal Central", value: "Terminal Central" },
];

import React from "react";

import { StatusProps } from "./status.model.ts";
import { OperationStatus } from "../../services/operations/operations.model";

const statusStyles: { [key in OperationStatus]: string } = {
  Pendente: "bg-yellow-300 text-yellow-700",
  Finalizada: "bg-green-300 text-green-700",
};

const Status: React.FC<StatusProps> = ({ status = "Pendente" }) => {
  return (
    <div
      className={`${statusStyles[status]} flex items-center justify-center rounded-full font-[400]`}
    >
      <span>{status}</span>
    </div>
  );
};

export default Status;

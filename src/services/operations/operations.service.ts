import { AxiosResponse } from "axios";

import api from "../api";
import { Operation } from "./operations.model";

const OperationsService = () => {
  const baseEndpoint = "operations";

  const getOperations = async (): Promise<AxiosResponse<Operation[]>> =>
    await api.get(baseEndpoint);

  const deleteOperation = async (operationId: string): Promise<AxiosResponse> =>
    await api.delete(`${baseEndpoint}/${operationId}`);

  const patchOperation = async (
    operation: Partial<Operation> & { id: string },
  ): Promise<AxiosResponse> =>
    await api.patch(`${baseEndpoint}/${operation.id}`, operation);

  const postOperation = async (operation: Operation) =>
    await api.post(baseEndpoint, operation);

  return {
    getOperations,
    deleteOperation,
    patchOperation,
    postOperation,
  };
};

export default OperationsService;

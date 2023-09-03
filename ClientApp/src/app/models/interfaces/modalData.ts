import {Check} from "./check";

export interface IAddCheckComponentData {
  recipients: Set<string>;
  isEditMode: boolean;
  check: Check;
}

export interface IConfirmDeleteComponentData {
  serviceName: string;
  deleteId: number;
  successMessage: string;
  path: string;
}

import { Control } from "react-hook-form";

export type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps {
  control: Control<any>;
  name: string;
  label: string;
  options: SelectOption[]
}

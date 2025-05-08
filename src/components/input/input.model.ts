import React from "react";
import { Control } from "react-hook-form";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  placeholder?: string;
  control: Control<any>;
  name: string;
}

import React from "react";

import { ButtonProps } from "./button.model.ts";

const Button: React.FC<ButtonProps> = ({ title = "", onClick }) => {
  return (
    <button onClick={onClick} className="bg-purple-500 hover:bg-purple-600 transition-all px-3 py-1 font-semibold text-white">
      <span>{title}</span>
    </button>
  );
};

export default Button;

import React from "react";

import { ExampleProps } from "./example.model.ts";
import "./example.styles.css";

const Example: React.FC<ExampleProps> = ({}) => {
  return (
    <div className="example-container">
      <span>
        Adicione novas rotas em{" "}
        <code className="bg-gray-200 px-2 rounded">app.routes.ts</code>
      </span>
    </div>
  );
};

export default Example;

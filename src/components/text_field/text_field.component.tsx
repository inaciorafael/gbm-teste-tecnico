import React from 'react';

import { TextFieldProps } from './text_field.model.ts'
import './text_field.styles.css';

const TextField: React.FC<TextFieldProps> = ({}) => {
  return (
    <div className="text_field-container">
      <h1>text_field works!</h1>
    </div>
  );
};

export default TextField;

import React from 'react';

import { DialogProps } from './dialog.model.ts'
import './dialog.styles.css';

const Dialog: React.FC<DialogProps> = ({}) => {
  return (
    <div className="dialog-container">
      <h1>dialog works!</h1>
    </div>
  );
};

export default Dialog;

import React, { FC } from 'react';
import './Form.scss';

interface FormProps {}

const Form: FC<FormProps> = () => (
  <div className="Form" data-testid="Form">
    Form Component
  </div>
);

export default Form;

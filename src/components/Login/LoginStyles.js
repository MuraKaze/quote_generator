// LoginStyles.js

import styled from 'styled-components';

export const FormContainer = styled.form`
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  margin: 0 auto;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
`;

export const CheckboxLabel = styled.label`
  display: inline-block;
  margin-bottom: 10px;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

export const SubmitButton = styled.input`
  margin-left: 10px;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

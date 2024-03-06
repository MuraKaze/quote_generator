import styled from 'styled-components';

export const Form = styled.form`
  color: #fff;
`;

export const Input = styled.input`
  background-color: #333;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  background-color: #333;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Option = styled.option`
  background-color: #333;
  color: #fff;
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
`;

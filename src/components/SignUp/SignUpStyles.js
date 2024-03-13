import styled from 'styled-components';

export const Form = styled.form`
  color: #fff;
`;

export const Input = styled.input`
  background-color: #fff;
  color: #333;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin: 10px auto;
  width: 100%; /* Make the input full width */

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  background-color: #fff;
  color: #333;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%; /* Make the select full width */

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Option = styled.option`
  background-color: #fff;
  color: #333;
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
`;

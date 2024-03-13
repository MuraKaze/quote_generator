import styled from 'styled-components';

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  min-width: 20vh;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const QuoteContainer = styled.div`
  margin-bottom: 20px;
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

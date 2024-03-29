import styled from 'styled-components';

export const WelcomeContainer = styled.div`
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  height: 100vh; /* Set height to full viewport height */
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 10px; /* Add margin to separate buttons */
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


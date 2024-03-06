import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 20px;
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const BackButton = styled.button`
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e2e6ea;
  }
`;

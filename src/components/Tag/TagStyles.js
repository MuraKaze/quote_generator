import styled from 'styled-components';

export const TagButton = styled.button`
  background-color: ${({ following }) => (following ? '#FF6347' : '#007bff')};;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  width: 90px;
`;

// CommentStyles.js

import styled from 'styled-components';

export const CommentContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid #f3f3f3;
`;

export const CommentTextBlock = styled.div`
  display: flex;
`;

export const CommentText = styled.div`
  margin-bottom: 5px;
  margin-right: 5px;
  &.user {
    color: #dc3545;
  }
`;

export const ReactionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: #dc3545;
  cursor: pointer;

  &:hover {
    color: #bd2130;
  }
`;

import styled from 'styled-components';

export const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthorName = styled.p`
  margin-right: 10px;
`;

export const FollowButton = styled.button`
  background-color: #007bff; /* Blue background color */
  color: #fff; /* White text color */
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

export const CommentInput = styled.input`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
`;

export const QuoteItem = styled.div`
  background-color: #444;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const TagsContainer = styled.div`
  margin-top: 10px;

  button {
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }
  }
`;

export const ActionButton = styled.button`
  background-color: transparent;
  color: #007bff;
  border: none;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    color: #0056b3;
  }
`;

export const CommentInputContainer = styled.div`
  position: absolute;
  background-color: #333; /* Dark background color */
  color: #fff; /* Light text color */
  border: 1px solid #666; /* Dark border color */
  border-radius: 4px;
  padding: 10px;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: 999; /* Ensure the container is above other UI elements */
`;

CommentInputContainer.shouldForwardProp = prop => prop !== 'top' && prop !== 'left' && prop !== 'className';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, dislikeComment, likeComment } from '../../redux/reducers/quotesReducer';
import { CommentContainer, CommentTextBlock, CommentText, ReactionButton, RemoveButton } from './CommentStyles';

export default function Comment({ comment, quoteId, userId, setLoading }) {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch();

  const handleCommentReaction = async (quoteId, commentId, reaction) => {
    if (reaction === 'like') dispatch(likeComment({ quoteId, userId, commentId }));
    if (reaction === 'dislike') dispatch(dislikeComment({ quoteId, userId, commentId }));
    setLoading !== null ?? setLoading(true);
  };

  const handleRemoveComment = (quoteId, commentId) => {
    dispatch(deleteComment({ quoteId, commentId, userId }));
    setLoading !== null ?? setLoading(true);
  }

  const findUser = (userId) => {
    return users.find(user => user.id === userId).userName
  }

  return (
    <CommentContainer>
      <CommentTextBlock>
        <CommentText className='user'>{findUser(userId)}:</CommentText><CommentText>{comment.text}</CommentText>
      </CommentTextBlock>
      <div>
        <ReactionButton onClick={() => handleCommentReaction(quoteId, comment.id, 'like')}>
          <FontAwesomeIcon icon={faThumbsUp} /> {comment.likedBy.length}
        </ReactionButton>
        <ReactionButton onClick={() => handleCommentReaction(quoteId, comment.id, 'dislike')}>
          <FontAwesomeIcon icon={faThumbsDown} /> {comment.dislikedBy.length}
        </ReactionButton>
        <RemoveButton onClick={() => handleRemoveComment(quoteId, comment.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </RemoveButton>
      </div>
    </CommentContainer>
  );
}

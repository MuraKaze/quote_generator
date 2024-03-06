import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, dislikeQuote, likeQuote } from '../../redux/reducers/quotesReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import { QuoteItem, ActionButton, CommentInput, CommentInputContainer, TagsContainer } from './QuoteStyles';
import Comment from '../Comment';

export default function Quote({ quote, userId }) {

  const dispatch = useDispatch()
  const commentInputRef = useRef();
  const [visibility, setVisibility] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const toggleInputVisibility = () => {
    const button = commentInputRef.current;
    if (button) {
      const { offsetTop, offsetLeft, offsetHeight } = button;
      setButtonPosition({ top: offsetTop + offsetHeight, left: offsetLeft });
      setVisibility(prevState => !prevState);
    }
  };

  const handleAddComment = (quoteId, text) => {
    dispatch(addComment({ quoteId, userId, comment: text }))
    setNewComment('')
  };

  const formatDateTime = (dateTime) => {
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(dateTime).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleLike = (quoteId) => {
    dispatch(likeQuote({ quoteId, userId }));
  };

  const handleDislike = (quoteId) => {
    dispatch(dislikeQuote({ quoteId, userId }));
  };

  return (
    <QuoteItem key={quote.id}>
      <p>Author: {quote.author}</p>
      <p>Quote: {quote.text}</p>
      <p>Created Date: {formatDateTime(quote.createdDate)}</p>
      <TagsContainer>
        Tags:
        {quote.tags.map((tag, index) => (
          <button key={index}>{tag}</button>
        ))}
      </TagsContainer>
      <div>
        <ActionButton onClick={() => handleLike(quote.id)}>
          <FontAwesomeIcon icon={faThumbsUp} /> {quote.likedBy.length}
        </ActionButton>
        <ActionButton onClick={() => handleDislike(quote.id)}>
          <FontAwesomeIcon icon={faThumbsDown} /> {quote.dislikedBy.length}
        </ActionButton>
        <ActionButton ref={commentInputRef} onClick={() => toggleInputVisibility()}>
          <FontAwesomeIcon icon={faComment} /> {quote.comments.length}
        </ActionButton>
        {visibility && (
          <CommentInputContainer top={buttonPosition.top} left={buttonPosition.left}>
            <CommentInput type='text' placeholder='Add a comment...' value={newComment} onChange={e => setNewComment(e.target.value)} />
            <ActionButton onClick={() => handleAddComment(quote.id, newComment)}>Submit</ActionButton>
            {
              quote.comments.map((comment, index) => (
                <Comment key={index} comment={comment} quoteId={quote.id} userId={userId} setLoading={null}/>
              ))
            }
          </CommentInputContainer>
        )}
      </div>
    </QuoteItem>
  )
}

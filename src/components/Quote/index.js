import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, changeQuoteReaction } from '../../redux/reducers/quotesReducer';
import { followTag, followUser } from '../../redux/reducers/followReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import { AuthorContainer, AuthorName, FollowButton, QuoteItem, ActionButton, CommentInput, CommentInputContainer, TagsContainer } from './QuoteStyles';
import Comment from '../Comment';
import { setQuote } from '../../redux/reducers/quoteReducer';
import Tag from '../Tag';

export default function Quote({ quote, userId }) {

  const dispatch = useDispatch()
  const commentInputRef = useRef();
  const [visibility, setVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const quotes = useSelector(state => state.quotes)
  const followUsers = useSelector(state => state.follow).users

  useEffect(() => {
    if (loading) {
      dispatch(setQuote(quotes.find(updatedQuote => updatedQuote.id === quote.id)))
      setLoading(false)
    }
  }, [dispatch, loading, quote.id, quotes])

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
    setLoading(true); // Set loading to true when adding a comment
    setNewComment('')
  };

  const formatDateTime = (dateTime) => {
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(dateTime).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleReaction = (quoteId, reaction) => {
    dispatch(changeQuoteReaction({quoteId, userId, reaction}))
  };

  const handleFollowTag = (userId, tag) => {
    dispatch(followTag({ userId, tag }))
    setLoading(true)
  }

  const checkFollowForAuthor = () => {
    return followUsers.findIndex(entry => entry.follower === userId && entry.following === quote.author) !== -1;
  }

  const handleFollowUser = () => {
    dispatch(followUser({followerId: userId, followingId: quote.author}))
    setLoading(false)
  }

  return (
    <QuoteItem key={quote.id}>
      <AuthorContainer>
        <AuthorName>Author: {quote.author}</AuthorName>
        <FollowButton onClick={() => handleFollowUser()}>{checkFollowForAuthor() ? 'UnFollow' : 'Follow'}</FollowButton>
      </AuthorContainer>
      <p>Quote: {quote.text}</p>
      <p>Created Date: {formatDateTime(quote.createdDate)}</p>
      <TagsContainer>
        Tags:
        {quote.tags.map((tag, index) => (
          <Tag userId={userId} tag={tag} handleFollowTag={handleFollowTag}/>
        ))}
      </TagsContainer>
      <div>
        <ActionButton onClick={() => handleReaction(quote.id, 'like')}>
          <FontAwesomeIcon icon={faThumbsUp} /> {quote.likedBy.length}
        </ActionButton>
        <ActionButton onClick={() => handleReaction(quote.id, 'dislike')}>
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
                <Comment key={index} comment={comment} quoteId={quote.id} userId={userId} setLoading={setLoading}/>
              ))
            }
          </CommentInputContainer>
        )}
      </div>
    </QuoteItem>
  )
}

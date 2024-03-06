import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { addComment, dislikeQuote, likeQuote } from '../../redux/reducers/quotesReducer';
import { setQuote } from '../../redux/reducers/quoteReducer';
import Comment from '../Comment';
import {
  Button,
  ButtonContainer,
  QuoteContainer,
  QuoteText,
  ReactionButton,
  CommentsContainer,
  CommentInput,
  CommentButton
} from './HomePageStyles';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const quotes = useSelector(state => state.quotes);
  const randomQuote = useSelector(state => state.quote)
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false)

  const formatDateTime = (dateTime) => {
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(dateTime).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const getRandomQuote = useCallback(() => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      dispatch(setQuote(quotes[randomIndex]));
    }
    return null;
  }, [dispatch, quotes]);

  useEffect(() => {
    if (randomQuote.id === '') getRandomQuote()
    if (loading) {
      dispatch(setQuote(quotes.find(quote => quote.id === randomQuote.id)))
      setLoading(false)
    }
  }, [dispatch, getRandomQuote, loading, quotes, randomQuote.id])

  const handleQuoteReaction = async (quoteId, reaction) => {
    if (reaction === 'like')
      dispatch(likeQuote({ quoteId, userId: user.id }));
    if (reaction === 'dislike')
      dispatch(dislikeQuote({ quoteId, userId: user.id }));
    setLoading(true)
  }

  const handleAddComment = (quoteId, text) => {
    dispatch(addComment({ quoteId, userId: user.id, comment: text }))
    setLoading(true)
    setNewComment('')
  };

  return (
    <QuoteContainer>
      <div>
      {randomQuote && randomQuote.id ? (
        <>
        <h2>Random Quote!!</h2>
        <p>Author: {randomQuote.author}</p>
        <QuoteText>{randomQuote.text}</QuoteText>
        <p>Created Date: {formatDateTime(randomQuote.createdDate)}</p>
        <p>Tags: {randomQuote.tags.join(', ')}</p>
        <div>
          <ReactionButton onClick={() => handleQuoteReaction(randomQuote.id, 'like')}>
            <FontAwesomeIcon icon={faThumbsUp} /> {randomQuote.likedBy.length}
          </ReactionButton>
          <ReactionButton onClick={() => handleQuoteReaction(randomQuote.id, 'dislike')}>
            <FontAwesomeIcon icon={faThumbsDown} /> {randomQuote.dislikedBy.length}
          </ReactionButton>
          <FontAwesomeIcon icon={faComment} /> {randomQuote.comments.length}
        </div>
            <CommentsContainer>
              <h3>Comments</h3>
              {randomQuote.comments.map((comment, index) => (
                <div key={index}>
                  <Comment comment={comment} quoteId={randomQuote.id} userId={user.id} setLoading={setLoading} />
                </div>
              ))}
              <CommentInput type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
              <CommentButton onClick={() => handleAddComment(randomQuote.id, newComment)}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </CommentButton>
            </CommentsContainer>
          </>
        ) : (
          <p>Oops!! No Random Quote Found</p>
        )}
      </div>
      <ButtonContainer> {/* Use the styled component */}
        <Button onClick={() => navigate('/Quotes')}>View all Quotes</Button> {/* Use the styled component */}
        <br/>
        <Button onClick={() => getRandomQuote()}>Get New Random Quote</Button> {/* Use the styled component */}
      </ButtonContainer> {/* Use the styled component */}
    </QuoteContainer>
);
}

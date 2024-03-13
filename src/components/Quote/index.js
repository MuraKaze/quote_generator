import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { addComment, changeQuoteReaction, deleteQuote, editQuote } from '../../redux/reducers/quotesReducer';
import { followTag, followUser } from '../../redux/reducers/followReducer';
import { setQuote } from '../../redux/reducers/quoteReducer';
import Comment from '../Comment';
import Tag from '../Tag';
import ReportForm from '../ReportForm';
import { QuoteItem, AuthorContainer, AuthorName, ActionButton, CommentInputContainer, CommentInput, TagsContainer, FollowButton } from './QuoteStyles';
import { SelectSort } from '../Quotes/QuotesStyles';

export default function Quote({ quote, userId }) {
  const dispatch = useDispatch();
  const allTags = useSelector(state => state.tags)
  const isAdmin = useSelector(state => state.admin.isLoggedIn);
  const users = useSelector(state => state.users);
  const followUsers = useSelector(state => state.follow.users);
  const quotes = useSelector(state => state.quotes);
  const commentInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [formVisible, setFormVisible] = useState(false);
  const [newQuote, setNewQuote] = useState(quote.text);
  const [tags, setTags] = useState(quote.tags);

  useEffect(() => {
    if (loading) {
      dispatch(setQuote(quotes.find(updatedQuote => updatedQuote.id === quote.id)));
      setLoading(false);
    }
  }, [dispatch, loading, quote.id, quotes]);

  const toggleInputVisibility = () => {
    const button = commentInputRef.current;
    if (button) {
      const { offsetTop, offsetLeft, offsetHeight } = button;
      setButtonPosition({ top: offsetTop + offsetHeight, left: offsetLeft });
      setVisibility(prevState => !prevState);
    }
  };

  const findUser = () => {
    const foundUser = users.find(user => user.id === quote.author);
    return foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : '';
  };

  const handleAddComment = (quoteId, text) => {
    if (!userId) return alert('You need to login to do this action');
    dispatch(addComment({ quoteId, userId, comment: text }));
    setLoading(true);
    setNewComment('');
  };

  const formatDateTime = (dateTime) => {
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateTime).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleReaction = (quoteId, reaction) => {
    if (!userId) return alert('You need to login to do this action');
    dispatch(changeQuoteReaction({ quoteId, userId, reaction }));
  };

  const handleFollowTag = (userId, tag) => {
    if (!userId) return alert('You need to login to do this action');
    dispatch(followTag({ userId, tag }));
    setLoading(true);
  };

  const checkFollowForAuthor = () => {
    return followUsers.findIndex(entry => entry.follower === userId && entry.following === quote.author) !== -1;
  };

  const handleFollowUser = () => {
    if (userId) {
      dispatch(followUser({ followerId: userId, followingId: quote.author }));
      setLoading(false);
    } else {
      alert('You need to login to do this action');
    }
  };

  const handleRemoveQuote = (quoteId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      dispatch(deleteQuote({ quoteId }));
    }
    setLoading(false);
  };

  const handleEditQuote = () => {
    const updatedQuote = {
      ...quote,
      text: newQuote,
      tags,
    };
    const shouldEdit = window.confirm("Are you sure you want to edit");
    if (shouldEdit) {
      dispatch(editQuote({ updatedQuote }));
      setFormVisible(prevState => !prevState);
    }
  };

  const handleTagSelect = (e) => {
    const selectedTag = e.target.value;
    setTags([...tags, selectedTag]);
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const toggleQuoteForm = () => {
    const button = commentInputRef.current;
    if (button) {
      const { offsetTop, offsetLeft, offsetHeight } = button;
      setButtonPosition({ top: offsetTop + offsetHeight, left: offsetLeft });
      setFormVisible(prevState => !prevState);
    }
  };

  return (
    <QuoteItem key={quote.id}>
      <AuthorContainer>
        <AuthorName>Author: {findUser(quote.author)}</AuthorName>
        {formVisible && (
          <CommentInputContainer top={buttonPosition.top} left={buttonPosition.left}>
            <CommentInput type='text' placeholder='Edit Quote...' value={newQuote} onChange={e => setNewQuote(e.target.value)} />
            <span>Select Tags: </span>
            <SelectSort value={''} onChange={(e) => handleTagSelect(e)}>
              <option value={''}>none</option>
              {allTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </SelectSort>
            <div>
              {tags.map((tag, index) => (
                <span key={index}>
                  {tag}
                  <ActionButton onClick={() => handleTagRemove(tag)}>X</ActionButton>
                </span>
              ))}
            </div>
            <ActionButton onClick={() => handleEditQuote()}>Submit</ActionButton>
          </CommentInputContainer>
        )}
        {quote.author === userId || isAdmin ? (
          <>
            <ActionButton>
              <FontAwesomeIcon ref={commentInputRef} icon={faPenToSquare} onClick={() => toggleQuoteForm()} />
            </ActionButton>
            <ActionButton onClick={() => handleRemoveQuote(quote.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </ActionButton>
          </>
        ) : (
          <>
            <FollowButton following={checkFollowForAuthor().toString()} onClick={() => handleFollowUser()}>
              {checkFollowForAuthor() ? 'UnFollow' : 'Follow'}
            </FollowButton>
            <ReportForm reporterId={userId} reportedId={quote.id} type={'quote'} setLoading={setLoading} />
          </>
        )}
      </AuthorContainer>
      <p>Quote: {quote.text}</p>
      <p>Created Date: {formatDateTime(quote.createdDate)}</p>
      <TagsContainer>
        Tags:
        {quote.tags.map((tag, index) => (
          <Tag key={index} userId={userId} tag={tag} handleFollowTag={handleFollowTag} />
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
            {quote.comments.map((comment, index) => (
              <Comment key={index} comment={comment} quoteId={quote.id} userId={userId} setLoading={setLoading} />
            ))}
          </CommentInputContainer>
        )}
      </div>
    </QuoteItem>
  );
}

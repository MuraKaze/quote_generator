import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addQuote, fetchQuotes } from '../../redux/reducers/quotesReducer';
import { Container, SearchInput, SelectSort, QuoteContainer } from './QuotesStyles';

import Quote from '../Quote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ActionButton, CommentInputContainer, CommentInput } from '../Quote/QuoteStyles';

function Quotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortedQuotes, setSortedQuotes] = useState([]);
  const quoteInputRef = useRef();
  const [visibility, setVisibility] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [newQuote, setNewQuote] = useState('')
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelect = (e) => {
    const selectedTag = e.target.value;
    setSelectedTags([...selectedTags, selectedTag]);
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(updatedTags);
  };

  const quotes = useSelector(state => state.quotes);
  const tags = useSelector(state => state.tags)
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (quotes.length === 0) {
      dispatch(fetchQuotes());
    }
  }, [dispatch, quotes]);

  useEffect(() => {
    // Sort quotes based on selected sort option whenever sortBy changes
    // or when quotes, likes, or dislikes change
    const newQuotes = [...quotes].sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likedBy.length - a.likedBy.length;
        case 'dislikes':
          return b.dislikedBy.length - a.dislikedBy.length;
        case 'comments':
          return b.comments.length - a.comments.length;
        default:
          return new Date(b.createdDate + 'T' + b.createdTime) - new Date(a.createdDate + 'T' + a.createdTime);
      }
    });
    setSortedQuotes(newQuotes);
  }, [sortBy, quotes]);

  const toggleQuoteForm = () => {
    const button = quoteInputRef.current;
    if (button) {
      const { offsetTop, offsetLeft, offsetHeight } = button;
      setButtonPosition({ top: offsetTop + offsetHeight, left: offsetLeft });
      setVisibility(prevState => !prevState);
    }
  };

  const handleAddQuote = (text, author, tags) => {
    dispatch(addQuote({text, author, tags}))
  }

  return (
    <Container>
      <QuoteContainer>
        <SearchInput type="text" placeholder="Search by author, quote, or tags" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <SelectSort value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="createdDate">Date Created</option>
          <option value="likes">Likes</option>
          <option value="dislikes">Dislikes</option>
          <option value="comments">Comments</option>
        </SelectSort>
        { user.id && <ActionButton ref={quoteInputRef} onClick={() => toggleQuoteForm()}><FontAwesomeIcon icon={faCirclePlus} /> Add Quote</ActionButton>}
        {visibility && (
            <CommentInputContainer top={buttonPosition.top} left={buttonPosition.left}>
            <CommentInput type='text' placeholder='Add a Quote...' value={newQuote} onChange={e => setNewQuote(e.target.value)} />
            <span>Select Tags: </span>
            <SelectSort value={''} onChange={(e) => handleTagSelect(e)}>
              <option value={''}>none</option>
              {tags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </SelectSort>
            <div>
              {selectedTags.map((tag, index) => (
                <span key={index}>
                  {tag}
                  <ActionButton onClick={() => handleTagRemove(tag)}>X</ActionButton>
                </span>
              ))}
            </div>
            <ActionButton onClick={() => handleAddQuote(newQuote, user.id, selectedTags)}>Submit</ActionButton>
            </CommentInputContainer>
        )}
      </QuoteContainer>
      {sortedQuotes.map(quote => (
        <Quote key={quote.id} quote={quote} userId={user.id}/>
      ))}
    </Container>
  );
}

export default Quotes;

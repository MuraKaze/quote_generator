import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuotes } from '../../redux/reducers/quotesReducer';
import { Container, SearchInput, SelectSort } from './QuotesStyles';

import Quote from '../Quote';

function Quotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortedQuotes, setSortedQuotes] = useState([]);

  const quotes = useSelector(state => state.quotes);
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

  return (
    <Container>
      <SearchInput type="text" placeholder="Search by author, quote, or tags" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <SelectSort value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="">Sort by</option>
        <option value="createdDate">Date Created</option>
        <option value="likes">Likes</option>
        <option value="dislikes">Dislikes</option>
        <option value="comments">Comments</option>
      </SelectSort>
      {sortedQuotes.map(quote => (
        <Quote key={quote.id} quote={quote} userId={user.id}/>
      ))}
    </Container>
  );
}

export default Quotes;

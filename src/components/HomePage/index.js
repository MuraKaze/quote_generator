import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuote } from '../../redux/reducers/quoteReducer';
import {
  Button,
  ButtonContainer,
  QuoteContainer,
} from './HomePageStyles';
import Quote from '../Quote';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const quotes = useSelector(state => state.quotes);
  const randomQuote = useSelector(state => state.quote)
  const [loading, setLoading] = useState(false)

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

  return (
    <QuoteContainer>
      <div>
      {randomQuote && randomQuote.id ? (
          <>
          <h2>Random Quote!!</h2>
            <Quote quote={randomQuote} userId={user.id}/>
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

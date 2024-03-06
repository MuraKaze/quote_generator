import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuotes } from '../../redux/reducers/quotesReducer';
import Login from '../Login';
import SignUp from '../SignUp';
import { WelcomeContainer, Button } from './WelcomeStyles'; // Import the styled components

function Welcome() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState('login');

  const handleToggle = (toggleVal) => {
    setToggle(toggleVal === 'login' ? 'login' : toggleVal === 'signup' ? 'signup' : 'login');
  };

  const seedData = () => {
    dispatch(fetchQuotes());
  };

  return (
    <WelcomeContainer>
      <div>
        <Button onClick={seedData}>SEED QUOTES</Button>
        <Button onClick={() => handleToggle('login')}>Log In</Button>
        <Button onClick={() => handleToggle('signup')}>Sign Up</Button>
      </div>
      <div>
        {toggle === 'login' ? <Login /> : <SignUp setToggle={setToggle} />}
      </div>
    </WelcomeContainer>
  );
}

export default Welcome;

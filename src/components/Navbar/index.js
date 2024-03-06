import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { NavbarContainer, Title, ButtonContainer, Button, BackButton } from './NavbarStyles';

export default function Navbar() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(clearUser());
    navigate('/Welcome');
  };

  return (
    <NavbarContainer>
      <Title>Quotes App 📝</Title>
      <ButtonContainer>
        <BackButton onClick={() => navigate(-1)}>Go Back!</BackButton>
        {user.id ? <Button onClick={() => logOut()}>Log Out</Button> : null}
      </ButtonContainer>
    </NavbarContainer>
  );
}

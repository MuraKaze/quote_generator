import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { NavbarContainer, Title, ButtonContainer, Button, BackButtonContainer, BackButton } from './NavbarStyles';
import { logOutAsAdmin } from '../../redux/reducers/adminReducer';

export default function Navbar() {
  const user = useSelector(state => state.user);
  const isAdmin = useSelector(state => state.admin.isLoggedIn)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(clearUser());
    dispatch(logOutAsAdmin())
    navigate('/Welcome');
  };

  return (
    <NavbarContainer>
      <Title>Quotes App 📝</Title>
      <ButtonContainer>
        <Button onClick={() => navigate('/Home')}>Home</Button>
        <Button onClick={() => navigate('/Quotes')}>Quotes</Button>
        {isAdmin &&
        <>
          <Button onClick={() => navigate('/Reports')}>Reports</Button>
          <Button onClick={() => navigate('/Tags')}>Tags</Button>
        </>
        }
        <BackButtonContainer>
          {user.id ?
            <>
              <BackButton onClick={() => logOut()}>Log Out</BackButton>
              <BackButton onClick={() => navigate(-1)}>Go Back!</BackButton>
            </>
            :
            <BackButton onClick={() => navigate('/Welcome')}>Login</BackButton>
          }
          {user.id && !isAdmin && <BackButton onClick={() => navigate('/Profile')}>Profile!</BackButton>}
        </BackButtonContainer>
      </ButtonContainer>
    </NavbarContainer>
  );
}

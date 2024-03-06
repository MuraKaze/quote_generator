import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/reducers/userReducer';
import {
  FormContainer,
  Label,
  Input,
  CheckboxLabel,
  Checkbox,
  SubmitButton
} from './LoginStyles';

export default function Login() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      dispatch(setUser(user));
      navigate('/Home');
    } else {
      alert('User not found. Please check your credentials.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="email">Email:</Label>
      <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

      <Label htmlFor="password">Password:</Label>
      <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

      <CheckboxLabel htmlFor="rememberMe">
        <Checkbox type="checkbox" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
        Remember Me
      </CheckboxLabel>

      <SubmitButton type="submit" value="Login" />
    </FormContainer>
  );
}

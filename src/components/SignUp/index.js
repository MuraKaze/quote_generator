import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/reducers/usersReducer';
import { Form, Input, Select, Option, ErrorMessage } from './SignUpStyles'; // Import the styled components

export default function SignUp({ setToggle }) {
  const users = useSelector(state => state.users)

  const initialFormData = {
    firstName: '',
    lastName: '',
    userName: '',
    // profilePicture: null,
    gender: '',
    email: '',
    password: ''
  };

  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isDuplicate = users.some(user => user[name] === value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      [`${name}Duplicate`]: isDuplicate ? `Duplicate Value! Kindly use another ${name}` : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailDuplicate, firstNameDuplicate, genderDuplicate, lastNameDuplicate, passwordDuplicate, userNameDuplicate, ...formDataToSend } = formData;
    dispatch(addUser(formDataToSend));
    setFormData(initialFormData);
    setToggle('login')
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label><br />
      <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required /><br /><br />

      <label htmlFor="lastName">Last Name:</label><br />
      <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required /><br /><br />

      <label htmlFor="userName">User Name:</label><br />
      <Input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
      {formData.userNameDuplicate && <ErrorMessage>{formData.userNameDuplicate}</ErrorMessage>}
      <br/><br/>

      <label htmlFor="gender">Gender:</label><br />
      <Select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
        <Option value="">Select Gender</Option>
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
      <br/><br/>

      <label htmlFor="email">Email:</label><br />
      <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      {formData.emailDuplicate && <ErrorMessage>{formData.emailDuplicate}</ErrorMessage>}
      <br/><br/>

      <label htmlFor="password">Password:</label><br />
      <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />

      <input type="submit" value="Submit" />
    </Form>
  );
}

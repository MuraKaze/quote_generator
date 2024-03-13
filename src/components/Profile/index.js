import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ProfileContainer } from './ProfileStyles';
import { Form, Input, Select, Option, ErrorMessage } from '../SignUp/SignUpStyles'; // Import the styled components


export default function Profile() {

  const [user, setUser] = useState({ ...useSelector(state => state.user), checkPassword: '' });
  const users = useSelector(state => state.users)

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isDuplicate = users.some(user => user[name] === value);
    setUser(prevData => ({
      ...prevData,
      [name]: value,
      [`${name}Duplicate`]: isDuplicate ? `Duplicate Value! Kindly use another ${name}` : '',
    }));
  };

  const handleSubmit = () => {
    console.log('')
  }

  return (
    <ProfileContainer>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label><br />
        <Input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} required /><br /><br />

        <label htmlFor="lastName">Last Name:</label><br />
        <Input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} required /><br /><br />

        <label htmlFor="userName">User Name:</label><br />
        <Input type="text" id="userName" name="userName" value={user.userName} onChange={handleChange} required />
        {user.userNameDuplicate && <ErrorMessage>{user.userNameDuplicate}</ErrorMessage>}
        <br/><br/>

        {/* <label htmlFor="profilePicture">Profile Picture:</label><br />
        <input type="file" id="profilePicture" name="profilePicture" onChange={handleFileChange} accept="image/*" /><br /><br /> */}

        <label htmlFor="gender">Gender:</label><br />
        <Select id="gender" name="gender" value={user.gender} onChange={handleChange} required>
          <Option value="">Select Gender</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
        <br/><br/>

        <label htmlFor="email">Email:</label><br />
        <Input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />
        {user.emailDuplicate && <ErrorMessage>{user.emailDuplicate}</ErrorMessage>}
        <br/><br/>

        <label htmlFor="password">Password:</label><br />
        <Input type="password" id="password" name="password" value={user.password} onChange={handleChange} required /><br /><br />

        <label htmlFor="password">Confirm Password:</label><br />
        <Input type="password" id="checkPassword" name="checkPassword" value={user.checkPassword} onChange={handleChange} required /><br /><br />

        <input type="submit" value="Submit" />
      </Form>
    </ProfileContainer>
  )
}

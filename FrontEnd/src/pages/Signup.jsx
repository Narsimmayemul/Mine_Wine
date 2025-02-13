import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UrlContext } from '../context/url';
import { emailContext } from '../context/email';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { url } = useContext(UrlContext);
  const {setUserMail} = useContext(emailContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}signup`, { username, email, password });
      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      setError('Signup failed');
      console.log(error)
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

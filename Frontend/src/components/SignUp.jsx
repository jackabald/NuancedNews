import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-up no-outline p-4">
      <h2 className="text-center mb-4">Sign Up</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary btn-block" onClick={handleSignUp}>Sign Up</button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default SignUp;

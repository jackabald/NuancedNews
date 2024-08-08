import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-in no-outline p-4">
      <h2 className="text-center mb-4">Sign In</h2>
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
      <button className="btn btn-primary btn-block" onClick={handleSignIn}>Sign In</button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default SignIn;

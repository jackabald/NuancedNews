import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import { useAuth } from '../contexts/AuthContext'; 
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import ProfileDetails from './ProfileDetails.jsx';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(prevState => !prevState);
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Navbar />
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        {currentUser ? (
          <ProfileDetails user={currentUser} />
        ) : (
          <>
            {isSignIn ? <SignIn /> : <SignUp />}
            <button className="btn btn-primary btn-block mt-3" onClick={toggleForm}>
              {isSignIn ? 'Need an account?' : 'Already have an account?'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

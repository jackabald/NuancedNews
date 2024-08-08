import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import { useAuth } from '../contexts/AuthContext'; 
import { signOut } from 'firebase/auth';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import ProfileDetails from './ProfileDetails.jsx';

const Profile = () => {
  const { currentUser, auth } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(prevState => !prevState);
  };

  function logout(){
    signOut(auth);
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Navbar />
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        {currentUser ? (
         <><button className="btn btn-primary btn-block mt-3" onClick={logout}>
            Logout
          </button><ProfileDetails user={currentUser} /></>
        ) : (
          <>
            {isSignIn ? <SignIn /> : <SignUp />}
            <button className="btn btn-primary btn-block mt-3" onClick={toggleForm}>
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

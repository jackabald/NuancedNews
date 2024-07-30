import React from 'react';
import Navbar from './Navbar.jsx';
import { useAuth } from '../contexts/AuthContext'; 
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import ProfileDetails from './ProfileDetails.jsx';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile">
      <Navbar />
      <h1>Profile</h1>
      {currentUser ? (
        <ProfileDetails user={currentUser} />
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </div>
  );
};

export default Profile;
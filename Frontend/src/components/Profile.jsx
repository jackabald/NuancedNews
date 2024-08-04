import React from 'react';
import Navbar from './Navbar.jsx';
import { useAuth } from '../contexts/AuthContext'; 
import { signOut } from 'firebase/auth';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import ProfileDetails from './ProfileDetails.jsx';

const Profile = () => {
  const { currentUser, auth } = useAuth();

  function logout(){
    signOut(auth);
  }

  return (
    <div className="profile">
      <Navbar />
      <h1>Profile</h1>
      {currentUser ? (
        <>
          <button onClick={logout}>Logout</button>
          <ProfileDetails user={currentUser} />
        </>
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
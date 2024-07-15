import React, { useState } from "react";
import Navbar from "./Navbar.jsx"
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

const Profile = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <div className="profile">
        <Navbar />
        <h1 className="my-2">Profile</h1>
        {!isSignedIn &&(
        <>
        <SignIn onSignIn={() => setIsSignedIn(true)} />
        <SignUp onSignUp={() => setIsSignedIn(true)}/>
        </>
        )}
    </div>
  );
};

export default Profile;
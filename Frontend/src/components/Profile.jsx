import React from "react";
import Navbar from "./Navbar.jsx"
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

const Profile = () => {
  return (
    <div className="profile">
        <Navbar />
        <h1>Profile</h1>
        <SignIn />
        <SignUp />
    </div>
  );
};

export default Profile;
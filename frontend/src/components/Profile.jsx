import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import ProfileDetails from "./ProfileDetails.jsx";

const Profile = () => {
  const { currentUser, auth } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => setIsSignIn((prev) => !prev);
  const logout = () => signOut(auth);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-in error:", error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center px-4 py-8">
      {currentUser ? (
        <div className="space-y-6 w-full max-w-md">
          {/* Profile Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <ProfileDetails user={currentUser} />
          </div>

          {/* Logout Button Card */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <button
              onClick={logout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          {isSignIn ? <SignIn /> : <SignUp />}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={toggleForm}
              className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 rounded transition-colors"
            >
              {isSignIn ? "Create an Account" : "Back to Sign In"}
            </button>

            <button
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold py-2 rounded transition-colors flex items-center justify-center gap-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

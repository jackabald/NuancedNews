import React from 'react';

const ProfileDetails = ({ user }) => {
  return (
    <div className="profile-details">
      <p>{user.displayName || user.email}</p>
    </div>
  );
};

export default ProfileDetails;

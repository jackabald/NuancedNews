import React, { useState } from "react";

const ProfileDetails = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    namebox: user.displayName || "",
    emailbox: user.email || "",
    phone: user.phone || "",
    bio: user.bio || "",
  });

  const [profilePic, setProfilePic] = useState(user.photoURL || "");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) onUpdate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md"
    >
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 cursor-pointer transition-colors shadow-sm">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-semibold text-base">
                No Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Change Profile Picture"
            />
          </div>
          <p className="mt-1 text-gray-500 text-[10px] text-center">
            Click image to change
          </p>
        </div>

        {/* Inputs */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="namebox"
              value={formData.namebox}
              onChange={handleChange}
              placeholder="Name"
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 text-sm"
              autoComplete="name"
            />
            <input
              type="email"
              name="emailbox"
              value={formData.emailbox}
              disabled
              className="flex-1 px-3 py-2 rounded-md border border-gray-200 bg-gray-200 text-gray-500 cursor-not-allowed placeholder-gray-400 text-sm"
              placeholder="Email"
              autoComplete="email"
              style={{ minWidth: 0 }} // allow input to shrink properly in flex
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 text-sm"
            autoComplete="tel"
          />

          <textarea
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            placeholder="About you"
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 text-sm resize-none"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md font-semibold text-sm transition-shadow shadow"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileDetails;

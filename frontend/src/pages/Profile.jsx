// frontend/src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user._id) {
        setProfileData(null); // Clear profile data if user is not logged in
        return;
      }
      try {
        const res = await axios.get(`${API_BASE}/auth/profile/${user._id}`);
        setProfileData(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setProfileData(null);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) return <p>Please log in to view your profile.</p>;
  if (!profileData) return <p>Loading profile...</p>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Profile</h2>
      <div className="card">
        <div className="card-body">
          <p className="card-text"><strong>Name:</strong> {profileData.name}</p>
          <p className="card-text"><strong>Email:</strong> {profileData.email}</p>
          <p className="card-text"><strong>Quiz Score:</strong> {profileData.score || 0}</p>
          <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};


export default Profile;

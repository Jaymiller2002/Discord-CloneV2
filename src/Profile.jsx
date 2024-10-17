import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getProfile } from './API';
import FriendList from './FriendList';
import PrivateChat from './PrivateChat';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const profileData = await getProfile(token);
        setProfile(profileData);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>{profile.first_name} {profile.last_name}</h2>
      <p>{profile.bio}</p>
      {profile.image && <img src={profile.image} alt={`${profile.first_name}'s profile`} />}
      <FriendList />
      <PrivateChat />
      {/* Button to navigate back to the App.jsx */}
      <button onClick={() => navigate('/home')}>Go Back to Home</button>
    </div>
  );
};

export default Profile;

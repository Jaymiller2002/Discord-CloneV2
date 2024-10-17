import React, { useState, useEffect } from 'react';
import { getFriends, addFriend, deleteFriendship } from './API'; // Adjust the import based on your file structure
import './CSS/FriendList.css'; // Import CSS

const FriendList = ({ onSelectFriend }) => {
  const [friends, setFriends] = useState([]);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null); // Token state

  // Fetch token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Retrieve token from localStorage
    setToken(storedToken); // Set token state
  }, []);

  // Function to fetch friends
  const fetchFriends = async () => {
    if (!token) return; // Ensure token is available before fetching friends

    try {
      const friendsList = await getFriends(token);
      console.log("Token being used:", token);
      setFriends(friendsList); // Ensure it's an array of friends
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
  };

  // Fetch friends when component mounts or when token changes
  useEffect(() => {
    fetchFriends();  // Only fetch friends if token is available
  }, [token]);

  // Add friend handler
  const handleAddFriend = async () => {
    if (!username) {
      alert('Username is required to add a friend.');
      return;
    }

    try {
      await addFriend(token, username); // Ensure token and username are passed correctly
      setUsername(''); // Clear input after adding
      fetchFriends(); // Refresh the friends list
    } catch (error) {
      console.error('Failed to add friend:', error);
      alert('Error adding friend. Please try again.');
    }
  };

  // Delete friend handler
  const handleDeleteFriend = async (friendId) => {
    try {
      await deleteFriendship(token, friendId); // Ensure token and friendId are passed correctly
      fetchFriends(); // Refresh the friends list after deletion
    } catch (error) {
      console.error('Failed to delete friend:', error);
      alert('Error deleting friend. Please try again.');
    }
  };

  return (
    <div className="friend-list-container">
      <h3 className="friend-list-title">Your Friends</h3>
      <ul className="friend-list">
        {friends.map((friend) => (
          <li
            key={friend.id}
            className="friend-item"
            onClick={() => onSelectFriend(friend.username)}
          >
            {friend.username}
            <button
              className="remove-friend-btn"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering onSelectFriend when clicking remove
                handleDeleteFriend(friend.id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="add-friend-container">
        <input
          type="text"
          placeholder="Add a friend by username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="add-friend-input"
        />
        <button className="add-friend-btn" onClick={handleAddFriend}>Add Friend</button>
      </div>
    </div>
  );
};

export default FriendList;

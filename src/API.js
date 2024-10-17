import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust if necessary

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/token/`, { username, password });
  return response.data; // Returns the token
};

export const createUser = async (formData) => {
  await axios.post(`${API_URL}/register/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Required for file uploads
    },
  });
};

export const getProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Assuming the API returns the profile data in response.data
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };


export const getServers = async (token) => {
    const response = await axios.get(`${API_URL}/servers/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };


  export const createServer = async (token, serverData) => {
    const response = await axios.post(`${API_URL}/servers/`, serverData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  // Get all friendships for the authenticated user
export const getFriends = async (token) => {
  try {
      const response = await axios.get(`${API_URL}/friends/`, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching friends:', error);
      return [];
  }
};

// Add a new friend (create a friendship)
export const addFriend = async (token, username) => {
  try {
      const response = await axios.post(
          `${API_URL}/friends/`,
          { to_user: username },  // Passing the friend's username in the request body
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          }
      );
      return response.data;
  } catch (error) {
      console.error('Error adding friend:', error);
      throw error;
  }
};

// Remove a friend (delete a friendship)
export const deleteFriendship = async (token, friendshipId) => {
  try {
      const response = await axios.delete(`${API_URL}/friends/`, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          data: { id: friendshipId }, // Pass the friendship ID in the request body
      });
      return response.data;
  } catch (error) {
      console.error('Error deleting friendship:', error);
      throw error;
  }
};

// Get all private messages for the authenticated user
export const getPrivateMessages = async (token) => {
  try {
      const response = await axios.get(`${API_URL}/private-messages/`, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching private messages:', error);
      throw error;
  }
};

// Send a private message to a friend
export const sendPrivateMessage = async (token, friendUsername, content) => {
  try {
      const response = await axios.post(
          `${API_URL}/private-messages/`,
          {
              receiver: friendUsername,  // Specify the receiver's username
              content,  // Pass the message content
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          }
      );
      return response.data;
  } catch (error) {
      console.error('Error sending private message:', error);
      throw error;
  }
};

// Delete a private message
export const deletePrivateMessage = async (token, messageId) => {
  try {
      const response = await axios.delete(`${API_URL}/private-messages/`, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          data: { id: messageId }, // Pass the message ID to delete
      });
      return response.data;
  } catch (error) {
      console.error('Error deleting private message:', error);
      throw error;
  }
};
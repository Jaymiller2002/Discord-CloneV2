import React, { useState, useEffect } from 'react';
import { getPrivateMessages, sendPrivateMessage, deletePrivateMessage } from './API'; // Adjust the import based on your file structure
import './CSS/PrivateChat.css'; // Import your CSS file

const PrivateChat = ({ selectedFriend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [token, setToken] = useState(null); // Token state

  // Fetch token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Retrieve token from localStorage
    setToken(storedToken); // Set token state
  }, []);

  // Function to fetch private messages
  const fetchPrivateMessages = async () => {
    if (!token || !selectedFriend) return; // Ensure token and selectedFriend are available

    try {
      const messagesList = await getPrivateMessages(token, selectedFriend);
      setMessages(messagesList); // Ensure it's an array of messages
    } catch (error) {
      console.error('Failed to fetch private messages:', error);
    }
  };

  // Fetch messages when component mounts or when token or selectedFriend changes
  useEffect(() => {
    fetchPrivateMessages();
  }, [token, selectedFriend]);

  // Send message handler
  const handleSendMessage = async () => {
    if (!newMessage) {
      alert('Message cannot be empty.');
      return;
    }

    try {
      await sendPrivateMessage(token, selectedFriend, newMessage); // Ensure token and newMessage are passed correctly
      setNewMessage(''); // Clear input after sending
      fetchPrivateMessages(); // Refresh messages
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Error sending message. Please try again.');
    }
  };

  // Delete message handler (optional)
  const handleDeleteMessage = async (messageId) => {
    try {
      await deletePrivateMessage(token, messageId); // Ensure token and messageId are passed correctly
      fetchPrivateMessages(); // Refresh messages after deletion
    } catch (error) {
      console.error('Failed to delete message:', error);
      alert('Error deleting message. Please try again.');
    }
  };

  return (
    <div className="private-chat-container">
      <h3 className="private-chat-title">Chat with {selectedFriend}</h3>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.text}</p>
            <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="send-message-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="send-message-input"
        />
        <button className="send-message-btn" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default PrivateChat;


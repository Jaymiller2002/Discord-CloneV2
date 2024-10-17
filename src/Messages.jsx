import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/Messages.css'; // Import the CSS file for custom styles

const Messages = ({ selectedChannel, token }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (selectedChannel) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/channels/${selectedChannel}/messages/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMessages(response.data);  // Ensure this is the correct structure
        } catch (error) {
          console.error('Failed to fetch messages', error);
        }
      };

      fetchMessages();
    }
  }, [selectedChannel, token]);

  const handleSendMessage = async () => {
    try {
      // Send the new message to the backend
      await axios.post(`http://localhost:8000/channels/${selectedChannel}/messages/`, 
        { content: newMessage,
          channel_id: selectedChannel,
         },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After sending, fetch the latest messages
      const response = await axios.get(`http://localhost:8000/channels/${selectedChannel}/messages/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the messages state
      setMessages(response.data); // This fetches the latest messages from the backend

      // Clear the input field
      setNewMessage('');
    } catch (error) {
      console.error('Message sending failed', error);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Channel #{selectedChannel} - Party</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-content">
              {/* Ensure you're accessing the correct properties */}
              <span className="message-author">{msg.user.username}</span> {/* Change as needed */}
              <span className="message-text">{msg.content}</span> {/* Change as needed */}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          className="chat-input"
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;


import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./CSS/Home.css"; 
import Logout from './Logout'; // Import the Logout component
import Messages from './Messages'; // Import the Messages component

function Home() {
  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const navigate = useNavigate(); // Initialize navigate

  // Fetch servers when the component mounts
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const serverResponse = await axios.get("http://127.0.0.1:8000/servers/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServers(serverResponse.data);
      } catch (err) {
        console.error('Error fetching servers:', err);
        setError("Failed to load servers");
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, [token]);

  // Fetch channels when a server is selected
  useEffect(() => {
    if (selectedServer) {
      const fetchChannels = async () => {
        try {
          const channelResponse = await axios.get(`http://127.0.0.1:8000/channels/?server=${selectedServer}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setChannels(channelResponse.data); // Adjust based on actual data structure
        } catch (err) {
          console.error('Error fetching channels:', err);
          setError("Failed to load channels");
        }
      };

      fetchChannels();
    }
  }, [selectedServer, token]);

  // Server click handler
  const handleServerClick = (serverId) => {
    setSelectedServer(serverId);
    setSelectedChannel(null); // Reset selected channel when a new server is selected
  };

  // Channel click handler
  const handleChannelClick = (channelId) => {
    setSelectedChannel(channelId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Your Discord Clone</h1>
        <p>Chat with friends, join communities, and connect with others seamlessly.</p>
        <Logout /> {/* Add Logout button */}
        <button
          className="cta-button"
          onClick={() => {
            if (token) {
                navigate('/profile'); // Navigate to profile if authenticated
            } else {
                navigate('/login'); // Otherwise, go to login
            }
          }}
        >
          Get Started
        </button>
      </header>

      <div className="server-channel-container">
        {/* Servers List */}
        <div className="servers-list">
          <h2>Servers</h2>
          {servers.length > 0 ? (
            servers.map(server => (
              <div
                key={server.id}
                className={`server-item ${selectedServer === server.id ? 'active' : ''}`}
                onClick={() => handleServerClick(server.id)}
              >
                <h3>{server.name}</h3>
              </div>
            ))
          ) : (
            <p>No servers available</p>
          )}
        </div>

        {/* Channels List */}
        {selectedServer && (
          <div className="channels-list">
            <h2>Channels</h2>
            {channels.length > 0 ? (
              channels.map(channel => (
                <div
                  key={channel.id}
                  className={`channel-item ${selectedChannel === channel.id ? 'active' : ''}`}
                  onClick={() => handleChannelClick(channel.id)}
                >
                  <h3>{channel.name}</h3>
                </div>
              ))
            ) : (
              <p>No channels available</p>
            )}
          </div>
        )}

        {/* Messages Panel */}
        {selectedChannel && (
          <div className="messages-panel">
            <Messages selectedServer={selectedServer} selectedChannel={selectedChannel} token={token} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
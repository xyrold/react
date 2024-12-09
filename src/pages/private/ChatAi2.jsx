import React, { useState, useEffect, useRef } from "react";




const ChatAi2 = () => {

  // API base URL
  const API_URL = `${window.API_BASE_URL}/ai/chat2`;
  const API_Key = window.API_KEY;
  const token = localStorage.getItem("authToken"); // Retrieve token
  
  const [messages, setMessages] = useState([]); // Store messages (user + AI)
  const [input, setInput] = useState(""); // User input
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to handle sending the message
  const sendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages

    // Add user's message to the chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);

    try {

      const payload = {
        messages: [
          // ...messages,
          { role: "user", content: input } // Include the new user message
        ]
      };

      // Send the message to your backend (AI API) using fetch
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_Key,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload), // Send the user's message
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json(); // Assuming the response contains { reply }
      console.log(data);
      // Add AI response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.response.content },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong. Please try again later." },
      ]);
    }

    // Clear the input field after sending
    setInput("");
  };

  return (
    <div className="chat-container">
      <h3>Chat with AI</h3>
      <div className="messages"
       ref={chatContainerRef}
       style={{
         height: "600px",
         overflowY: "scroll",
         border: "1px solid #ccc",
         padding: "10px",

       }}
      
      >
        {/* Render messages */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}: </strong>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
            <button onClick={sendMessage} disabled={loading}>
        {loading ? "Loading..." : "Send"}
      </button>
      </div>
    </div>

  );
};

export default ChatAi2;

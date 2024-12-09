import React, { useState, useEffect, useRef } from "react";




const ChatAi = () => {

  // API base URL
  const API_URL = `${window.API_BASE_URL}/ai/chat2`;
  const API_Key = window.API_KEY;
  const token = localStorage.getItem("authToken"); // Retrieve token
  
  const [messages, setMessages] = useState([]); // Store messages (user + AI)
  const [input, setInput] = useState(""); // User input
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (chatContainerRef.current) {
      
      chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {


  },[]);



  // Function to handle sending the message
  const sendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages
    setLoading(true);
    // Add user's message to the chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "AI", content: "" },
    ]);

     // Clear the input field after sending
     setInput("");

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
      setLoading(false);

      // const data = await response.text(); // Assuming the response contains { reply }
      // console.log(data);

     

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;
        let text = "";
        const aiMessageIndex = messages.length;
        // Stream the response and handle each chunk
        while (!done) {
          const chunk = await reader.read();
          const { done, value } = chunk;
          if(done) break;

          // Decode the chunk and remove the 'data: ' prefix using substring
          const decodedText = decoder.decode(value, { stream: true });
          const cleanedText = decodedText.split(':');
          // const cleanedText = decodedText.substring(6); // Remove 'data: ' (6 characters)

          let textValue = cleanedText[1].trim();
          if(textValue === "") textValue = " ";

          text += textValue;
          // console.log(text);

          // Update state to display the current message
          // setCurrentMessage(text);

          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[aiMessageIndex + 1].content = text;
            return updatedMessages;
          });
        }

        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { role: "AI", content: currentMessage },
        // ]);
      }



    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "AI", content: "Sorry, something went wrong. Please try again later." },
      ]);
    }

   
  };


  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h3>Chat with AI</h3>
      <div className="messages"
       ref={chatContainerRef}
       style={{
         height: "700px",
         overflowY: "scroll",
         border: "1px solid #ccc",
         padding: "10px",

       }}
      
      >
        {/* Render messages */}
        {messages.map((msg, index) => (
          msg.content && msg.content !== "" ? (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}: </strong>
            {msg.content}
          </div>
          ) : null
        ))}
{/* 
        {currentMessage !== "" ? (
           <div>
            <strong>AI:</strong>
            <span> {currentMessage}</span> 
        </div>
        ) : null} */}
      </div>
      <div className="input-container">
        <input
          onKeyDown={handleInputKeyPress}
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

export default ChatAi;

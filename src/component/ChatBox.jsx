import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { askQuestion } from "../services/chatbotAPI";

const ChatBox = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!question.trim()) return;

    // User ka message add karo
    const newMsg = { sender: "user", text: question };
    setMessages((prev) => [...prev, newMsg]);
    setQuestion("");

    // Typing animation start
    setTyping(true);

    // Bot ka response delay se show karna (natural effect)
    setTimeout(async () => {
      const response = await askQuestion(question);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.answer || "Hmm... I'm not sure about that 🤔" },
      ]);

      setTyping(false);
    }, 1500); // <-- 1.5 sec typing animation delay
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full border-b border-gray-800 bg-[#0d0d0d] z-10 flex justify-between items-center px-6 py-4">
        <h1 className="text-lg font-bold">NovaTalk</h1>
        <FaUserCircle size={30} className="cursor-pointer" />
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-24 px-6 w-full flex flex-col">
        {messages.length === 0 ? (
          <div className="flex flex-1 justify-center items-center text-gray-400 text-lg">
            👋 Hi, I'm{" "}
            <span className="text-green-500 font-semibold">&nbsp;NovaTalk</span>.
          </div>
        ) : (
          <div className="flex flex-col space-y-4 w-full">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 rounded-2xl max-w-[75%] w-fit break-words transition-all duration-300 ease-in-out ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end animate-fadeIn"
                    : "bg-gray-800 text-gray-100 self-start animate-fadeIn"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing animation */}
            {typing && (
              <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-2xl w-fit self-start flex space-x-1 animate-fadeIn">
                <span className="typing-dot bg-gray-400 rounded-full w-2 h-2 animate-bounce"></span>
                <span className="typing-dot bg-gray-400 rounded-full w-2 h-2 animate-bounce delay-150"></span>
                <span className="typing-dot bg-gray-400 rounded-full w-2 h-2 animate-bounce delay-300"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d] z-10 flex justify-center px-4 py-3">
        <div className="w-full max-w-7xl flex bg-gray-900 rounded-full px-4 py-2 shadow-lg">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
            placeholder="Ask NovaTalk anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={typing}
            className={`px-4 py-1 rounded-full font-medium transition-colors ${
              typing
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            Send
          </button>
        </div>
      </footer>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }
          .typing-dot {
            animation: typingBounce 1.2s infinite;
          }
          @keyframes typingBounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
          }
          .delay-150 { animation-delay: 0.15s; }
          .delay-300 { animation-delay: 0.3s; }
        `}
      </style>
    </div>
  );
};

export default ChatBox;

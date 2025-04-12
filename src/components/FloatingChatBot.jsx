import { useEffect, useRef, useState } from "react";
import { X, Send, Leaf } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import ChatMessage from "../components/ChatMessage";

export default function FloatingChatBot({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const socket = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { text: inputMessage, isBot: false }];
    setMessages(newMessages);

    if (socket.current?.readyState === WebSocket.OPEN) {
      const message = {
        type: "user_message",
        content: inputMessage
      }
      socket.current.send(JSON.stringify(message));
    }

    setInputMessage("");
    setIsTyping(true);
  };

  useEffect(() => {
    // if (!user) return;
    // const ws = new WebSocket(`https://agri-back-fo2l.onrender.com/ws/${user.$id}`);
    // socket.current = ws;
    // ws.onopen = () => {
    //   console.log("Connexion WebSocket établie");
    //   const initMessage = {
    //     type: "prompt_init",
    //     content: JSON.stringify(result),
    //   };
    //   ws.send(JSON.stringify(initMessage));
    // };

    // ws.onmessage = (event) => {
    //   const newMessage = {
    //     text: event.data,
    //     isBot: true,
    //   };
    //   setIsTyping(true);

    //   setTimeout(() => {
    //     setIsTyping(false);
    //     setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   }, 2000);
    // };

    // ws.onerror = (error) => {
    //   console.error("Erreur WebSocket :", error);
    // };

    // ws.onclose = () => {
    //   console.log("Connexion WebSocket fermée");
    // };

    // return () => {
    //   ws.close();
    // };
  }, [user]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isOpen ? "backdrop-blur-sm" : ""}`}>
      {/* Chat Window */}
      <div
        className={`rounded-2xl absolute bottom-16 right-0 w-96 h-[500px] bg-white shadow-2xl transition-all duration-300 transform ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        } flex flex-col border border-gray-200 overflow-hidden`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="h-7 w-7 text-emerald-100" />
              <h1 className="text-xl font-bold">AgroBot AI</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100"
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isBot={message.isBot}
            />
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-emerald-600 p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="text-sm">AgroBot écrit...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-t border-gray-200 p-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 px-4 py-3 rounded-full bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            <button
              type="submit"
              className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              disabled={!inputMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-emerald-600 rotate-90" : "bg-green-600 hover:bg-green-700 hover:scale-110"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Leaf className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
}
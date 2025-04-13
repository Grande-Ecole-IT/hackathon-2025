import { useEffect, useRef, useState } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";
import ChatMessage from "../components/ChatMessage";

export default function FloatingChatBot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sendMessage = async (message) => {
      if (!message) return;
      setIsTyping(true);

      try {
        const response = await fetch(
          "https://hackathon-2025-back.onrender.com/chatbot/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Ajoutez d'autres headers si nécessaire (comme un token d'authentification)
              // 'Authorization': `Bearer ${yourToken}`
            },
            body: JSON.stringify(message),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Réponse du serveur:", data);
        // Simulation réponse du bot
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              text: data.message,
              isBot: true,
            },
          ]);
        }, 1500);

        setInputMessage("");
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
      } finally {
        setIsTyping(false);
        scrollToBottom();
      }
    };
    sendMessage(message);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { text: inputMessage, isBot: false }];
    setMessage({
      message: inputMessage,
      new_conversation: true,
    });
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);
  };
  console.log(isOpen);

  return (
    <>
      {/* Overlay flou lorsque le chat est ouvert */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-500/10 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed bottom-6 right-6 z-50 ${
          isOpen ? "backdrop-blur-3xl" : ""
        }`}
      >
        {/* Fenêtre de chat - conditionnellement rendue */}
        {isOpen && (
          <div
            className={`rounded-2xl bottom-20 right-0 w-96 h-[500px] bg-white dark:bg-gray-800 shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden ${
              isOpen
                ? "scale-100 opacity-100 backdrop-blur-3xl"
                : "scale-95 opacity-0 pointer-events-none"
            } `}
          >
            {/* En-tête */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-yellow-200" />
                  <h1 className="text-xl font-bold">Assistant Virtuel</h1>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Zone de messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-700">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isBot={message.isBot}
                />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-300 p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                  </div>
                  <span className="text-sm">L'assistant écrit...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bouton flottant - seulement quand le chat est fermé */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-4 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 hover:scale-110 transition-all duration-300"
            aria-label="Ouvrir le chat"
          >
            <div className="relative">
              <Bot className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white border border-white animate-pulse">
                1
              </span>
            </div>
          </button>
        )}
      </div>
    </>
  );
}

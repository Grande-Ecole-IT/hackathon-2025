import { useEffect, useRef, useState } from "react";
import {
  X,
  Send,
  Bot,
  Sparkles,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

const ChatMessage = ({ message, isBot }) => (
  <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
    <div
      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
        isBot
          ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none"
          : "bg-blue-600 text-white rounded-br-none"
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const SuggestedQuestion = ({ question, onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-2 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
  >
    {question}
  </button>
);

export default function FloatingChatBot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      text: "Bonjour ! 👋 Je suis votre assistant virtuel. Posez-moi vos questions ou choisissez une suggestion ci-dessous :",
      isBot: true,
    },
  ]);
  const [messageToSend, setMessageToSend] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const suggestedQuestions = [
    "Comment développer ma résilience face aux défis professionnels ?",
    "Quelles sont les compétences clés pour renforcer ma résilience ?",
    "Quelles stratégies adopter pour mieux gérer les changements ?",
    "Comment créer un réseau de soutien professionnel efficace ?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
            },
            body: JSON.stringify(message),
          }
        );

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: data.message || "Je n'ai pas pu traiter votre demande.",
              isBot: true,
            },
          ]);
          setIsTyping(false);
        }, 1000);
      } catch (error) {
        console.error("Erreur:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Désolé, un problème est survenu. Veuillez réessayer.",
            isBot: true,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    };

    sendMessage(messageToSend);
  }, [messageToSend]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = { text: inputMessage, isBot: false };
    setMessages((prev) => [...prev, newMessage]);
    setMessageToSend({
      message: inputMessage,
      new_conversation: messages.length <= 1? true : false,
    });
    setInputMessage("");
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <>
      {/* Overlay flou */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-200/8 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Conteneur du chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Fenêtre de chat */}
        {isOpen && (
          <div className="rounded-xl w-96 h-[500px] bg-white dark:bg-gray-800 shadow-xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <h1 className="text-lg font-semibold">Assistant Virtuel</h1>
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
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 dark:bg-gray-700/50">
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg.text} isBot={msg.isBot} />
                ))}

                {/* Suggestions de questions */}
                {messages.length <= 1 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <SuggestedQuestion
                        key={index}
                        question={question}
                        onClick={() => handleSuggestedQuestion(question)}
                      />
                    ))}
                  </div>
                )}

                {isTyping && (
                  <div className="flex items-center space-x-2 p-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Zone de saisie */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 px-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bouton flottant */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-4 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 group"
            aria-label="Ouvrir le chat"
          >
            <div className="relative">
              <Bot className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              {messages.length > 1 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white border border-white">
                  {messages.length - 1}
                </span>
              )}
            </div>
          </button>
        )}
      </div>
    </>
  );
}

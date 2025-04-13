import { Bot, User } from "lucide-react";

const ChatMessage = ({ message, isBot }) => {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div className={`flex items-start max-w-[80%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
          isBot 
            ? "bg-gradient-to-br from-blue-500 to-indigo-500" 
            : "bg-gray-200 dark:bg-gray-600"
        } shadow-md`}>
          {isBot ? (
            <Bot className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          )}
        </div>

        {/* Message Bubble */}
        <div className={`mx-2 px-4 py-3 rounded-xl ${
          isBot
            ? "bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm border border-gray-200 dark:border-gray-500"
            : "bg-blue-500 text-white"
        } transition-all duration-200`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
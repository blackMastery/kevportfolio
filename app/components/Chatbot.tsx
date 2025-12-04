import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { Form } from "@remix-run/react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AgentInputItem {
  role: "user" | "assistant";
  content: Array<{ type: string; text: string }>;
}

const STORAGE_KEY = "chatbot_conversation_history";
const MAX_INPUT_LENGTH = 2000;
const SUGGESTED_QUESTIONS = [
  "What are your technical skills?",
  "Tell me about your projects",
  "How can I contact you?",
  "What services do you offer?",
];

// Retry with exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || response.status !== 429) {
        return response;
      }
      // If rate limited, wait before retry
      const retryAfter = response.headers.get("Retry-After");
      if (retryAfter && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, parseInt(retryAfter) * 1000));
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries - 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error("Request failed after retries");
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load from sessionStorage on mount
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
        }
      } catch (e) {
        console.warn("Failed to load conversation history:", e);
      }
    }
    return [
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm here to help you learn about Kevon Cadogan's portfolio. What would you like to know?",
        timestamp: new Date(),
      },
    ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Save messages to sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (e) {
        console.warn("Failed to save conversation history:", e);
      }
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages, scrollToBottom]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === "Escape" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        setIsOpen(false);
      }
      // Enter to send (but not Shift+Enter)
      if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        const form = inputRef.current?.closest("form");
        if (form && input.trim() && !isLoading) {
          e.preventDefault();
          form.requestSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, input, isLoading]);

  const clearConversation = () => {
    const initialMessage: Message = {
      id: "1",
      role: "assistant",
      content: "Hello! I'm here to help you learn about Kevon Cadogan's portfolio. What would you like to know?",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
    setError(null);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn("Failed to clear conversation history:", e);
      }
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Input validation
    if (trimmedInput.length > MAX_INPUT_LENGTH) {
      setError(`Message is too long. Maximum ${MAX_INPUT_LENGTH} characters allowed.`);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);
    setRetryCount(0);

    try {
      // Convert messages to agent format for history
      // Only include user messages in history to avoid format issues
      const conversationHistory: AgentInputItem[] = messages
        .slice(1) // Skip initial greeting
        .filter((msg) => msg.role === "user") // Only include user messages
        .map((msg) => ({
          role: "user" as const,
          content: [{ type: "input_text", text: msg.content }],
        }));

      const formData = new FormData();
      formData.append("input", userMessage.content);
      if (conversationHistory.length > 0) {
        formData.append("conversation_history", JSON.stringify(conversationHistory));
      }

      const response = await fetchWithRetry("/api/chatbot", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = data.retryAfter || 60;
          throw new Error(
            `Too many requests. Please wait ${retryAfter} seconds before trying again.`
          );
        }
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm sorry, I couldn't process that request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, something went wrong. Please try again or contact me directly via email at kev.cadogan300@gmail.com.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const showSuggestedQuestions = messages.length <= 1 && !isLoading;

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-96 h-[500px] md:h-[600px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
            role="dialog"
            aria-label="Chatbot"
            aria-modal="true"
            aria-live="polite"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#149ddd] to-[#149ddd] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center" aria-hidden="true">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Portfolio Assistant</h3>
                  <p className="text-xs text-white/80">Ask me anything!</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearConversation}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  aria-label="Close chat"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" role="log" aria-live="polite" aria-atomic="false">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[75%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-[#149ddd] text-white"
                        : "bg-white text-gray-800 shadow-sm border border-gray-200"
                    }`}
                    role={message.role === "user" ? "user message" : "assistant message"}
                  >
                    {message.role === "assistant" ? (
                      <div className="text-sm">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-outside mb-2 ml-4 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-outside mb-2 ml-4 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            code: ({ children }) => (
                              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">
                                {children}
                              </code>
                            ),
                            pre: ({ children }) => (
                              <pre className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                                {children}
                              </pre>
                            ),
                            h1: ({ children }) => <h1 className="text-base font-bold mb-2 mt-2 first:mt-0">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-bold mb-2 mt-2 first:mt-0">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0">{children}</h3>,
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-gray-300 pl-3 my-2 italic">
                                {children}
                              </blockquote>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#149ddd] underline hover:text-[#149ddd]/80 break-words"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                    )}
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user" ? "text-white/70" : "text-gray-500"
                      }`}
                      aria-label={`Sent at ${formatTime(message.timestamp)}`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                  aria-live="polite"
                  aria-label="Loading response"
                >
                  <div className="bg-white text-gray-800 rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Suggested Questions */}
              {showSuggestedQuestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-gray-500 font-medium">Suggested questions:</p>
                  <div className="flex flex-col space-y-2">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-left text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 hover:border-[#149ddd] transition-colors text-gray-700"
                        aria-label={`Ask: ${question}`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <Form
              onSubmit={handleSubmit}
              className="border-t border-gray-200 bg-white p-4"
            >
              {error && (
                <div className="mb-2 text-xs text-red-600 bg-red-50 p-2 rounded" role="alert">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= MAX_INPUT_LENGTH) {
                          setInput(value);
                          setError(null);
                        } else {
                          setError(`Maximum ${MAX_INPUT_LENGTH} characters allowed.`);
                        }
                      }}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      maxLength={MAX_INPUT_LENGTH}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#149ddd] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Chat input"
                      aria-describedby="char-counter"
                    />
                    {input.length > MAX_INPUT_LENGTH * 0.8 && (
                      <div
                        id="char-counter"
                        className="absolute bottom-1 right-2 text-xs text-gray-500"
                        aria-live="polite"
                      >
                        {input.length}/{MAX_INPUT_LENGTH}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading || input.length > MAX_INPUT_LENGTH}
                    className="px-4 py-2 bg-[#149ddd] text-white rounded-lg hover:bg-[#149ddd]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> to send,{" "}
                  <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> to close
                </p>
              </div>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:right-6 w-14 h-14 bg-[#149ddd] text-white rounded-full shadow-lg hover:bg-[#149ddd]/90 transition-colors flex items-center justify-center z-40 focus:outline-none focus:ring-2 focus:ring-[#149ddd] focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

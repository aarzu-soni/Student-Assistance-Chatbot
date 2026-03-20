import React, { useEffect, useState, useRef } from 'react';
import axios from '../api/axios';

export default function ChatbotWidget() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when chatLog changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    setChatLog(prev => [...prev, { sender: 'user', text: message }]);
    setMessage('');
    setLoading(true);

    // Simulate delay
    await new Promise(res => setTimeout(res, 2000));

    try {
      const res = await axios.post(
        '/chatbot/',
        { message },
        { timeout: 20000 }
      );
      setChatLog(prev => [
        ...prev,
        { sender: 'bot', text: res.data.response },
      ]);
    } catch (err) {
      const errMsg =
        err.code === 'ECONNABORTED'
          ? 'Response timed out. Please try again.'
          : 'Something went wrong. Please try again later.';
      setChatLog(prev => [...prev, { sender: 'bot', text: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  };

  if (loading && chatLog.length === 1) {
    // Initial load message
    return (
      <div className="py-20 text-center text-xl text-sky-400 animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 !rounded-full !bg-sky-900 text-white flex items-center justify-center shadow-lg transition"
        >
          💬
        </button>
      ) : (
        <div className="fixed bottom-20 right-6 w-96 max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between bg-sky-900 px-4 py-2 rounded-t-2xl">
            <h2 className="text-white text-lg font-semibold">
              Ask Our College Assistant
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-black text-lg p-1"
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex flex-col flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {chatLog.map((msg, idx) =>
              msg.sender === 'bot' ? (
                msg.text
                  .split('\n')
                  .filter(line => line.trim())
                  .map((line, i) => (
                    <div
                      key={`${idx}-${i}`}
                      className="self-start bg-gray-100 text-gray-800 text-sm max-w-[75%] px-3 py-2 break-words shadow-sm rounded-tr-2xl rounded-br-xl rounded-tl-xl"
                    >
                      {line.trim()}
                    </div>
                  ))
              ) : (
                <div
                  key={idx}
                  className="self-end bg-sky-900 text-white text-sm max-w-[75%] px-3 py-2 break-words shadow-sm rounded-bl-2xl rounded-tl-xl rounded-tr-2xl"
                >
                  {msg.text}
                </div>
              )
            )}
            {loading && (
              <div className="self-start italic text-gray-500 text-sm">
                Bot is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center px-4 py-2 bg-white rounded-b-2xl border-t border-gray-200 space-x-2">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
              placeholder="Type your question..."
              className="flex-1 h-10 px-3 py-1 bg-white border border-gray-300 rounded-lg resize-none text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="h-10 px-4 flex items-center justify-center !bg-sky-900 hover:bg-sky-800 active:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

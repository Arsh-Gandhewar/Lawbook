import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ChatInterface = () => {
  const { chatId } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(chatId);
  const [usage, setUsage] = useState(null);
  const [showLawyerSuggestions, setShowLawyerSuggestions] = useState(false);
  const [suggestedLawyers, setSuggestedLawyers] = useState([]);
  const [outputLang, setOutputLang] = useState('en');
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Don't redirect guest users to login
    if (!authLoading && !user) {
      navigate('/register-free');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchChatHistory();
    }
  }, [user]);

  useEffect(() => {
    if (currentChatId) {
      loadChat(currentChatId);
    }
  }, [currentChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`/api/chat/history/${user.id}`);
      setChatHistory(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const loadChat = async (id) => {
    try {
      const response = await axios.get(`/api/chat/${id}`);
      setMessages(response.data.messages);
      

    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setLoading(true);

    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);

    try {
      const response = await axios.post('/api/chat', {
        message: userMessage,
        chatId: currentChatId,
        outputLang
      });

      // Add AI response
      setMessages(prev => [...prev, {
        role: 'model',
        content: response.data.response,
        timestamp: response.data.timestamp,
        relevantLaws: response.data.relevantLaws,
        sources: response.data.sources || [],
        isFromDatabase: response.data.isFromDatabase || false
      }]);



      // Update usage info
      if (response.data.usage) {
        setUsage(response.data.usage);
      }

      // Update chat ID if it's a new chat
      if (!currentChatId && response.data.chatId) {
        setCurrentChatId(response.data.chatId);
        fetchChatHistory();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      // Handle daily limit reached (429) — show lawyer suggestions modal
      if (error.response?.status === 429) {
        setSuggestedLawyers(error.response.data.suggestedLawyers || []);
        setShowLawyerSuggestions(true);
        errorMessage = error.response.data.message || 'Daily chat limit reached.';
      } else if (error.response?.status === 503) {
        errorMessage = '⚠️ AI service is not configured. Please contact the administrator.';
      } else if (error.response?.status === 401) {
        errorMessage = '🔑 Authentication error. Please log in again.';
      } else if (error.response?.data?.error) {
        errorMessage = `❌ ${error.response.data.error}`;
      }
      
      setMessages(prev => [...prev, {
        role: 'model',
        content: errorMessage,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);

    navigate('/chat');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-slate">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <button
              onClick={startNewChat}
              className="w-full bg-navy text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition mb-4"
            >
              + New Chat
            </button>
            
            <h3 className="text-sm font-semibold text-slate mb-2">Chat History</h3>
            <div className="space-y-2">
              {chatHistory.map(chat => (
                <button
                  key={chat._id}
                  onClick={() => {
                    setCurrentChatId(chat._id);
                    navigate(`/chat/${chat._id}`);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    currentChatId === chat._id
                      ? 'bg-navy text-white'
                      : 'hover:bg-gray-100 text-navy'
                  }`}
                >
                  <div className="font-medium text-sm truncate">{chat.title}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-navy">Lawbook</h2>
                <p className="text-slate text-sm">Your AI Legal Assistant</p>
              </div>
              <div className="flex items-center gap-4">
                {/* Hindi/English toggle */}
                <button
                  onClick={() => setOutputLang(prev => prev === 'en' ? 'hi' : 'en')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                    outputLang === 'hi'
                      ? 'bg-orange-50 border-orange-300 text-orange-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600'
                  }`}
                  title={outputLang === 'hi' ? 'Switch to English output' : 'Switch to Hindi output'}
                >
                  {outputLang === 'hi' ? 'हिंदी' : 'ENG'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
                {/* Export PDF */}
                {messages.length > 0 && (
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 transition"
                    title="Export chat as PDF"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    PDF
                  </button>
                )}
                {/* Usage Info */}
                {usage && (
                  <div className="text-right">
                    <div className="text-sm text-slate">
                      {usage.isFreeTrial ? (
                        <span className="font-semibold text-gold">
                          Free Trial: {usage.remaining} AI chats remaining
                        </span>
                      ) : (
                        <span>
                          Daily Limit: {usage.remaining} chats remaining
                        </span>
                      )}
                    </div>
                    {usage.resetTime && (
                      <div className="text-xs text-gray-500">
                        Resets at midnight
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-navy mb-2">
                  Lawbook
                </h3>
                <p className="text-slate">
                  Ask me anything about Indian Law, IPC, CrPC, or the Constitution
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl px-6 py-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-navy text-white'
                      : 'bg-white border border-gray-200 text-navy'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-headings:text-navy prose-strong:text-navy prose-li:my-0.5">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                  {/* Source badges for RAG responses */}
                  {msg.role === 'model' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-gray-100 space-y-2">
                      {/* Legal section sources */}
                      {msg.sources.filter(s => s.type === 'section' || s.actCode).length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-xs font-semibold text-green-700">📖 Verified Sources:</span>
                          {msg.sources.filter(s => s.type === 'section' || s.actCode).map((src, i) => (
                            <span
                              key={`sec-${i}`}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-800 border border-green-200"
                            >
                              {src.actCode === 'COI' ? 'Art.' : 'Sec.'} {src.section}, {src.actCode}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Court verdict citations */}
                      {msg.sources.filter(s => s.type === 'verdict').length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-xs font-semibold text-purple-700">⚖️ Court Verdicts:</span>
                          {msg.sources.filter(s => s.type === 'verdict').slice(0, 3).map((src, i) => (
                            <span
                              key={`ver-${i}`}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200"
                            >
                              {src.caseName} ({src.year})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {msg.role === 'model' && msg.isFromDatabase === false && (!msg.sources || msg.sources.length === 0) && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-200">
                        ⚠️ General AI knowledge
                      </span>
                    </div>
                  )}
                  <div className={`text-xs mt-2 ${
                    msg.role === 'user' ? 'text-gray-300' : 'text-slate'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-navy px-6 py-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-navy rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-navy rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-navy rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your legal question here..."
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-navy"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="bg-navy text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition disabled:opacity-50 font-semibold"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Lawyer Suggestion Modal */}
      {showLawyerSuggestions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-navy mb-2">
                Daily Chat Limit Reached!
              </h2>
              <p className="text-slate text-lg">
                You've used all your AI chats for today. Connect with verified lawyers or upgrade your plan for more chats!
              </p>
            </div>

            {suggestedLawyers.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-navy mb-4">
                  💼 Recommended Lawyers for You
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {suggestedLawyers.map((lawyer) => (
                    <div
                      key={lawyer._id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-navy transition"
                    >
                      <h4 className="font-semibold text-navy text-lg mb-2">
                        {lawyer.name}
                      </h4>
                      <div className="text-sm text-slate space-y-1">
                        <p>
                          <span className="font-semibold">Specialization:</span>{' '}
                          {lawyer.specialization.join(', ')}
                        </p>
                        <p>
                          <span className="font-semibold">Experience:</span>{' '}
                          {lawyer.experience} years
                        </p>
                        <p>
                          <span className="font-semibold">Rating:</span> {lawyer.rating}⭐
                        </p>
                        <p className="text-green-600 font-semibold">
                          ✓ Free consultation available
                        </p>
                      </div>
                      <button
                        onClick={() => navigate('/lawyers')}
                        className="w-full mt-3 bg-navy text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
                      >
                        Chat with {lawyer.name.split(' ')[0]}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/lawyers')}
                className="flex-1 bg-gold text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Browse All Lawyers (Free)
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="flex-1 bg-navy text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Upgrade Plan
              </button>
              <button
                onClick={() => setShowLawyerSuggestions(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChatInterface;

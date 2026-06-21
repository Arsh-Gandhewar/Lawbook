import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const LawyerChat = () => {
    const { chatId } = useParams();
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatDetails, setChatDetails] = useState(null);
    const [otherPartyName, setOtherPartyName] = useState('Chat');
    const [chatHistory, setChatHistory] = useState([]);

    const messagesEndRef = useRef(null);

    // Poll for new messages every 5 seconds
    useEffect(() => {
        if (!chatId) return;

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/lawyer-chat/${chatId}`);
                setChatDetails(response.data);
                setMessages(response.data.messages);

                // Determine the "other party" name
                if (user) {
                    if (user.role === 'advocate') {
                        setOtherPartyName(response.data.userId?.name || 'Client');
                    } else {
                        setOtherPartyName(response.data.lawyerId?.name || 'Advocate');
                    }
                }
            } catch (error) {
                console.error('Error fetching chat:', error);
                if (error.response?.status === 403 || error.response?.status === 404) {
                    navigate('/dashboard');
                }
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Poll every 5s

        return () => clearInterval(interval);
    }, [chatId, user, navigate]);

    const fetchChatHistory = async () => {
        try {
            const response = await axios.get(`/api/chat/history/${user.id}`);
            setChatHistory(response.data);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchChatHistory();
        }
    }, [user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || loading) return;

        const messageContent = inputMessage;
        setInputMessage('');
        setLoading(true);

        try {
            // Optimistic update
            setMessages(prev => [...prev, {
                role: user.role === 'advocate' ? 'lawyer' : 'user',
                content: messageContent,
                timestamp: new Date(),
                senderId: user.id
            }]);

            await axios.post(`/api/lawyer-chat/${chatId}/message`, {
                message: messageContent
            });

            // The polling will eventually sync the real state
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-2xl text-slate">Loading...</div>
            </div>
        );
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block">
                    <div className="p-4">
                        <button
                            onClick={() => navigate('/chat')}
                            className="w-full bg-navy text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition mb-4"
                        >
                            + New AI Chat
                        </button>

                        <h3 className="text-sm font-semibold text-slate mb-2">Chat History</h3>
                        <div className="space-y-2">
                            {chatHistory.map(chat => (
                                <button
                                    key={chat._id}
                                    onClick={() => {
                                        if (chat.isLawyerChat) {
                                            navigate(`/lawyer-chat/${chat._id}`);
                                        } else {
                                            navigate(`/chat/${chat._id}`);
                                        }
                                    }}
                                    className={`w-full text-left p-3 rounded-lg transition ${chatId === chat._id
                                        ? 'bg-navy text-white'
                                        : 'hover:bg-gray-100 text-navy'
                                        }`}
                                >
                                    <div className="font-medium text-sm truncate">
                                        {chat.isLawyerChat ? '💬 ' : '🤖 '}
                                        {chat.title?.replace(`Chat with ${user?.name} - `, '') || chat.title}
                                    </div>
                                    <div className={`text-xs mt-1 ${chatId === chat._id ? 'text-gray-300' : 'text-slate-400'}`}>
                                        {new Date(chat.updatedAt).toLocaleDateString()}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-white shadow-lg my-8 rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-navy text-white px-6 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                💬 {otherPartyName}
                            </h2>
                            {chatDetails?.title && (
                                <p className="text-sm text-gray-300 truncate max-w-md">
                                    {chatDetails.title}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-gray-300 hover:text-white"
                        >
                            Close
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center py-12 text-slate-500">
                                Start the conversation...
                            </div>
                        )}

                        {messages.map((msg, index) => {
                            const isMe = (user.role === 'advocate' && msg.role === 'lawyer') ||
                                (user.role !== 'advocate' && msg.role === 'user');

                            return (
                                <div
                                    key={msg._id || `msg-${index}`}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${isMe
                                            ? 'bg-navy text-white rounded-tr-none'
                                            : 'bg-white border border-gray-200 text-navy rounded-tl-none shadow-sm'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                        <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-gray-300' : 'text-slate-400'
                                            }`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <form onSubmit={handleSubmit} className="flex gap-4">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !inputMessage.trim()}
                                className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerChat;

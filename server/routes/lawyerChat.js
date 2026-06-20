const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Create a new chat with a lawyer (Free)
router.post('/lawyer/:lawyerId', auth, async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const { message } = req.body;
    const userId = req.user.userId;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get user and lawyer
    const user = await User.findById(userId);
    const lawyer = await User.findOne({ _id: lawyerId, role: 'advocate' });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    // Check if daily reset is needed
    const today = new Date().setHours(0, 0, 0, 0);
    const lastResetDate = new Date(user.chatUsage.daily.date).setHours(0, 0, 0, 0);

    if (today > lastResetDate) {
      user.chatUsage.daily.date = new Date();
      user.chatUsage.daily.lawyerChatsUsed = 0;
      console.log(`Daily lawyer chat limit reset for user ${user.email}`);
    }

    // Check daily limits
    if (user.chatUsage.daily.lawyerChatsUsed >= user.chatUsage.dailyLimits.lawyerChatLimit) {
      return res.status(429).json({
        error: 'Daily lawyer chat limit reached',
        message: `You've reached your daily limit of ${user.chatUsage.dailyLimits.lawyerChatLimit} lawyer chats. Your limit will reset tomorrow.`,
        resetTime: new Date(new Date().setHours(24, 0, 0, 0))
      });
    }

    // Create new chat
    const chat = new Chat({
      userId,
      title: `Chat with ${lawyer.name} - ${message.substring(0, 30)}...`,
      messages: [{
        role: 'user',
        content: message,
        timestamp: new Date()
      }],
      lawyerId: lawyerId,
      isLawyerChat: true
    });

    await chat.save();

    // Increment lawyer chat usage
    user.chatUsage.daily.lawyerChatsUsed += 1;
    await user.save();

    const remaining = user.chatUsage.dailyLimits.lawyerChatLimit - user.chatUsage.daily.lawyerChatsUsed;
    const isFreeTrial = user.subscription.paymentId === 'free_trial';

    res.status(201).json({
      chatId: chat._id,
      message: 'Chat created successfully. The lawyer will respond soon.',
      lawyer: {
        id: lawyer._id,
        name: lawyer.name,
        specialization: lawyer.specialization,
        rating: lawyer.rating
      },
      usage: {
        remaining,
        isFreeTrial,
        resetTime: isFreeTrial ? null : new Date(new Date().setHours(24, 0, 0, 0))
      }
    });
  } catch (error) {
    console.error('Error creating lawyer chat:', error);
    res.status(500).json({ error: 'Failed to create chat with lawyer' });
  }
});

// Send message in existing lawyer chat
router.post('/:chatId/message', auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;
    const userId = req.user.userId;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Check if user is part of this chat (either client or lawyer)
    const user = await User.findById(userId);
    if (chat.userId.toString() !== userId && chat.lawyerId?.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this chat' });
    }

    // Add message
    chat.messages.push({
      role: user.role === 'advocate' ? 'lawyer' : 'user',
      content: message,
      timestamp: new Date(),
      senderId: userId
    });

    chat.updatedAt = new Date();
    await chat.save();

    res.json({
      chatId: chat._id,
      message: 'Message sent successfully',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get lawyer chats for a user
router.get('/user/chats', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const chats = await Chat.find({
      userId,
      isLawyerChat: true
    })
      .populate('lawyerId', 'name specialization rating profileImage')
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    console.error('Error fetching lawyer chats:', error);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// Get chats for lawyer (incoming client messages)
router.get('/lawyer/incoming', auth, async (req, res) => {
  try {
    const lawyerId = req.user.userId;

    // Verify user is a lawyer
    const lawyer = await User.findById(lawyerId);
    if (lawyer.role !== 'advocate') {
      return res.status(403).json({ error: 'Access denied. Only lawyers can access this.' });
    }

    const chats = await Chat.find({
      lawyerId,
      isLawyerChat: true
    })
      .populate('userId', 'name email phone')
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    console.error('Error fetching incoming chats:', error);
    res.status(500).json({ error: 'Failed to fetch incoming chats' });
  }
});

// Get specific lawyer chat
router.get('/:chatId', auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.userId;

    const chat = await Chat.findById(chatId)
      .populate('userId', 'name email')
      .populate('lawyerId', 'name specialization rating');

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Check authorization
    if (chat.userId._id.toString() !== userId && chat.lawyerId?._id.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    res.json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
});

module.exports = router;

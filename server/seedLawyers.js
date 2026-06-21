/**
 * LAWBOOK - Seed Sample Verified Lawyers
 * 
 * Inserts sample verified advocate profiles into the database
 * so the "Find an Advocate" and "Recommended Lawyers" sections work.
 * 
 * Usage:  node server/seedLawyers.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sampleLawyers = [
  {
    name: 'Adv. Priya Sharma',
    email: 'priya.sharma@lawbook.in',
    password: 'Lawyer@123',
    phone: '9876543210',
    role: 'advocate',
    specialization: ['Criminal', 'Family'],
    qualification: 'LLB, LLM (Criminal Law)',
    barCouncilId: 'MH/1234/2018',
    experience: 8,
    rating: 4.7,
    totalReviews: 32,
    isVerified: true,
    consultationFee: 500,
    bio: 'Experienced criminal and family law advocate with 8+ years of practice in the Bombay High Court. Specializes in bail matters, domestic violence cases, and divorce proceedings.',
    availabilitySlots: [
      { dayOfWeek: 'Monday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 'Wednesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 'Friday', startTime: '10:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 'Saturday', startTime: '11:00', endTime: '14:00', isAvailable: true },
      { dayOfWeek: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    isEmailVerified: true
  },
  {
    name: 'Adv. Rajesh Mehta',
    email: 'rajesh.mehta@lawbook.in',
    password: 'Lawyer@123',
    phone: '9876543211',
    role: 'advocate',
    specialization: ['Corporate', 'Tax'],
    qualification: 'LLB, CS, LLM (Corporate Law)',
    barCouncilId: 'MH/2345/2015',
    experience: 12,
    rating: 4.9,
    totalReviews: 58,
    isVerified: true,
    consultationFee: 1500,
    bio: 'Senior corporate lawyer with expertise in mergers & acquisitions, company incorporation, GST compliance, and income tax disputes. Former legal counsel at a Fortune 500 firm.',
    availabilitySlots: [
      { dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 'Friday', startTime: '09:00', endTime: '15:00', isAvailable: true },
      { dayOfWeek: 'Saturday', startTime: '00:00', endTime: '00:00', isAvailable: false },
      { dayOfWeek: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    isEmailVerified: true
  },
  {
    name: 'Adv. Sneha Kulkarni',
    email: 'sneha.kulkarni@lawbook.in',
    password: 'Lawyer@123',
    phone: '9876543212',
    role: 'advocate',
    specialization: ['Family', 'Property'],
    qualification: 'LLB, LLM (Family Law)',
    barCouncilId: 'MH/3456/2019',
    experience: 6,
    rating: 4.5,
    totalReviews: 21,
    isVerified: true,
    consultationFee: 400,
    bio: 'Passionate family and property law practitioner. Handles cases involving Hindu marriage disputes, mutual consent divorce, property partition, and tenant eviction matters.',
    availabilitySlots: [
      { dayOfWeek: 'Monday', startTime: '11:00', endTime: '19:00', isAvailable: true },
      { dayOfWeek: 'Tuesday', startTime: '11:00', endTime: '19:00', isAvailable: true },
      { dayOfWeek: 'Wednesday', startTime: '11:00', endTime: '19:00', isAvailable: true },
      { dayOfWeek: 'Thursday', startTime: '11:00', endTime: '19:00', isAvailable: true },
      { dayOfWeek: 'Friday', startTime: '11:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 'Saturday', startTime: '10:00', endTime: '15:00', isAvailable: true },
      { dayOfWeek: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    isEmailVerified: true
  },
  {
    name: 'Adv. Amit Deshmukh',
    email: 'amit.deshmukh@lawbook.in',
    password: 'Lawyer@123',
    phone: '9876543213',
    role: 'advocate',
    specialization: ['Criminal', 'Civil'],
    qualification: 'LLB, Diploma in Cyber Law',
    barCouncilId: 'MH/4567/2016',
    experience: 10,
    rating: 4.6,
    totalReviews: 45,
    isVerified: true,
    consultationFee: 800,
    bio: 'Seasoned litigator practicing in the District & Sessions Court and High Court. Handles FIR quashing, anticipatory bail, cheating and fraud cases, and civil property disputes.',
    availabilitySlots: [
      { dayOfWeek: 'Monday', startTime: '09:30', endTime: '17:30', isAvailable: true },
      { dayOfWeek: 'Tuesday', startTime: '09:30', endTime: '17:30', isAvailable: true },
      { dayOfWeek: 'Wednesday', startTime: '09:30', endTime: '17:30', isAvailable: true },
      { dayOfWeek: 'Thursday', startTime: '09:30', endTime: '17:30', isAvailable: true },
      { dayOfWeek: 'Friday', startTime: '09:30', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 'Saturday', startTime: '10:00', endTime: '13:00', isAvailable: true },
      { dayOfWeek: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    isEmailVerified: true
  },
  {
    name: 'Adv. Neha Patil',
    email: 'neha.patil@lawbook.in',
    password: 'Lawyer@123',
    phone: '9876543214',
    role: 'advocate',
    specialization: ['Property', 'Civil'],
    qualification: 'LLB, LLM (Property Law)',
    barCouncilId: 'MH/5678/2017',
    experience: 9,
    rating: 4.8,
    totalReviews: 37,
    isVerified: true,
    consultationFee: 600,
    bio: 'Property law specialist with deep expertise in RERA disputes, land acquisition compensation, title verification, and transfer of property matters. Regularly appears before RERA tribunals.',
    availabilitySlots: [
      { dayOfWeek: 'Monday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 'Wednesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 'Friday', startTime: '10:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 'Saturday', startTime: '00:00', endTime: '00:00', isAvailable: false },
      { dayOfWeek: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    isEmailVerified: true
  }
];

async function seedLawyers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const lawyerData of sampleLawyers) {
      // Check if already exists
      const exists = await User.findOne({ email: lawyerData.email });
      if (exists) {
        console.log(`  [SKIP] ${lawyerData.name} already exists`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(lawyerData.password, 10);
      const lawyer = new User({
        ...lawyerData,
        password: hashedPassword
      });

      await lawyer.save();
      console.log(`  [OK] Added ${lawyerData.name} (${lawyerData.specialization.join(', ')})`);
    }

    const total = await User.countDocuments({ role: 'advocate', isVerified: true });
    console.log(`\nTotal verified advocates in database: ${total}`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error seeding lawyers:', error);
    process.exit(1);
  }
}

seedLawyers();

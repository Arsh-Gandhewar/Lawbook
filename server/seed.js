// Seed script to populate database with sample data
// Run with: node server/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to Lawbook DB'))
.catch(err => {
  console.error('❌ DB Connection Error:', err);
  process.exit(1);
});

// Models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String,
  specialization: [String],
  barCouncilId: String,
  experience: Number,
  rating: Number,
  totalReviews: Number,
  isVerified: Boolean,
  consultationFee: Number,
  bio: String,
  profileImage: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function seedDatabase() {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Admin User
    console.log('👨‍💼 Creating admin user...');
    const admin = new User({
      name: 'Admin User',
      email: 'admin@lawbook.com',
      password: hashedPassword,
      phone: '+91-9999999999',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Admin created - Email: admin@lawbook.com, Password: password123');

    // Create Regular Users
    console.log('👥 Creating regular users...');
    const users = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: hashedPassword,
        phone: '+91-9876543210',
        role: 'user'
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: hashedPassword,
        phone: '+91-9876543211',
        role: 'user'
      }
    ];

    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ User created - ${userData.email}`);
    }

    // Create Verified Advocates
    console.log('👨‍⚖️  Creating verified advocates...');
    const advocates = [
      {
        name: 'Adv. Vikram Singh',
        email: 'vikram.singh@lawfirm.com',
        password: hashedPassword,
        phone: '+91-9876543220',
        role: 'advocate',
        specialization: ['Criminal', 'Civil'],
        barCouncilId: 'BCI/D/12345',
        experience: 12,
        rating: 4.8,
        totalReviews: 156,
        isVerified: true,
        consultationFee: 2000,
        bio: 'Senior Criminal and Civil Law specialist with over 12 years of experience. Successfully handled 500+ cases in Supreme Court and High Courts.'
      },
      {
        name: 'Adv. Meera Patel',
        email: 'meera.patel@advocates.in',
        password: hashedPassword,
        phone: '+91-9876543221',
        role: 'advocate',
        specialization: ['Corporate', 'Tax'],
        barCouncilId: 'BCI/M/67890',
        experience: 8,
        rating: 4.9,
        totalReviews: 89,
        isVerified: true,
        consultationFee: 3500,
        bio: 'Corporate law expert specializing in M&A, contracts, and tax compliance. Advised 100+ startups and corporations.'
      },
      {
        name: 'Adv. Arjun Reddy',
        email: 'arjun.reddy@legal.com',
        password: hashedPassword,
        phone: '+91-9876543222',
        role: 'advocate',
        specialization: ['Family', 'Civil'],
        barCouncilId: 'BCI/H/11223',
        experience: 15,
        rating: 4.7,
        totalReviews: 234,
        isVerified: true,
        consultationFee: 1500,
        bio: 'Compassionate Family Law practitioner. Specialized in divorce, child custody, and matrimonial disputes. Known for mediation skills.'
      },
      {
        name: 'Adv. Ananya Iyer',
        email: 'ananya.iyer@chambers.in',
        password: hashedPassword,
        phone: '+91-9876543223',
        role: 'advocate',
        specialization: ['Property', 'Civil'],
        barCouncilId: 'BCI/K/44556',
        experience: 10,
        rating: 4.6,
        totalReviews: 112,
        isVerified: true,
        consultationFee: 2500,
        bio: 'Property and Real Estate law expert. Handled complex land disputes, property transactions, and title verification.'
      },
      {
        name: 'Adv. Rohit Malhotra',
        email: 'rohit.malhotra@legal.in',
        password: hashedPassword,
        phone: '+91-9876543224',
        role: 'advocate',
        specialization: ['Criminal'],
        barCouncilId: 'BCI/D/77889',
        experience: 20,
        rating: 4.9,
        totalReviews: 445,
        isVerified: true,
        consultationFee: 5000,
        bio: 'Renowned Criminal Defense lawyer. Former Public Prosecutor. Expertise in white-collar crimes, cyber crimes, and criminal appeals.'
      }
    ];

    for (const advocateData of advocates) {
      const advocate = new User(advocateData);
      await advocate.save();
      console.log(`✅ Advocate created - ${advocateData.email} (${advocateData.specialization.join(', ')})`);
    }

    // Create Pending Advocates (for admin approval)
    console.log('⏳ Creating pending advocates...');
    const pendingAdvocates = [
      {
        name: 'Adv. Sanjay Gupta',
        email: 'sanjay.gupta@legal.com',
        password: hashedPassword,
        phone: '+91-9876543225',
        role: 'advocate',
        specialization: ['Tax', 'Corporate'],
        barCouncilId: 'BCI/D/99001',
        experience: 5,
        rating: 0,
        totalReviews: 0,
        isVerified: false,
        consultationFee: 1800,
        bio: 'Young and dynamic tax lawyer with focus on GST and Income Tax matters.'
      },
      {
        name: 'Adv. Kavita Nair',
        email: 'kavita.nair@advocates.in',
        password: hashedPassword,
        phone: '+91-9876543226',
        role: 'advocate',
        specialization: ['Family'],
        barCouncilId: 'BCI/K/99002',
        experience: 3,
        rating: 0,
        totalReviews: 0,
        isVerified: false,
        consultationFee: 1200,
        bio: 'Dedicated to helping families resolve conflicts through legal counseling and mediation.'
      }
    ];

    for (const advocateData of pendingAdvocates) {
      const advocate = new User(advocateData);
      await advocate.save();
      console.log(`✅ Pending advocate created - ${advocateData.email}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('─────────────────────────────────────');
    console.log('Admin:');
    console.log('  Email: admin@lawbook.com');
    console.log('  Password: password123');
    console.log('\nRegular Users:');
    console.log('  Email: rajesh@example.com / priya@example.com');
    console.log('  Password: password123');
    console.log('\nVerified Advocates:');
    console.log('  Email: vikram.singh@lawfirm.com (Criminal, Civil)');
    console.log('  Email: meera.patel@advocates.in (Corporate, Tax)');
    console.log('  Email: arjun.reddy@legal.com (Family, Civil)');
    console.log('  Email: ananya.iyer@chambers.in (Property, Civil)');
    console.log('  Email: rohit.malhotra@legal.in (Criminal)');
    console.log('  Password: password123 (for all)');
    console.log('\nPending Advocates (need admin approval):');
    console.log('  Email: sanjay.gupta@legal.com');
    console.log('  Email: kavita.nair@advocates.in');
    console.log('  Password: password123 (for all)');
    console.log('─────────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

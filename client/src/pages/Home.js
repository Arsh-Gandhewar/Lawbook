import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { startFreeTrial } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleTryFreeNow = async () => {
    setLoading(true);
    const result = await startFreeTrial();
    
    if (result.success) {
      // Direct redirect to chat
      navigate('/chat');
    } else {
      // If error, go to register-free page as fallback
      navigate('/register-free');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* hero */}
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ask a legal question. Get a real answer.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Lawbook covers IPC, BNS, CrPC, Constitution and 90+ Indian statutes — with 35,000 Supreme Court judgments to back it up.
            </p>
            
            <div className="mb-10">
              <div className="text-8xl">⚖️</div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={handleTryFreeNow}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg w-full sm:w-auto"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Starting...
                  </span>
                ) : (
                  'Try Free — No Signup'
                )}
              </button>
              <Link
                to="/lawyers"
                className="bg-white text-navy px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg w-full sm:w-auto"
              >
                Find an Advocate
              </Link>
              <Link
                to="/pricing"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-navy transition w-full sm:w-auto"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Ask Anything About Indian Law"
              description="Covers IPC, BNS 2023, CrPC, BNSS, Hindu Marriage Act, Consumer Protection, Motor Vehicles Act and 85+ more statutes."
            />
            <FeatureCard
              icon="📹"
              title="Talk to a Verified Advocate"
              description="Book a video call with Bar Council-verified lawyers. Pay only for the time you use."
            />
            <FeatureCard
              icon="📑"
              title="35,000+ SC Judgments"
              description="Every Supreme Court judgment from 1950 to 2025 is searchable. Get relevant case citations in your answers."
            />
          </div>
        </div>
      </section>

      {/* pricing */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Plans
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start free with 10 AI chats, upgrade if you need more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* basic */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Citizen Basic
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  10 AI chats/day + basic doc review
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-slate-900">
                      ₹499
                    </span>
                    <span className="text-slate-600 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">AI Legal Chatbot Access</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Basic Document Review</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">5 Consultations/Month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Email Support</span>
                  </li>
                </ul>
                <div className="space-y-2 mt-auto">
                  <Link
                    to="/pricing"
                    className="block w-full py-3 px-6 rounded-lg font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-all duration-200 text-center"
                  >
                    Choose Plan
                  </Link>
                </div>
              </div>
            </div>

            {/* standard */}
            <div className="relative flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ring-2 ring-blue-500">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-xs font-bold">
                Most Popular
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Business Standard
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Unlimited AI chats + video consultations + priority support
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-slate-900">
                      ₹1499
                    </span>
                    <span className="text-slate-600 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Everything in Basic</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Priority AI Responses</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Unlimited Consultations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Video Call Support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Document Templates</span>
                  </li>
                </ul>
                <div className="space-y-2 mt-auto">
                  <Link
                    to="/pricing"
                    className="block w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 text-center shadow-lg"
                  >
                    Choose Plan
                  </Link>
                </div>
              </div>
            </div>

            {/* advocate */}
            <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Advocate Pro
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  For advocates and legal professionals
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-slate-900">
                      ₹2999
                    </span>
                    <span className="text-slate-600 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Everything in Standard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Dedicated Account Manager</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Advanced AI Legal Research</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Client Management Dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700 text-sm">Professional Profile Listing</span>
                  </li>
                </ul>
                <div className="space-y-2 mt-auto">
                  <Link
                    to="/pricing"
                    className="block w-full py-3 px-6 rounded-lg font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-all duration-200 text-center"
                  >
                    Choose Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-navy text-center mb-12">
            How it works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-1">Type what happened</h3>
                  <p className="text-slate">
                    Describe your situation in plain Hindi or English. No legal jargon needed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-1">Get the relevant laws and cases</h3>
                  <p className="text-slate">
                    Lawbook finds the exact sections from IPC, BNS, CrPC, Constitution etc. and cites Supreme Court judgments where applicable.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-1">Talk to a lawyer if you need one</h3>
                  <p className="text-slate">
                    Not sure about something? Book a video call with a verified advocate who specializes in your area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-navy text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Lawbook — IPC, BNS, CrPC, Constitution & 90+ Indian statutes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

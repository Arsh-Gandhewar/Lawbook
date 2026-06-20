import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const VideoCall = () => {
  const { appointmentId } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (appointmentId) {
      fetchAppointment();
    } else {
      setError('No appointment ID provided');
      setLoading(false);
    }
  }, [appointmentId]);

  const fetchAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to access this meeting.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`/api/appointments/${appointmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.status !== 'confirmed') {
        setError('This appointment is not confirmed yet.');
        setLoading(false);
        return;
      }

      setAppointment(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      setError(error.response?.data?.error || 'Failed to load appointment details.');
      setLoading(false);
    }
  };

  const handleMeetingEnd = () => {
    navigate('/dashboard');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-slate">Loading meeting...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <div className="text-2xl text-navy font-bold mb-2">{error}</div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition mt-4"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-navy flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy">Legal Consultation</h2>
            <p className="text-slate">
              {user.role === 'user' 
                ? `with ${appointment.lawyerId?.name}`
                : `with ${appointment.userId?.name}`
              }
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-slate text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Video Call */}
      <div className="flex-1 relative">
        {appointment && appointment.meetingLink ? (
          <div className="absolute inset-0">
            <JitsiMeeting
              domain="meet.jit.si"
              roomName={appointment.meetingLink}
              configOverwrite={{
                startWithAudioMuted: false,
                startWithVideoMuted: false,
                disableThirdPartyRequests: true,
                prejoinPageEnabled: false,
                enableWelcomePage: false,
                enableClosePage: false,
                hideConferenceSubject: false,
                subject: 'Lawbook Legal Consultation',
                toolbarButtons: [
                  'microphone',
                  'camera',
                  'closedcaptions',
                  'desktop',
                  'fullscreen',
                  'fodeviceselection',
                  'hangup',
                  'profile',
                  'chat',
                  'recording',
                  'livestreaming',
                  'etherpad',
                  'sharedvideo',
                  'settings',
                  'raisehand',
                  'videoquality',
                  'filmstrip',
                  'invite',
                  'feedback',
                  'stats',
                  'shortcuts',
                  'tileview',
                  'download',
                  'help',
                  'mute-everyone',
                ],
              }}
              interfaceConfigOverwrite={{
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                MOBILE_APP_PROMO: false,
              }}
              userInfo={{
                displayName: user.name,
                email: user.email
              }}
              onReadyToClose={handleMeetingEnd}
              getIFrameRef={(iframeRef) => {
                if (iframeRef) {
                  // Force iframe to fill container completely
                  iframeRef.style.width = '100%';
                  iframeRef.style.height = '100%';
                  iframeRef.style.border = 'none';
                  iframeRef.style.position = 'absolute';
                  iframeRef.style.top = '0';
                  iframeRef.style.left = '0';
                }
              }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-xl">No meeting link available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;

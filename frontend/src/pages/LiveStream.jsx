import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MicrophoneIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  HandRaisedIcon,
  PhoneXMarkIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';

const LiveStream = () => {
  const [meetingJoined, setMeetingJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const zoomContainerRef = useRef(null);
  
  // Zoom meeting configuration
  const meetingConfig = {
    sdkKey: 'YOUR_ZOOM_SDK_KEY', // Replace with your Zoom SDK key
    meetingNumber: '123456789',
    userName: 'Student',
    userEmail: 'student@example.com',
    passWord: 'meeting_password',
    role: 0, // 0 for participant, 1 for host
    signature: 'YOUR_ZOOM_SIGNATURE' // Generate this server-side
  };
  
  useEffect(() => {
    // Load Zoom Web SDK
    const script = document.createElement('script');
    script.src = 'https://source.zoom.us/2.18.0/lib/vendor/react.min.js';
    script.async = true;
    document.head.appendChild(script);
    
    const zoomScript = document.createElement('script');
    zoomScript.src = 'https://source.zoom.us/zoom-meeting-2.18.0.min.js';
    zoomScript.async = true;
    document.head.appendChild(zoomScript);
    
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(zoomScript);
    };
  }, []);
  
  const joinMeeting = () => {
    setIsLoading(true);
    
    // Initialize Zoom Web SDK
    if (window.ZoomMtg) {
      window.ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
      window.ZoomMtg.preLoadWasm();
      window.ZoomMtg.prepareWebSDK();
      
      window.ZoomMtg.init({
        leaveUrl: window.location.origin + '/live-classes',
        success: () => {
          window.ZoomMtg.join({
            signature: meetingConfig.signature,
            sdkKey: meetingConfig.sdkKey,
            meetingNumber: meetingConfig.meetingNumber,
            userName: meetingConfig.userName,
            userEmail: meetingConfig.userEmail,
            passWord: meetingConfig.passWord,
            role: meetingConfig.role,
            success: () => {
              setMeetingJoined(true);
              setIsLoading(false);
            },
            error: (error) => {
              console.error('Zoom join error:', error);
              setIsLoading(false);
            }
          });
        },
        error: (error) => {
          console.error('Zoom init error:', error);
          setIsLoading(false);
        }
      });
    }
  };

  const participants = [
    { id: 1, name: 'Dr. Priya Sharma', role: 'Instructor', avatar: 'P', isHost: true },
    { id: 2, name: 'Rahul Kumar', role: 'Student', avatar: 'R' },
    { id: 3, name: 'Priya Singh', role: 'Student', avatar: 'P' },
    { id: 4, name: 'Amit Patel', role: 'Student', avatar: 'A' },
    { id: 5, name: 'Sneha Gupta', role: 'Student', avatar: 'S' }
  ];

  const chatMessages = [
    { id: 1, user: 'Dr. Priya', message: 'Welcome everyone! We will start with breathing exercises.', time: '7:05 PM' },
    { id: 2, user: 'Rahul', message: 'Thank you for this session!', time: '7:06 PM' },
    { id: 3, user: 'Priya', message: 'Can you please explain the first kosha again?', time: '7:08 PM' },
    { id: 4, user: 'Dr. Priya', message: 'Of course! The Annamaya kosha is the physical body...', time: '7:09 PM' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-blue-900 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Panchakosha Meditation - Live Class</h1>
          <p className="text-blue-200 text-sm">with Dr. Priya Sharma • Starting at 7:00 PM IST</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Ready to Join</span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {!meetingJoined ? (
            /* Pre-Meeting Screen */
            <div className="flex-1 bg-gradient-to-br from-blue-800 to-indigo-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="text-8xl mb-6">🧘♀️</div>
                  <div className="text-3xl font-bold mb-4">Join Live Meditation Class</div>
                  <div className="text-blue-200 mb-8">Click below to join the live session with Dr. Priya Sharma</div>
                  
                  <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="text-sm text-blue-200 mb-2">Meeting Details:</div>
                    <div className="text-white font-medium">Meeting ID: {meetingConfig.meetingNumber}</div>
                    <div className="text-blue-200 text-sm">Panchakosha Meditation Session</div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    onClick={joinMeeting}
                    disabled={isLoading}
                    className="w-full mb-4"
                  >
                    {isLoading ? 'Connecting...' : 'Join Zoom Meeting'}
                  </Button>
                  
                  <div className="text-sm text-blue-200">
                    ℹ️ Meeting will open in embedded Zoom window
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Zoom Meeting Container */
            <div className="flex-1 relative">
              <div 
                ref={zoomContainerRef}
                id="zmmtg-root"
                className="w-full h-full"
              >
                {/* Zoom Web SDK will render here */}
              </div>
            </div>
          )}

          {!meetingJoined && (
            /* Class Info - Only show when not in meeting */
            <div className="bg-gray-800 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-sm text-gray-400">Date</div>
                  <div className="font-medium">Dec 28, 2024</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">⏰</div>
                  <div className="text-sm text-gray-400">Time</div>
                  <div className="font-medium">7:00 - 8:30 PM IST</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-sm text-gray-400">Participants</div>
                  <div className="font-medium">45 enrolled</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {!meetingJoined && (
          /* Instructions Sidebar - Only show when not in meeting */
          <div className="w-80 bg-gray-800 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <VideoCameraIcon className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Class Instructions</h3>
              </div>
            </div>

            {/* Instructions */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-blue-900/50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-blue-200">Before Joining:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Find a quiet space</li>
                  <li>• Test your audio/video</li>
                  <li>• Keep water nearby</li>
                  <li>• Wear comfortable clothes</li>
                </ul>
              </div>
              
              <div className="bg-green-900/50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-green-200">During Class:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Mute yourself when not speaking</li>
                  <li>• Use chat for questions</li>
                  <li>• Follow instructor's guidance</li>
                  <li>• Stay present and focused</li>
                </ul>
              </div>
              
              <div className="bg-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-purple-200">Technical Support:</h4>
                <p className="text-sm text-gray-300 mb-2">Having issues? Contact us:</p>
                <div className="text-sm text-blue-400">
                  📞 +91 9876543210<br/>
                  📧 support@ayurvedaacademy.com
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStream;
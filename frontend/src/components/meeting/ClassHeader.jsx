import { useState } from 'react';
import {
  MicrophoneIcon,
  VideoCameraIcon,
  PhoneXMarkIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
  MicrophoneIcon as MicrophoneIconSolid,
  VideoCameraSlashIcon,
} from '@heroicons/react/24/solid';

const ClassHeader = ({ 
  meetingTitle, 
  courseTitle, 
  participantCount, 
  duration,
  onLeaveMeeting,
  onToggleChat,
  onToggleNotes,
  showChat,
  showNotes 
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-700">
      {/* Meeting Info */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-lg font-semibold">{meetingTitle}</h1>
          <p className="text-sm text-gray-300">{courseTitle}</p>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-300">
          <div className="flex items-center space-x-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{participantCount} participants</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Duration: {formatDuration(duration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3">
        {/* Audio Control */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 rounded-full transition-colors ${
            isMuted 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <MicrophoneIconSolid className="w-5 h-5" />
          ) : (
            <MicrophoneIcon className="w-5 h-5" />
          )}
        </button>

        {/* Video Control */}
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-3 rounded-full transition-colors ${
            isVideoOff 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
        >
          {isVideoOff ? (
            <VideoCameraSlashIcon className="w-5 h-5" />
          ) : (
            <VideoCameraIcon className="w-5 h-5" />
          )}
        </button>

        {/* Chat Toggle */}
        <button
          onClick={onToggleChat}
          className={`p-3 rounded-full transition-colors ${
            showChat 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          title="Toggle Chat"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
        </button>

        {/* Notes Toggle */}
        <button
          onClick={onToggleNotes}
          className={`p-3 rounded-full transition-colors ${
            showNotes 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          title="Toggle Notes"
        >
          <DocumentTextIcon className="w-5 h-5" />
        </button>

        {/* Settings */}
        <button
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          title="Settings"
        >
          <Cog6ToothIcon className="w-5 h-5" />
        </button>

        {/* Leave Meeting */}
        <button
          onClick={onLeaveMeeting}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center space-x-2"
          title="Leave Meeting"
        >
          <PhoneXMarkIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Leave</span>
        </button>
      </div>
    </div>
  );
};

export default ClassHeader;
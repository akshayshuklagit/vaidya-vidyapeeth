import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import ClassHeader from "./meeting/ClassHeader";
import NotesPanel from "./meeting/NotesPanel";
import ZoomMeeting from "./meeting/ZoomMeeting";
import ChatPanel from "./meeting/ChatPanel";
import { useAuth } from "@/contexts/AuthContext";

const LiveClassroomPage = () => {
  const { state } = useLocation();
  const { auth } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  if (!state?.meetingNumber || !state?.signature) {
    return <Navigate to="/dashboard/live-classes" replace />;
  }

  const handleLeaveMeeting = () => {
    if (window.confirm("Are you sure you want to leave the meeting?")) {
      window.location.href = "/dashboard/live-classes";
    }
  };

  return (
    <div className="flex flex-col h-screen w-full  bg-black overflow-hidden">
      {/* Header */}
      <div className="z-50 h-16 shrink-0 ">
        <ClassHeader
          meetingTitle={state.title || "Live Class"}
          courseTitle={state.courseTitle || "Ayurveda Course"}
          participantCount={state.participantCount || 1}
          duration={state.duration || 60}
          onLeaveMeeting={handleLeaveMeeting}
          onToggleChat={() => setShowChat(!showChat)}
          onToggleNotes={() => setShowNotes(!showNotes)}
          showChat={showChat}
          showNotes={showNotes}
        />
      </div>
      {/* 🔽 Zoom background */}
      <div className="flex-1 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-10">
          <ZoomMeeting
            meetingNumber={state.meetingNumber}
            password={state.password}
            signature={state.signature}
            sdkKey={state.sdkKey}
            userName={state.userName}
            userEmail={state.userEmail}
          />
        </div>

        {(showChat || showNotes) && (
          <div className="absolute inset-y-0  right-0  z-40 flex pointer-events-none">
            <div className="pointer-events-auto flex">
              <ChatPanel
                isVisible={showChat}
                meetingId={state.meetingId}
                userName={auth?.user?.name || "Student"}
              />
              <NotesPanel
                isVisible={showNotes}
                meetingTitle={state.title || "Live Class"}
                courseTitle={state.courseTitle || "Ayurveda Course"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClassroomPage;

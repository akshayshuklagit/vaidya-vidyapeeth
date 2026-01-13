// components/meeting/ZoomMeeting.jsx
import { useEffect, useRef, useState } from "react";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

const ZoomMeeting = ({
  meetingNumber,
  password,
  signature,
  sdkKey,
  userName,
  userEmail,
}) => {
  const meetingRef = useRef(null);
  const clientRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!meetingRef.current || !signature) return;

    let client;

    const initZoom = async (width, height) => {
      client = ZoomMtgEmbedded.createClient();
      try {
        await client.init({
          zoomAppRoot: meetingRef.current,
          language: "en-US",
          customize: {
            video: {
              isResizable: true,
              viewSizes: {
                default: {
                  width: Math.floor(width),
                  height: Math.floor(height),
                },
              },
            },
          },
        });

        await client.join({
          meetingNumber: Number(meetingNumber),
          signature,
          sdkKey,
          userName,
          password,
        });
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    // Use a temporary observer to wait for the div to have size
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          initZoom(width, height);
          observer.disconnect(); // Only init once
        }
      }
    });

    observer.observe(meetingRef.current);

    return () => {
      observer.disconnect();
      if (client) client.leaveMeeting();
    };
  }, [signature]);

  return (
    <div id="zoom-meeting-wrapper" className="w-full h-full bg-black ">
      <div ref={meetingRef} className="w-full h-full" />

      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" />
        </div>
      )}
    </div>
  );
};

export default ZoomMeeting;

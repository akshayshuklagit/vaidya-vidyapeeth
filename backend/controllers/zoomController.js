import jwt from "jsonwebtoken";
import axios from "axios";
import asyncHandler from "../middlewares/asyncHandler.js";
import Meeting from "../models/Meeting.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";

// Generate Zoom OAuth token
const getZoomAccessToken = async () => {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const response = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Zoom token error:", error.response?.data || error.message);
    throw new Error("Failed to get Zoom access token");
  }
};

// @desc    Create a new Zoom meeting
// @route   POST /api/zoom/meetings
// @access  Private (Admin only)
const createMeeting = asyncHandler(async (req, res) => {
  const { courseId, title, description, scheduledAt, duration = 60 } = req.body;

  // Verify course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ success: false, error: "Course not found" });
  }

  try {
    const accessToken = await getZoomAccessToken();

    // Create meeting on Zoom
    const zoomResponse = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: title || `${course.title} - Live Class`,
        type: 2, // Scheduled meeting
        start_time: new Date(scheduledAt).toISOString(),
        duration: duration,
        timezone: "Asia/Kolkata",
        password: Math.random().toString(36).substring(2, 10),
        settings: {
          host_video: true,
          participant_video: false,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: true,
          auto_recording: "cloud",
          allow_multiple_devices: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Save meeting to database
    const meeting = new Meeting({
      courseId,
      title: title || `${course.title} - Live Class`,
      description,
      zoomMeetingId: zoomResponse.data.id.toString(),
      zoomPassword: zoomResponse.data.password,
      joinUrl: zoomResponse.data.join_url,
      startUrl: zoomResponse.data.start_url,
      scheduledAt: new Date(scheduledAt),
      duration,
      hostId: req.user._id,
    });

    await meeting.save();

    // Auto-register all enrolled students
    const enrollments = await Enrollment.find({ courseId, status: "active" });
    const participants = enrollments.map((enrollment) => ({
      userId: enrollment.userId,
      registeredAt: new Date(),
    }));

    meeting.registeredParticipants = participants;
    await meeting.save();

    res.status(201).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    console.error(
      "Meeting creation error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: "Failed to create meeting",
    });
  }
});

// @desc    Get meetings for a course
// @route   GET /api/zoom/courses/:courseId/meetings
// @access  Private
const getCourseMeetings = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { status } = req.query;

  const query = { courseId };
  if (status) query.status = status;

  const meetings = await Meeting.find(query)
    .populate("hostId", "name email")
    .populate("courseId", "title")
    .sort({ scheduledAt: 1 });

  res.status(200).json({
    success: true,
    data: meetings,
  });
});

// @desc    Start a meeting (for hosts)
// @route   POST /api/zoom/meetings/:id/start
// @access  Private (Host only)
const startMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).json({ success: false, error: "Meeting not found" });
  }

  // Check if user is the host
  if (meeting.hostId.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ success: false, error: "Only the host can start the meeting" });
  }

  // Update meeting status
  meeting.status = "live";
  await meeting.save();

  // Send notifications to registered participants
  await sendMeetingNotifications(meeting._id, "started");

  res.status(200).json({
    success: true,
    data: {
      startUrl: meeting.startUrl,
      meetingId: meeting.zoomMeetingId,
      password: meeting.zoomPassword,
    },
  });
});

// @desc    Join a meeting (for participants)
// @route   GET /api/zoom/meetings/:id/join
// @access  Private

const joinMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const meeting = await Meeting.findById(id).populate("courseId");
  if (!meeting) {
    return res.status(404).json({ success: false, error: "Meeting not found" });
  }

  // Enrollment check
  const enrolled = await Enrollment.findOne({
    userId: req.user._id,
    courseId: meeting.courseId._id,
    status: "active",
  });

  const isHost = meeting.hostId.toString() === req.user._id.toString();

  if (!enrolled && !isHost) {
    return res.status(403).json({
      success: false,
      error: "Not allowed to join this meeting",
    });
  }

  const now = new Date();
  const start = new Date(meeting.scheduledAt);
  const end = new Date(start.getTime() + meeting.duration * 60000);
  const earlyJoin = new Date(start.getTime() - 15 * 60000);

  // ✅ allow join if LIVE
  const canJoin = meeting.status === "live" || (now >= earlyJoin && now <= end);

  if (!canJoin) {
    return res.status(400).json({
      success: false,
      error: "Meeting not available at this time",
    });
  }

  // Generate Zoom SDK signature
  const role = isHost ? 1 : 0;

  const payload = {
    appKey: process.env.ZOOM_SDK_KEY,
    sdkKey: process.env.ZOOM_SDK_KEY,
    mn: meeting.zoomMeetingId,
    role,
    iat: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60,
    tokenExp: Math.floor(Date.now() / 1000) + 2 * 60 * 60,
  };

  const signature = jwt.sign(payload, process.env.ZOOM_SDK_SECRET);

  res.json({
    success: true,
    data: {
      meetingNumber: Number(meeting.zoomMeetingId),
      password: meeting.zoomPassword,
      signature,
      sdkKey: process.env.ZOOM_SDK_KEY,
      userName: req.user.name,
      userEmail: req.user.email,
      title: meeting.title,
    },
  });
});

// @desc    Generate Zoom meeting signature
// @route   POST /api/zoom/signature
// @access  Private

// const generateZoomSignature = asyncHandler(async (req, res) => {
//   const { meetingNumber, role = 0 } = req.body;

//   if (!meetingNumber) {
//     return res.status(400).json({
//       success: false,
//       error: "Meeting number is required",
//     });
//   }

//   const sdkKey = process.env.ZOOM_SDK_KEY;
//   const sdkSecret = process.env.ZOOM_SDK_SECRET;

//   if (!sdkKey || !sdkSecret) {
//     return res.status(500).json({
//       success: false,
//       error: "Zoom SDK credentials not configured",
//     });
//   }

//   try {
//     const payload = {
//       iss: sdkKey,
//       alg: "HS256",
//       exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
//       aud: "zoom",
//       appKey: sdkKey,
//       tokenExp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
//       alg: "HS256",
//     };

//     const signature = jwt.sign(payload, sdkSecret);

//     res.status(200).json({
//       success: true,
//       data: {
//         signature,
//         sdkKey,
//         meetingNumber,
//         role,
//       },
//     });
//   } catch (error) {
//     console.error("Zoom signature generation error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to generate meeting signature",
//     });
//   }
// });

// Helper function to send notifications
const sendMeetingNotifications = async (meetingId, type) => {
  try {
    const meeting = await Meeting.findById(meetingId)
      .populate("registeredParticipants.userId", "name email")
      .populate("courseId", "title");

    // Here you would integrate with your notification system
    // For now, we'll just log the notifications

    meeting.registeredParticipants.forEach((participant) => {
      // Send email/push notification here
    });
  } catch (error) {
    console.error("Notification error:", error);
  }
};

export { createMeeting, getCourseMeetings, startMeeting, joinMeeting };

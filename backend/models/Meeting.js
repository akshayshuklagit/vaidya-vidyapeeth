import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  
  // Zoom meeting details
  zoomMeetingId: {
    type: String,
    required: true,
    unique: true
  },
  zoomPassword: String,
  joinUrl: String,
  startUrl: String, // For hosts
  
  // Schedule
  scheduledAt: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 60
  },
  timezone: {
    type: String,
    default: 'Asia/Kolkata'
  },
  
  // Host details
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Meeting status
  status: {
    type: String,
    enum: ['scheduled', 'live', 'ended', 'cancelled'],
    default: 'scheduled'
  },
  
  // Participants
  registeredParticipants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    notificationSent: {
      type: Boolean,
      default: false
    }
  }],
  
  // Meeting settings
  settings: {
    waitingRoom: {
      type: Boolean,
      default: true
    },
    muteOnEntry: {
      type: Boolean,
      default: true
    },
    allowRecording: {
      type: Boolean,
      default: true
    },
    autoRecord: {
      type: String,
      enum: ['none', 'local', 'cloud'],
      default: 'cloud'
    }
  },
  
  // Notifications
  remindersSent: {
    oneHour: { type: Boolean, default: false },
    fifteenMinutes: { type: Boolean, default: false },
    fiveMinutes: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

// Index for efficient queries
meetingSchema.index({ courseId: 1, scheduledAt: 1 });
meetingSchema.index({ hostId: 1 });
meetingSchema.index({ status: 1, scheduledAt: 1 });

export default mongoose.model('Meeting', meetingSchema);
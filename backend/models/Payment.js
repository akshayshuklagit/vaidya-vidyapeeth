import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'free'],
    required: true
  },
  transactionId: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  refund: {
    amount: Number,
    reason: String,
    processedDate: Date,
    refundId: String
  }
}, {
  timestamps: true
});

// Critical: Unique constraint on transaction ID
paymentSchema.index({ transactionId: 1 }, { unique: true, sparse: true });

// Performance and security indexes
paymentSchema.index({ userId: 1, courseId: 1, status: 1 });
paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ razorpayOrderId: 1 }, { sparse: true });

// Prevent payment record modification (immutability)
paymentSchema.pre('findOneAndUpdate', function() {
  if (this.getUpdate().$set && this.getUpdate().$set.status === 'completed') {
    // Allow status updates to completed, but prevent other modifications
    const allowedFields = ['status', 'razorpayPaymentId', 'razorpaySignature', 'updatedAt'];
    const updateFields = Object.keys(this.getUpdate().$set);
    const hasDisallowedFields = updateFields.some(field => !allowedFields.includes(field));
    
    if (hasDisallowedFields) {
      throw new Error('Payment records cannot be modified after creation');
    }
  }
});

export default mongoose.model('Payment', paymentSchema);
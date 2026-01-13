import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Payment-specific logger
export const paymentLogger = {
  info: (message, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      data,
      pid: process.pid
    };
    
    console.log('💳 PAYMENT:', message, data);
    appendToFile('payment.log', logEntry);
  },
  
  error: (message, error = {}, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code
      },
      data,
      pid: process.pid
    };
    
    console.error('❌ PAYMENT ERROR:', message, error, data);
    appendToFile('payment-errors.log', logEntry);
  },
  
  security: (message, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'SECURITY',
      message,
      data,
      pid: process.pid
    };
    
    console.warn('🔒 SECURITY:', message, data);
    appendToFile('security.log', logEntry);
  },
  
  webhook: (message, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'WEBHOOK',
      message,
      data,
      pid: process.pid
    };
    
    console.log('🔗 WEBHOOK:', message, data);
    appendToFile('webhook.log', logEntry);
  }
};

// Helper function to append to log files
const appendToFile = (filename, logEntry) => {
  const logPath = path.join(logsDir, filename);
  const logLine = JSON.stringify(logEntry) + '\n';
  
  fs.appendFile(logPath, logLine, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

// Audit logger for financial records
export const auditLogger = {
  paymentCreated: (userId, courseId, amount, orderId) => {
    paymentLogger.info('Payment order created', {
      userId,
      courseId,
      amount,
      orderId,
      action: 'PAYMENT_ORDER_CREATED'
    });
  },
  
  paymentCompleted: (userId, courseId, amount, paymentId, orderId) => {
    paymentLogger.info('Payment completed', {
      userId,
      courseId,
      amount,
      paymentId,
      orderId,
      action: 'PAYMENT_COMPLETED'
    });
  },
  
  enrollmentCreated: (userId, courseId, enrollmentId) => {
    paymentLogger.info('Enrollment created', {
      userId,
      courseId,
      enrollmentId,
      action: 'ENROLLMENT_CREATED'
    });
  },
  
  duplicateAttempt: (userId, courseId, reason) => {
    paymentLogger.security('Duplicate payment attempt blocked', {
      userId,
      courseId,
      reason,
      action: 'DUPLICATE_BLOCKED'
    });
  },
  
  webhookReceived: (event, orderId, status) => {
    paymentLogger.webhook('Webhook processed', {
      event,
      orderId,
      status,
      action: 'WEBHOOK_PROCESSED'
    });
  }
};
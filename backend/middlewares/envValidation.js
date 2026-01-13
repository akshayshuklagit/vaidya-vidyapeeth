// Environment validation middleware
export const validateEnvironment = () => {
  const requiredEnvVars = [
    "MONGODB_URI",
    "FIREBASE_PROJECT_ID",
    "FIREBASE_PRIVATE_KEY",
    "FIREBASE_CLIENT_EMAIL",
    "RAZORPAY_KEY_ID",
    "RAZORPAY_KEY_SECRET",
    "RAZORPAY_WEBHOOK_SECRET",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingVars.forEach((varName) => {
      console.error(`   - ${varName}`);
    });
    process.exit(1);
  }

  // Validate Razorpay keys format
  if (!process.env.RAZORPAY_KEY_ID.startsWith("rzp_")) {
    console.error("❌ Invalid RAZORPAY_KEY_ID format");
    process.exit(1);
  }

  if (process.env.RAZORPAY_WEBHOOK_SECRET === "your_webhook_secret_here") {
    console.warn(
      "⚠️  WARNING: Using default webhook secret. Please update RAZORPAY_WEBHOOK_SECRET"
    );
  }
};

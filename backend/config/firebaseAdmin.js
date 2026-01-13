import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

// Support both \n-escaped keys and base64-encoded keys
if (privateKey) {
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  } else {
    try {
      const decoded = Buffer.from(privateKey, "base64").toString("utf8");
      if (decoded.includes("BEGIN PRIVATE KEY")) {
        privateKey = decoded;
      }
    } catch (e) {
      // leave privateKey as-is
    }
  }
}

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Missing Firebase credentials. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are set in your environment"
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export default admin;

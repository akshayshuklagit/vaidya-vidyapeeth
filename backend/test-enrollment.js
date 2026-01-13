// Simple test script to check enrollment endpoint
import fetch from "node-fetch";

const testEnrollment = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-test-token",
      },
      body: JSON.stringify({
        courseId: "test-course-id",
      }),
    });

    const data = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

// testEnrollment();

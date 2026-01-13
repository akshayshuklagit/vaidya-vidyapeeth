// Test Razorpay integration
export const testRazorpay = () => {
  console.log('Testing Razorpay integration...');
  console.log('Razorpay available:', !!window.Razorpay);
  console.log('Razorpay Key ID:', import.meta.env.VITE_RAZORPAY_KEY_ID);
  
  if (window.Razorpay) {
    console.log('Razorpay SDK loaded successfully');
  } else {
    console.error('Razorpay SDK not loaded');
  }
};
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { usePayments } from "../hooks/usePayments";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { testRazorpay } from "../utils/testRazorpay";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { createPaymentOrder, verifyPayment } = usePayments();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data.data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        navigate("/courses");
      }
    };

    fetchCourse();

    // Test Razorpay on component mount
    setTimeout(() => {
      testRazorpay();
    }, 1000);
  }, [id, navigate]);

  const handlePayment = async () => {
    if (!course || loading) return;

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }

    setLoading(true);
    try {
      // console.log("Creating payment order for course:", course._id);

      // Create Razorpay order
      const result = await createPaymentOrder(course._id);
      // console.log("Payment order created:", result);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: result.data.currency,
        name: "Vaidya Vidyapeeth",
        description: `Enrollment for ${result.data.course.title}`,
        order_id: result.data.orderId,
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        handler: async function (response) {
          // console.log("Payment successful:", response);
          try {
            // Verify payment
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment successful! You are now enrolled.");
            navigate("/dashboard/courses");
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed.");
          }
        },
        modal: {
          ondismiss: function () {
            // console.log("Payment modal dismissed");
            setLoading(false);
          },
        },
        prefill: {
          name: auth.user?.displayName || "",
          email: auth.user?.email || "",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      // console.log("Razorpay options:", options);
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed: " + response.error.description);
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert(err.response?.data?.error || "Payment initiation failed.");
      setLoading(false);
    }
  };

  if (!course)
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glassmorphism rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={handlePayment}>
                  Pay with Razorpay
                </Button>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glassmorphism rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <div className="text-4xl">{course.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.sanskritName}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{course.price}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{course.originalPrice - course.price}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{course.price}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay ₹${course.price}`}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Ayurveda and how can it benefit me?",
      answer: "Ayurveda is an ancient Indian system of medicine that focuses on balancing mind, body, and spirit. It offers personalized approaches to health through diet, lifestyle, herbs, and therapies, helping you achieve optimal wellness naturally."
    },
    {
      question: "Do I need any prior knowledge to start these courses?",
      answer: "No prior knowledge is required. Our courses are designed for beginners and progressively build your understanding. We start with fundamental concepts and gradually advance to more complex topics."
    },
    {
      question: "How long does it take to complete a course?",
      answer: "Course duration varies from 4-12 weeks depending on the program. You can learn at your own pace with lifetime access to course materials. Most students complete courses within the suggested timeframe."
    },
    {
      question: "Are the courses certified?",
      answer: "Yes, upon successful completion of each course, you'll receive a certificate from Vaidya Vidyapeeth. Our certificates are recognized by various wellness organizations and can enhance your professional credentials."
    },
    {
      question: "Can I practice Ayurveda professionally after these courses?",
      answer: "Our courses provide excellent foundational knowledge. However, professional practice may require additional certification depending on your location's regulations. We recommend checking local requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. We also offer EMI options for select courses to make learning more accessible."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with the course within the first 7 days, you can request a full refund. Please review our complete refund policy for details."
    },
    {
      question: "How do I access course materials?",
      answer: "Once enrolled, you'll receive login credentials to access our learning platform. All materials including videos, PDFs, and resources are available 24/7 from any device with internet access."
    },
    {
      question: "Do you provide student support?",
      answer: "Absolutely! We offer comprehensive support through discussion forums, email support, and regular Q&A sessions with instructors. Our support team is available to help with technical and academic queries."
    },
    {
      question: "Can I interact with other students?",
      answer: "Yes, our platform includes community features where you can connect with fellow students, participate in discussions, share experiences, and learn from each other's journey."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our Ayurveda courses and platform
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <ChevronDownIcon
                  className={`w-5 h-5 text-blue-500 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-blue-100 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@vaidyavidyapeeth.com"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Email Support
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white font-semibold py-3 px-6 rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Vaidya Vidyapeeth services, you accept and agree to be bound by these Terms",
        "If you do not agree to these terms, please do not use our services",
        "We reserve the right to modify these terms at any time with notice",
        "Continued use of our services constitutes acceptance of updated terms",
      ],
    },
    {
      title: "User Accounts",
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "One person may not maintain multiple accounts",
        "We reserve the right to suspend or terminate accounts that violate our terms",
      ],
    },
    {
      title: "Course Access and Content",
      content: [
        "Course access is granted for personal, non-commercial use only",
        "You may not share, distribute, or resell course content",
        "Course materials are protected by intellectual property laws",
        "We reserve the right to update or modify course content at any time",
        "Refund policies apply as outlined in our separate refund policy",
      ],
    },
    {
      title: "User Conduct",
      content: [
        "You agree to use our services in a lawful and respectful manner",
        "Harassment, abuse, or inappropriate behavior towards other users is prohibited",
        "You may not attempt to hack, disrupt, or damage our systems",
        "Sharing of inappropriate or offensive content is not allowed",
        "Commercial solicitation or spam is strictly prohibited",
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        "All content, trademarks, and materials are owned by Vaidya Vidyapeeth or our licensors",
        "You may not reproduce, distribute, or create derivative works without permission",
        "User-generated content remains your property but grants us usage rights",
        "We respect intellectual property rights and expect users to do the same",
        "Report any copyright infringement to our designated agent",
      ],
    },
    {
      title: "Disclaimers and Limitations",
      content: [
        "We do not guarantee specific outcomes from our courses",
        "Our services are provided 'as is' without warranties of any kind",
        "We are not liable for indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid for our services",
      ],
    },
  ];

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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using our services. They
            govern your use of Vaidya Vidyapeeth.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: December 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <p className="text-gray-700 leading-relaxed">
            Welcome to Vaidya Vidyapeeth. These Terms of Service ("Terms")
            govern your use of our website, mobile application, and educational
            services. By accessing or using our services, you agree to be bound
            by these Terms and our Privacy Policy.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-blue-100 mb-6">
            If you have any questions about these Terms of Service, please don't
            hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@vaidyavidyapeeth.com"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Email Legal Team
            </a>
            <Link
              to="/about"
              className="border-2 border-white text-white font-semibold py-3 px-6 rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
            >
              About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;

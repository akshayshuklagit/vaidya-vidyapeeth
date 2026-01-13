import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    home: "Home",
    courses: "Courses",
    liveClasses: "Live Classes",
    herbs: "Herbs",
    blog: "Blog",
    login: "Login",
    register: "Register",
    doshaQuiz: "Dosha Quiz",

    // Branding
    academyName: "Vaidya Vidyapeeth",
    tagline: "वैद्यों की पाठशाला",

    // Home Page
    heroTitle: "Learn Ayurveda",
    heroSubtitle:
      "Rooted in classical Samhitas and guided by the Guru–Shishya tradition, we focus on transforming Ayurvedic knowledge into confident clinical practice.",
    exploreCoursesBtn: "Explore Courses",
    takeDoshaQuizBtn: "Take Dosha Quiz",
    popularCourses: "Popular Courses",
    upcomingLiveClasses: "Upcoming Live Classes",
    testimonials: "What Students Say",

    // Course Related
    enrollNow: "Enroll Now",
    viewDetails: "View Details",
    level: "Level",
    duration: "Duration",
    students: "Students",
    certificate: "Certificate",
    liveSessions: "Live Sessions",

    // Levels
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",

    // Footer
    aboutUs: "About Us",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    newsletter: "Newsletter",
    subscribeNewsletter: "Subscribe to our newsletter",
    allRightsReserved: "All rights reserved",

    // Common
    learnMore: "Learn More",
    loading: "Loading...",
    search: "Search",
    filter: "Filter",
    sortBy: "Sort By",
  },
  hi: {
    // Navigation
    home: "होम",
    courses: "पाठ्यक्रम",
    liveClasses: "लाइव कक्षाएं",
    herbs: "जड़ी-बूटियाँ",
    blog: "ब्लॉग",
    login: "लॉगिन",
    register: "रजिस्टर करें",
    doshaQuiz: "दोष प्रश्नोत्तरी",

    // Branding
    academyName: "आयुर्वेद विद्यापीठ",
    tagline: "वैद्यों की पाठशाला",

    // Home Page
    heroTitle: "आयुर्वेद सीखें",
    heroSubtitle:
      "आधुनिक कल्याण के लिए प्राचीन ज्ञान। अनुभवी वैद्यों से प्रामाणिक पाठ्यक्रमों और लाइव मार्गदर्शन के माध्यम से जीवन के विज्ञान में महारत हासिल करें।",
    exploreCoursesBtn: "पाठ्यक्रम देखें",
    takeDoshaQuizBtn: "दोष प्रश्नोत्तरी लें",
    popularCourses: "लोकप्रिय पाठ्यक्रम",
    upcomingLiveClasses: "आगामी लाइव कक्षाएं",
    testimonials: "छात्र क्या कहते हैं",

    // Course Related
    enrollNow: "अभी नामांकन करें",
    viewDetails: "विवरण देखें",
    level: "स्तर",
    duration: "अवधि",
    students: "छात्र",
    certificate: "प्रमाणपत्र",
    liveSessions: "लाइव सत्र",

    // Levels
    beginner: "शुरुआती",
    intermediate: "मध्यवर्ती",
    advanced: "उन्नत",

    // Footer
    aboutUs: "हमारे बारे में",
    contactUs: "संपर्क करें",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    newsletter: "न्यूज़लेटर",
    subscribeNewsletter: "हमारे न्यूज़लेटर की सदस्यता लें",
    allRightsReserved: "सर्वाधिकार सुरक्षित",

    // Common
    learnMore: "और जानें",
    loading: "लोड हो रहा है...",
    search: "खोजें",
    filter: "फ़िल्टर",
    sortBy: "क्रमबद्ध करें",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

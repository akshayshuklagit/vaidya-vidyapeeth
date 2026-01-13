import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t("aboutUs"), href: "/about" },
    { name: t("courses"), href: "/courses" },
    { name: t("blog"), href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "FAQ", href: "/faq" },
  ];

  const legal = [
    { name: t("privacyPolicy"), href: "/privacy-policy" },
    { name: t("termsOfService"), href: "/terms" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-emerald-900 text-white paper-texture">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-current text-blue-50"
        >
          <path d="M0,0 C200,50 400,100 600,50 C800,0 1000,50 1200,25 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br rounded-full flex items-center justify-center">
                <span className="text-2xl">
                  <img src="./vidhyapeeth_logo.webp" alt="" />
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{t("academyName")}</h3>
                <p className="text-sm text-blue-200">{t("tagline")}</p>
              </div>
            </div>
            <p className="text-sm text-gray-200">
              Ancient wisdom for modern wellness. Join thousands of students
              learning authentic Ayurveda.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/vaidya_vidyapeeth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M7 2C4.245 2 2 4.245 2 7v10c0 2.755 2.245 5 5 5h10c2.755 0 5-2.245 5-5V7c0-2.755-2.245-5-5-5H7zm8.5 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 7.5A4.5 4.5 0 1012 16.5 4.5 4.5 0 0012 7.5z"
                  />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.5 3.3-3.5.95 0 1.95.17 1.95.17v2.15h-1.1c-1.08 0-1.42.67-1.42 1.36v1.62h2.42l-.39 2.9h-2.03v7A10 10 0 0022 12z"
                  />
                </svg>
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M22 5.92c-.63.28-1.3.47-2 .56.72-.43 1.27-1.1 1.53-1.9-.68.4-1.43.68-2.23.84A3.5 3.5 0 0016.5 4c-1.93 0-3.5 1.57-3.5 3.5 0 .27.03.53.09.78-2.91-.15-5.49-1.54-7.22-3.66-.3.52-.47 1.12-.47 1.76 0 1.22.62 2.3 1.57 2.93-.57-.02-1.11-.18-1.58-.44v.04c0 1.7 1.21 3.12 2.82 3.44-.29.08-.6.12-.92.12-.23 0-.46-.02-.68-.06.46 1.44 1.79 2.49 3.37 2.52A7.03 7.03 0 013 19.54 9.94 9.94 0 008.29 21c6.55 0 10.14-5.42 10.14-10.13 0-.15 0-.3-.01-.45.7-.5 1.3-1.12 1.78-1.83-.64.28-1.33.47-2.05.56z"
                  />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C16.7 2.4 12 2.4 12 2.4h-.1s-4.7 0-8.6.4c-.4 0-1.3.1-2.1 1C.7 4.5.5 6.2.5 6.2S.2 8 .2 9.8v.4C.2 12.6.5 14.4.5 14.4s.2 1.7.8 2.4c.8.9 1.8.9 2.3 1 1.7.2 7.1.4 7.1.4s4.7 0 8.6-.4c.4 0 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.3-1.8.3-3.6v-.4c0-1.9-.3-3.6-.3-3.6zM9.8 15.6V8.4l6.6 3.6-6.6 3.6z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-200 hover:text-blue-300 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("contactUs")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-200">
                  vaidyavidyapeeth@gmail.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <PhoneIcon className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-200">
                  +91 8859017707, 9984276035
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-200">
                  Vaidyagaon, Wazirganj 271124 Gonda, Uttar Pradesh, India
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("newsletter")}</h4>
            <p className="text-sm text-gray-200 mb-4">
              {t("subscribeNewsletter")}
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © 2025 Vaidya Vidyapeeth. {t("allRightsReserved")}.
            </p>
            <div className="flex space-x-6">
              {legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-gray-300 hover:text-blue-300 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            Developed by ❤️by Er.Akshay Shukla (+919115095002){" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import mixedLogo from "../assets/mixedlogo.jpeg";

const stats = [
  { number: "400+", label: "Students Trained", icon: UserGroupIcon },
  { number: "5+", label: "Expert Vaidyas", icon: AcademicCapIcon },
  { number: "5+", label: "Core Programs", icon: GlobeAltIcon },
  { number: "2+", label: "Years of Excellence", icon: HeartIcon },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            <span className="text-indigo-600">About Vaidya Vidyapeeth</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Authentic Ayurveda • Shastra-based Learning • Clinical Confidence
          </p>
          <div className="mt-10 flex justify-center">
            <span className="w-24 h-1 bg-indigo-500 rounded-full"></span>
          </div>
        </motion.div>

        {/* ================= HERO ================= */}
        <section className="relative mb-28">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
                Reviving the{" "}
                <span className="text-indigo-600">True Spirit</span> of Ayurveda
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Vaidya Vidyapeeth bridges the gap between classical Ayurvedic
                texts and real-world OPD practice — empowering Vaidyas with
                clarity, confidence, and compassion.
              </p>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/courses"
                  className="bg-indigo-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/authpage"
                  className="border border-indigo-600 text-indigo-600 px-6 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition"
                >
                  Join Now
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex justify-center"
            >
              <div className="w-auto h-72  overflow-hidden shadow-xl bg-white">
                <img
                  src={mixedLogo}
                  alt="Vaidya Vidyapeeth"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
            >
              <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-800">
                {item.number}
              </h3>
              <p className="text-gray-600 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= ABOUT / VISION ================= */}
        <section className="grid lg:grid-cols-2 gap-16 mb-28 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Philosophy
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Rooted in classical Samhitas and guided by the Guru–Shishya
              Parampara, Vaidya Vidyapeeth focuses on transforming Ayurvedic
              knowledge into confident clinical application.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We aim to create ethical, capable, and successful Vaidyas who heal
              patients with clarity, discipline, and compassion.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://i.pinimg.com/736x/ae/83/5c/ae835c197d13f73c76db1163678b39be.jpg"
              alt="Ayurveda"
              className="w-full h-80 object-cover"
            />
          </div>
        </section>
        {/* ================= VISION & MISSION ================= */}
        <section className="grid md:grid-cols-2 gap-10 mb-28">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                🌿
              </span>
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>

            <p className="text-gray-600 leading-relaxed">
              To revive the true spirit of Ayurveda by creating a generation of
              Vaidyas who practice{" "}
              <strong>Shastra-based, ethical, and result-oriented</strong>
              medicine, serving society with clarity, confidence, and
              compassion.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                🎯
              </span>
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>

            <ul className="space-y-3 text-gray-600">
              <li>💠 Bridge the gap between theory and real OPD practice</li>
              <li>
                💠 Strengthen diagnosis, prescription writing, and case handling
              </li>
              <li>
                💠 Promote Ayurveda as an independent, complete healing system
              </li>
              <li>
                💠 Preserve classical Ayurvedic wisdom through authentic
                teaching
              </li>
            </ul>
          </motion.div>
        </section>

        {/* ================= DIFFERENT ================= */}
        <section className="mb-28">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Makes Us Different
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Shastra-Centric Learning",
              "OPD-Focused Training",
              "Case-Based Diagnosis",
              "Guidance by Practicing Vaidyas",
              "Holistic Healing Approach",
            ].map((text, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <CheckIcon className="w-7 h-7 text-indigo-600 mb-4" />
                <p className="text-gray-700 font-medium">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= VALUES TIMELINE ================= */}
        <section className="mb-28">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Core Values
          </h2>

          <div className="max-w-4xl mx-auto relative space-y-10">
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-indigo-200 rounded"></div>

            {[
              ["Shastra Integrity", "Pure classical Ayurveda without dilution"],
              [
                "Clinical Confidence",
                "Clear diagnosis & rational prescription",
              ],
              [
                "Guru–Shishya Tradition",
                "Learning through guidance & discipline",
              ],
              ["Healing as Service", "Compassion-driven patient care"],
            ].map(([title, desc], i) => (
              <div key={i} className="relative pl-12">
                <span className="absolute left-0 top-1 w-6 h-6 bg-indigo-500 rounded-full"></span>
                <h4 className="font-semibold text-gray-800">{title}</h4>
                <p className="text-gray-600 mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-teal-600 rounded-3xl p-10 lg:p-14 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-6">
            Begin Your Ayurvedic Journey
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Learn authentic Ayurveda and build confident clinical practice under
            experienced Vaidyas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-indigo-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition"
            >
              Explore Courses
            </Link>
            <Link
              to="/authpage"
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-indigo-600 transition"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

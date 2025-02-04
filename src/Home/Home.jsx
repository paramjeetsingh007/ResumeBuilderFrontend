import React from "react";
import Header from "@/components/custom/Header";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <Header />
      <div className="flex flex-col items-center justify-center text-center py-20 px-5">
        {/* Animated Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI Resume Builder
        </motion.h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-6">
          Create a stunning, professional resume in minutes using AI-powered suggestions.
        </p>

        {/* Call-to-Action Button */}
        <Link to="/dashboard">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-purple-600 hover:bg-purple-500 text-lg px-6 py-3 rounded-full shadow-lg">
              Get Started Now 🚀
            </Button>
          </motion.div>
        </Link>

        {/* Feature Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl">
          {[
            { title: "AI-Powered Suggestions", desc: "Smart recommendations to enhance your resume." },
            { title: "Customizable Templates", desc: "Choose from sleek, modern designs." },
            { title: "Easy Export", desc: "Download your resume in PDF format instantly." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

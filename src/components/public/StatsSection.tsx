/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import highLightImg from "../../../public/images/faqbg.png";

export default function StatsSection() {
  const stats = [
    { id: 1, label: "Total Users", value: 10000 },
    { id: 2, label: "Successful Events", value: 500 },
    { id: 3, label: "Trusted Organizers", value: 50 },
    { id: 4, label: "Average Rating", value: 4.9 },
  ];

  return (
    <section
      className="relative py-20 bg-cover bg-center bg-no-repeat my-10"
      style={{
        backgroundImage: `url(${highLightImg.src})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-sm"></div>

      <div className="relative container mx-auto md:px-6 px-2  text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-14"
        >
          Our <span className="text-yellow-700/90 dark:text-yellow-600">Success</span> in Numbers
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-10">
          {stats.map((item) => (
            <AnimatedStat key={item.id} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Repeated Number + Card Animation Component
function AnimatedStat({ value, label }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
            setCount(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  
  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 3000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      
      if (label === "Average Rating") {
        setCount(Number(start.toFixed(1)));
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value, label]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.3 }}
      className="
        p-6 md:p-7 
        rounded-2xl 
        bg-white/10 
        backdrop-blur-xl 
        shadow-xl 
        border border-white/10 
        hover:bg-white/20 
        transition-all duration-300
      "
    >
      <p className="text-3xl lg:text-5xl font-extrabold text-yellow-700/90 dark:text-yellow-600 drop-shadow-lg">
        {count}
        {label !== "Average Rating" ? "+" : ""}
      </p>
      <p className="mt-3 text-base md:text-lg text-gray-500 dark:text-gray-200 font-medium">
        {label}
      </p>
    </motion.div>
  );
}


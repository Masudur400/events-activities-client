"use client";

 
import { motion } from "framer-motion"; 

const items = [
  {
    title: "Elite Event Team",
    desc: "Experienced professionals handling every detail with precision.",
  },
  {
    title: "Creative Excellence",
    desc: "Unique concepts that make every event unforgettable.",
  },
  {
    title: "On-Time Execution",
    desc: "Perfect planning and flawless delivery, always on schedule.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 my-20 bg-gray-50 bg-linear-to-b dark:from-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-4xl font-bold text-center dark:text-gray-200 mb-16"
        >
          Why Clients Trust Us
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-linear-to-b from-yellow-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-3xl p-8 shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold text-yellow-700/90 dark:text-yellow-600">
                {item.title}
              </h3>
              <p className="dark:text-gray-200">{item.desc}</p>
            </motion.div>
          ))}
        </div> 
      </div>
    </section>
  );
}

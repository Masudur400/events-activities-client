/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import testimonial1 from '../../../../public/images/testimonial-1.png'
import testimonial2 from '../../../../public/images/testimonial-2.png'
import testimonial3 from '../../../../public/images/testimonial-3.png'
import testimonial4 from '../../../../public/images/testimonial-4.png'
import Link from "next/link";

const testimonials = [
  {
    name: "Sadia Rahman",
    role: "Event Attendee",
    feedback:
      "The engagement event was beautifully organized! Everything from decor to music was perfect. Highly recommended!",
    image: testimonial1
  },
  {
    name: "Arif Hossain",
    role: "Birthday Party Guest",
    feedback:
      "I attended a birthday party here and it was unforgettable. The attention to detail and service were top-notch!",
    image: testimonial2
  },
  {
    name: "Mousumi Akter",
    role: "Wedding Guest",
    feedback:
      "The wedding ceremony was luxurious and perfectly executed. Truly a memorable experience for everyone!",
    image: testimonial3
  },
  {
    name: "Tanvir Alam",
    role: "Housewarming Guest",
    feedback:
      "The housewarming event was cozy and beautifully arranged. The atmosphere was welcoming and delightful!",
    image: testimonial4
  }
];

export default function Testimonials() {
  return (
    <section className=" bg-gray-50 dark:bg-neutral-900">
      <div className="py-12 container mx-auto md:px-6 px-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        What <span className="text-yellow-700 dark:text-yellow-600">People Say</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden">
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-3">"{t.feedback}"</p>
            <h4 className="font-semibold text-lg">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
          </motion.div>
        ))}
      </div>

      {/* See All Testimonials Button */}
      <div className="flex justify-center mt-8">
        <Link href="/service">
          <button className="lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
            See All Testimonials
          </button>
        </Link>
      </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import engagement from "../../../../public/images/Engagement.png";
import birthday from "../../../../public/images/Birthday.png";
import wedding from "../../../../public/images/Weddin.png";
import housewarming from "../../../../public/images/Housewarming.png";
import Link from "next/link";

const events = [
  {
    title: "Engagement Event",
    date: "25 December 2025",
    image: engagement,
    description:
      "A romantic engagement celebration with elegant floral décor, warm lighting and a beautiful intimate atmosphere.",
  },
  {
    title: "Birthday Party",
    date: "30 December 2025",
    image: birthday,
    description:
      "A fun-filled birthday event with colorful decorations, music, balloons and unforgettable joyful moments.",
  },
  {
    title: "Wedding Ceremony",
    date: "10 January 2026",
    image: wedding,
    description:
      "A grand and luxurious wedding ceremony adorned with premium floral décor and magical golden lighting.",
  },
  {
    title: "Housewarming",
    date: "22 January 2026",
    image: housewarming,
    description:
      "A warm and cozy housewarming celebration with modern décor, soft lighting and a welcoming home atmosphere.",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-12 container mx-auto md:px-6 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Upcoming <span className="text-yellow-700 dark:text-yellow-600">Events</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all"
          >
            <div className="h-44 relative overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{event.date}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-6">
        <Link href="/event">
          <button className="lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
            Explore More
          </button>
        </Link>
      </div>
    </section>
  );
}

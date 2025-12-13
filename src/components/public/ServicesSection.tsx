"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import service1 from "../../../../public/images/service1.png";
import service2 from "../../../../public/images/service2.png";
import service3 from "../../../../public/images/service3.png";
import service4 from "../../../../public/images/service4.png";

const services = [
  {
    title: "Event Planning",
    desc: "Complete event planning from concept to execution with flawless coordination.",
    img: service1,
  },
  {
    title: "Concert Management",
    desc: "Large-scale concerts with stage, sound, lighting, and crowd management.",
    img: service2,
  },
  {
    title: "Corporate Events",
    desc: "Professional corporate meetings, conferences, and brand activations.",
    img: service3,
  },
  {
    title: "Entertainment Booking",
    desc: "Artists, performers, DJs, and entertainers booking made easy.",
    img: service4,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-20"
        >
          What We Do
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }} // scale effect সরিয়ে দেওয়া, শুধু slight move
              transition={{ type: "spring", stiffness: 150 }}
              className="group relative rounded-3xl overflow-hidden shadow-lg dark:shadow-gray-800"
            >
              <Image
                src={service.img}
                alt={service.title} 
                className="h-[420px] object-cover transition duration-500 group-hover:brightness-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-2">
                  {service.title}
                </h3>
                <p className="text-white dark:text-gray-200 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

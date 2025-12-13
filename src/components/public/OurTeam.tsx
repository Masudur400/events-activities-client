"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import team1 from "../../../../public/images/team1.png";
import team2 from "../../../../public/images/team2.png";
import team3 from "../../../../public/images/team3.png";
import team4 from "../../../../public/images/team4.png";

const team = [
  {
    name: "Alex Morgan",
    role: "Event Manager",
    bio: "Expert in managing large-scale events with precision and creativity.",
    img: team1,
  },
  {
    name: "Sophia Lee",
    role: "Creative Lead",
    bio: "Designs unique event concepts that leave lasting impressions.",
    img: team2,
  },
  {
    name: "Daniel Cruz",
    role: "Entertainment Director",
    bio: "Handles artist coordination and entertainment experiences.",
    img: team3,
  },
  {
    name: "Emma Wilson",
    role: "Production Head",
    bio: "Oversees stage production, logistics, and technical execution.",
    img: team4,
  },
];

export default function OurTeam() {
  return (
    <section className="py-10 my-10 bg-linear-to-b from-yellow-50 to-white dark:from-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-6">
        <motion.h2 
        initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-center text-yellow-700/90 dark:text-yellow-600 mb-10"
        >
          Meet Our Team
        </motion.h2>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -14, scale: 1.02 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/50 dark:bg-black/15 backdrop-blur-xl border border-white/10
              rounded-3xl p-8 text-center shadow-xl"
            >
              <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-yellow-500/40">
                <Image
                  src={member.img}
                  alt={member.name}
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold ">
                {member.name}
              </h3>
              <p className="text-yellow-700/90 dark:text-yellow-600 mt-1">
                {member.role}
              </p>
              <p className="dark:text-gray-200 mt-4 text-sm leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
IMAGE PROMPTS:
1. Professional portrait of event manager,
   studio lighting, confident pose, dark premium background

2. Creative director portrait, stylish outfit,
   modern studio lighting, artistic vibe

3. Entertainment director portrait, professional look,
   cinematic lighting, event industry style

4. Event production head portrait,
   headset, backstage environment, cinematic lighting
*/

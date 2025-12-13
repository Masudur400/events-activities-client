"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import brand1 from "../../../../public/images/sponser-1.1.png";
import brand2 from "../../../../public/images/sponser-1.2.png";
import brand3 from "../../../../public/images/sponser-1.3.png";
import brand4 from "../../../../public/images/sponser-1.4.png";
import brand5 from "../../../../public/images/sponser-1.5.png";

const brands = [brand1, brand2, brand3, brand4, brand5];

export default function PartnersSection() {
  return (
    <section className="py-10 my-10">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
        initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-4xl font-bold mb-10"
        >
          Our Trusted <span className="text-yellow-700/90 dark:text-yellow-600">Partners</span> 
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-center">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.10 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10
              rounded-md p-2 shadow-lg"
            >
              <Image
                src={brand} 
                alt="Partner logo"
                className="mx-auto transition rounded-md w-52 h-14 lg:h-24"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
IMAGE PROMPTS:
Minimal luxury brand logo for event partner,
golden and black color scheme, clean background

Corporate sponsor logo, modern flat design,
premium feel, high resolution
*/

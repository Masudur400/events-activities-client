"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import banner1 from "../../../../public/images/home-banner-4.png";
import banner2 from "../../../../public/images/home-banner-5.png";
import banner3 from "../../../../public/images/home-banner-6.png";
import banner4 from "../../../../public/images/home-banner-7.png";

import Link from "next/link";

export default function HeroSection() {
    const sliderImages = [banner1, banner2, banner3,banner4];
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(false);

    // Auto Slide With Smooth Fade
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);

            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % sliderImages.length);
                setFade(false);
            }, 300);

        }, 3000);

        return () => clearInterval(interval);
    }, [sliderImages.length]);

    return (
        <section className="md:mt-10 md:py-10 pt-3 pb-5 bg-linear-to-b from-yellow-50 to-white dark:from-neutral-800 dark:to-neutral-900">
            <div className="container mx-auto md:px-6 px-2 flex flex-col-reverse md:grid md:grid-cols-2 md:gap-10 items-center">

                {/* TEXT CONTENT */}
                <div className="space-y-2 md:space-y-4 lg:space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7 }}
                        className="  text-[30px] lg:text-[42px] font-bold leading-tight">
                        Explore Amazing <span className="text-yellow-700/90 dark:text-yellow-600">Events</span> & Entertainment
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7 }}
                        className="text-gray-800 dark:text-gray-300">
                        Discover experiences near you — from workshops to concerts. Designed to make exploring events enjoyable and smooth.
                    </motion.p>

                    <Link href='/event'>
                        <button className="lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
                            Start Exploring
                        </button>
                    </Link>
                </div>

                {/* IMAGE SLIDER */}
                <div className="relative w-full mb-6 md:mb-0">
                    <Image
                        src={sliderImages[current]}
                        alt="Hero Slide"
                        className={`md:rounded-xl rounded-md  shadow-xl w-full transition-opacity duration-700 ${fade ? "opacity-0" : "opacity-100"}`}
                    />
                </div>

            </div>
        </section>
    );
}

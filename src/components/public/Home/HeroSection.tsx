"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import banner1 from "../../../../public/images/home-banner-copy.png";
import banner2 from "../../../../public/images/home-banner-2.png";
import banner3 from "../../../../public/images/home-banner-3.png";

export default function HeroSection() {
    const sliderImages = [banner1, banner2, banner3];
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
        <section className="mt-10 md:py-10 pt-3 pb-5 bg-linear-to-b from-yellow-50 to-white dark:from-neutral-800 dark:to-neutral-900">
            <div className="container mx-auto md:px-6 px-2 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-center">

                {/* TEXT CONTENT */}
                <div className="md:space-y-4 space-y-6">
                    <h1 className="text-[30px] lg:text-[42px] font-bold leading-tight">
                        Explore Amazing <span className="text-yellow-500">Events</span> & Entertainment
                    </h1>

                    <p className="text-gray-700 dark:text-gray-300">
                        Discover experiences near you — from workshops to concerts. Designed to make exploring events enjoyable and smooth.
                    </p>

                    <button className="lg:px-8 px-4 lg:py-4 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
                        Start Exploring
                    </button>
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

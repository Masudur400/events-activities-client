"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image"
import Link from "next/link"
import ctaImage from "../../../../public/images/call-to-action-1.png"

export default function CallToAction() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <section className="bg-linear-to-b from-yellow-50 to-white dark:from-neutral-800 dark:to-neutral-900 py-5 md:py-16">
            <div className="container mx-auto px-4 md:px-6 md:flex  md:flex-row items-center gap-10">

                {/* Image */}
                <div className="flex-1">
                    <Image
                        src={ctaImage}
                        alt="Call to action illustration"
                        className="rounded-xl shadow-lg"
                        priority
                    />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <h2
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        className="text-[30px] lg:text-[42px] font-bold leading-tight text-gray-900 dark:text-white lg:mb-7 mb-2 max-sm:mt-5">
                        Ready to <span className="text-yellow-700/90">Elevate</span> Your Experience?
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        className="text-gray-700 dark:text-gray-300 lg:mb-7 mb-2 lg:text-lg">
                        Join thousands of enthusiasts discovering amazing events and experiences near you. Whether it’s a workshop, concert, or community gathering, we’ve got something for everyone. Don’t miss out on the opportunity to connect, learn, and have fun!
                    </p>
                    <p
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        className="text-gray-700 dark:text-gray-300 lg:mb-8 mb-2 lg:text-lg ">
                        Our team is here to guide you every step of the way. Reach out today and let’s plan your perfect event experience. Your next unforgettable moment is just a click away!
                    </p>

                    <Link href="/contact">
                        <button className="lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
                            Contact Us
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    )
}

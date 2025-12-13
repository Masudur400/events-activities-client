"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
    { label: "Experienced Event Team", value: 95 },
    { label: "Reliable Management", value: 90 },
    { label: "Creative & Skilled", value: 92 },
    { label: "Flexible Event Solutions", value: 85 },
];

export default function AboutHeader() {
    return (
        <section className="">
            <div >

                {/* Top Heading */}
                <div className=" bg-gray-50 dark:bg-neutral-900 my-10 py-10">
                    <div className="text-center container mx-auto px-4 md:px-6">
                        <h4 className="text-yellow-700/90 dark:text-yellow-600 text-3xl font-semibold tracking-wide uppercase">
                            About Us
                        </h4>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3">
                            Creating Unforgettable <span className="text-yellow-700/90 dark:text-yellow-600">Events & Experiences</span>
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                            From concerts to corporate events, we bring creativity, precision,
                            and passion to every experience we create.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-20 bg-linear-to-b from-yellow-50 to-white dark:from-neutral-800 dark:to-neutral-900">
                    <div className="container mx-auto px-4 md:px-6 py-10 grid md:grid-cols-2 gap-12 items-center ">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Empowering Your Events with Passion & Perfection
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            We specialize in organizing, managing, and delivering premium
                            entertainment and event solutions. Our expert team ensures
                            every detail is handled professionally — from planning to execution.
                        </p>

                        <Link href='event'>
                        <button className="lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
                            Explore Our Events
                        </button>
                        </Link>
                    </motion.div>

                    {/* Right Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {stats.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        {item.label}
                                    </span>
                                    <span className="font-semibold text-yellow-700/90 dark:text-yellow-600">
                                        {item.value}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.value}%` }}
                                        transition={{ duration: 1 }}
                                        className="bg-yellow-700/90 dark:bg-yellow-600 h-2.5 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>

                </div>
                </div>
            </div>
        </section>
    );
}

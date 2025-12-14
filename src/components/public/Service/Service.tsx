/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import service1 from "../../../../public/images/service1.png";
import service2 from "../../../../public/images/service2.png";
import service3 from "../../../../public/images/service3.png";
import service4 from "../../../../public/images/service4.png";

import portfolio1 from "../../../../public/images/portfolio1.png";
import portfolio2 from "../../../../public/images/portfolio2.png";
import portfolio3 from "../../../../public/images/portfolio3.png";
import portfolio4 from "../../../../public/images/portfolio4.png";
import Link from "next/link";
import FAQSection from "../FAQSection";

const services = [
    { title: "Event Planning", desc: "Complete event planning from concept to execution.", img: service1 },
    { title: "Concert Management", desc: "Large-scale concerts with stage, sound, lighting.", img: service2 },
    { title: "Corporate Events", desc: "Professional corporate meetings, conferences.", img: service3 },
    { title: "Entertainment Booking", desc: "Artists, performers, DJs booking made easy.", img: service4 },
];

const portfolio = [portfolio1, portfolio2, portfolio3, portfolio4];

const testimonials = [
    { name: "Alice Johnson", role: "CEO, Company X", text: "Amazing event management service!" },
    { name: "Mark Smith", role: "Event Organizer", text: "Highly professional and reliable." },
    { name: "Emma Williams", role: "Client", text: "Our event was flawless thanks to them!" },
];

export default function Services() {
    return (
        <main className="">

            {/* Hero Section */}
            <section className="relative py-10 my-10 text-center bg-linear-to-b from-yellow-50 to-white dark:from-neutral-800 dark:to-neutral-900">
                <div className="px-4 md:px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        We Make Your <span className="text-yellow-700/90 dark:text-yellow-600">Events</span> Unforgettable
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-lg md:text-xl max-w-xl mx-auto"
                    >
                        From planning to execution, we provide full-service event management for all occasions.
                    </motion.p>
                    <Link href='/event'>
                        <button className="lg:px-8 px-4 lg:py-3 py-2 my-5 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
                            Book Now
                        </button>
                    </Link>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-10 container mx-auto px-6 bg-white dark:bg-neutral-900">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our <span className="text-yellow-700/90 dark:text-yellow-600">Services</span></h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 150 }}
                            className="relative rounded-3xl overflow-hidden shadow-lg group"
                        >
                            <Image
                                src={service.img}
                                alt={service.title}  
                                loading="eager"
                                className="h-[420px] w-full object-cover transition duration-500 group-hover:brightness-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 p-6 flex flex-col">
                                <h3 className="text-2xl font-semibold text-yellow-500 mb-2">{service.title}</h3>
                                <p className="text-gray-100 dark:text-gray-200 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-100 dark:bg-neutral-800">
                <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <p className="text-5xl font-bold text-yellow-500">500+</p>
                        <p className="mt-2">Events Organized</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <p className="text-5xl font-bold text-yellow-500">200+</p>
                        <p className="mt-2">Happy Clients</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        <p className="text-5xl font-bold text-yellow-500">50+</p>
                        <p className="mt-2">Awards Won</p>
                    </motion.div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section className="py-24 container mx-auto px-6 bg-white dark:bg-neutral-900">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our <span className="text-yellow-700/90 dark:text-yellow-600">Portfolio</span></h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {portfolio.map((img, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.02 }} className="rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={img}
                                alt={`Portfolio ${i + 1}`}  
                                loading="eager"
                                className="w-full h-64 object-cover transition duration-500" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24  bg-linear-to-b from-yellow-50 to-white dark:from-neutral-800 dark:to-neutral-900">
                <div className="px-4 md:px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">What Our <span className="text-yellow-700/90 dark:text-yellow-600">Clients</span> Say</h2>
                    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
                        {testimonials.map((t, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }} className="p-6 bg-white dark:bg-neutral-700 rounded-xl shadow-lg">
                                <p className="mb-4">"{t.text}"</p>
                                <h4 className="font-semibold text-yellow-700/90 dark:text-yellow-600">{t.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-200">{t.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-24 my-20  text-center bg-gray-100 dark:bg-neutral-800">
                <div className="px-4 md:px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to <span className="text-yellow-700/90 dark:text-yellow-600">Plan Your</span> Event?</h2>
                    <p className="text-lg md:text-xl mb-6">Contact us today and make your event unforgettable!</p>
                    <Link href="/contact">
                        <button className="lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </section>

            <FAQSection></FAQSection>

        </main>
    );
}

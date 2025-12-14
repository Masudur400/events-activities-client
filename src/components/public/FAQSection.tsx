"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import faqBg from "../../../public/images/faqbg.png";

const faqs = [
  {
    question: "How can I book an event?",
    answer:
      "You can book an event by visiting the events page, selecting your desired event, and completing the booking form. Confirmation will be sent to your email."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, cancellations or rescheduling are allowed up to 48 hours before the event. Please contact our support team for assistance."
  },
  {
    question: "Are there any discounts for group bookings?",
    answer:
      "Yes, we offer discounts for group bookings. Please reach out to our support or check the event details for group offers."
  },
  {
    question: "Do you provide customized event setups?",
    answer:
      "Absolutely! We can customize decorations, seating, and other arrangements based on your preferences. Contact our team to discuss your ideas."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={faqBg} 
          alt="FAQ Background" 
        fill  
          className="object-cover opacity-30 w-full"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white mb-12">
          Frequently <span className="text-yellow-700/90 dark:text-yellow-600">Asked Questions</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-gray-800 dark:text-gray-200"
                onClick={() => toggle(i)}
              >
                {faq.question}
                <span className="ml-2 text-xl">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

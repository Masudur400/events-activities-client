import Image from "next/image";
import searchImg from "../../../../public/images/search.png";
import bookImg from "../../../../public/images/booking.png";
import attendImg from "../../../../public/images/attend.png";
import shareImg from "../../../../public/images/share.png";

export default function HowItWorks() {
  const steps = [
    {
      title: "Search Events",
      description: "Find events that match your interest and location.",
      img: searchImg,
    },
    {
      title: "Book / Register",
      description: "Secure your spot quickly with easy booking options.",
      img: bookImg,
    },
    {
      title: "Attend Event",
      description: "Enjoy the event and have a memorable experience.",
      img: attendImg,
    },
    {
      title: "Share Experience",
      description: "Share your memories with friends and social media.",
      img: shareImg,
    },
  ];

  return (
    <section className="py-10 my-10 bg-gray-50 bg-linear-to-b dark:from-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-700/90">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800/40 rounded-lg shadow hover:shadow-lg transition duration-300 group"
            >
              <div className="mb-4 relative overflow-hidden rounded-lg">
                <Image
                  src={step.img}
                  alt={step.title}
                  className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

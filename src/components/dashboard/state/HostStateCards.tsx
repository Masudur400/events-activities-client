'use client'

 ;
import { useHostState } from "@/hooks/states/useHostState";
import { Calendar, CheckCircle, CreditCard, Banknote, Loader2 } from "lucide-react";

const HostStateCards = () => {
    const { data: stats, isLoading } = useHostState();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 bg-gray-100 animate-pulse rounded-2xl"></div>
                ))}
            </div>
        )
    }

    const cards = [
        {
            label: "Total Events",
            value: stats?.totalEvents || 0,
            icon: Calendar,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "Completed Bookings",
            value: stats?.totalCompletedBookings || 0,
            icon: CheckCircle,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            label: "Total Payments",
            value: stats?.totalPaymentCount || 0,
            icon: CreditCard,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            label: "Total Earnings",
            value: `৳${" "}${stats?.totalPaymentAmount || 0}`,
            icon: Banknote,
            color: "text-orange-600",
            bg: "bg-orange-50"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    className="p-5 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                                {card.label}
                            </p>
                            <h3 className="text-2xl font-black   tracking-tighter">
                                {card.value}
                            </h3>
                        </div>
                        <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                            <card.icon size={20} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HostStateCards;
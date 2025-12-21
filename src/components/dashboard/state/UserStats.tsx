'use client'
 
import { useGetUserState } from "@/hooks/states/useUserState";
import { CalendarCheck, CreditCard, Banknote, Loader2 } from "lucide-react";

export const UserStats = () => {
    const { data: stats, isLoading } = useGetUserState();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-md" />
                ))}
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Bookings",
            value: stats?.totalBooking || 0,
            icon: <CalendarCheck className="w-6 h-6" />,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Paid Payments",
            value: stats?.totalPaymentCount || 0,
            icon: <CreditCard className="w-6 h-6" />,
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            title: "Total Spent",
            value: `Tk.${" "}${stats?.totalPaymentAmount || 0}`,
            icon: <Banknote className="w-6 h-6" />,
            color: "text-yellow-600",
            bg: "bg-yellow-500/10"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((card, index) => (
                <div 
                    key={index} 
                    className="p-6 bg-white dark:bg-[#0a0a0a] rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-5 group hover:border-yellow-600/30 transition-all"
                >
                    <div className={`p-4 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            {card.title}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                            {card.value}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};
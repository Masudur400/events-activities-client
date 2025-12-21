 export const dynamic = 'force-dynamic';
import MyBookingsClient from "@/components/booking/MyBookingsClient";
import { ShoppingBag } from "lucide-react";

export default function MyBookEventsPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#050505] py-12 px-4">
            <div className="container mx-auto">
                <div className="mb-10">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                        <span className="p-3 bg-yellow-500 rounded-2xl">
                            <ShoppingBag className="text-black w-6 h-6" />
                        </span>
                        My Event Bookings
                    </h1>
                    <p className="text-gray-500 text-sm font-medium mt-3 ml-2">
                        Review your bookings, download invoices, and complete pending payments.
                    </p>
                </div>

                {/* Client Component where React Query is used */}
                <MyBookingsClient />
            </div>
        </main>
    );
}
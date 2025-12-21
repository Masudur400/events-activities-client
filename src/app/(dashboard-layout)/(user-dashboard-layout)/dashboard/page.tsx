export const dynamic = 'force-dynamic';
import MyBookingsClient from '@/components/booking/MyBookingsClient';
import { UserStats } from '@/components/dashboard/state/UserStats';

const UserDashboardPage = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-10">
            <div>
                <h1 className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">
                    My Overview
                </h1>
                <p className="text-gray-500 text-sm font-medium">Welcome back! Here is what&apos;s happening.</p>
            </div>

            {/* Stats Cards */}
            <UserStats />

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    Recent Bookings
                </h2>

                <MyBookingsClient></MyBookingsClient>
            </div>
        </div>
    );
};

export default UserDashboardPage;
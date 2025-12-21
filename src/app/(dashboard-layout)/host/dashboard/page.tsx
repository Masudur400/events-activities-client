export const dynamic = 'force-dynamic';
import ManageBookingTable from '@/components/booking/ManageBookingTable';
import HostStateCards from '@/components/dashboard/state/HostStateCards';
import React from 'react';

const HostDashboardPage = () => {
    return (
        <div className="p-3 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-xl font-bold tracking-tighter">Host Dashboard</h1>
                <p className="text-gray-500 text-sm">Welcome back! Here is your event overview.</p>
            </header>

            {/* State Component */}
            <HostStateCards />

            {/* Existing Table Component */}
            <div className="mt-10">
                <ManageBookingTable />
            </div>
        </div>
    );
};

export default HostDashboardPage;
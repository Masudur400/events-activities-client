 
import ManageBookingTable from '@/components/booking/ManageBookingTable'; 
import React from 'react';

const ManageBookingsPage = () => {
    return (
        <div>
            <div className=" p-3 space-y-5 container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">
                        Manage All Bookings
                    </h1>
                    <p className="text-gray-500 text-sm font-medium italic">Monitor and oversee all user reservations and payments.</p>
                </div>
            </div>

            {/* Table Component */}
            <ManageBookingTable />
        </div>
        </div>
    );
};

export default ManageBookingsPage;
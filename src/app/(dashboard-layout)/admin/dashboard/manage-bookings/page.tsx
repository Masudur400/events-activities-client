import ManageBookingTable from "@/components/booking/ManageBookingTable";



const ManageBookingsPage = () => {
    return (
        <div className="container mx-auto">
            <div className=" p-3 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">
                            Manage All Bookings
                        </h1>
                        <p className="text-gray-500 text-sm font-medium">Monitor and oversee all user reservations and payments.</p>
                    </div>
                </div>

                {/* Table Component */}
                <ManageBookingTable />
            </div>
        </div>
    );
};

export default ManageBookingsPage;
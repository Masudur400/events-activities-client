import ManageReviewTable from '@/components/review/ManageReviewTable';
import React from 'react';

const ManageReviewsPage = () => {
    return (
        <div>
            <div className="p-3 space-y-5 container mx-auto">
            <div>
                <h1 className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">
                    Manage Reviews
                </h1>
                <p className="text-gray-500 text-sm font-medium">Monitor and oversee all user feedback and ratings.</p>
            </div>

            <ManageReviewTable />
        </div>
        </div>
    );
};

export default ManageReviewsPage;
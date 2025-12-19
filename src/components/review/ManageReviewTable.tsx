/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search, RefreshCw, Trash2, Star, Calendar } from 'lucide-react'
import Avatar from 'react-avatar'
import { useAllReviews } from '@/hooks/review/useAllReviews'
import { useDeleteReview } from '@/hooks/review/useDeleteReview'  
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'

const ManageReviewTable = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const initialSearch = searchParams.get('query') || ''
    
    const [searchTerm, setSearchTerm] = useState(initialSearch)
    const [page, setPage] = useState(1)
    const [alertOpen, setAlertOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    // Data Fetching Hook
    const { data: reviews = [], isLoading, refetch, isFetching } = useAllReviews();
    
    // Delete Mutation Hook
    const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

    const updateUrl = useCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (term) params.set('query', term)
        else params.delete('query')
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, [pathname, router, searchParams])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        setPage(1)
        updateUrl(value)
    }

    const filteredReviews = reviews.filter((review: any) =>
        review.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
    const paginatedReviews = filteredReviews.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleRefresh = async () => {
        setSearchTerm('')
        setPage(1)
        router.push(pathname)
        await refetch()
    }

    const handleDeleteClick = (id: string) => {
        setDeleteId(id)
        setAlertOpen(true)
    }

    const confirmDelete = () => {
        if (deleteId) {
            deleteReview(deleteId, {
                onSettled: () => {
                    refetch()
                    setAlertOpen(false);
                    setDeleteId(null);
                }
            });
        }
    }

    return (
        <div className="p-6 rounded-lg shadow-sm border border-gray-100 dark:border-yellow-700 w-full bg-white dark:bg-transparent">
            
            {/* Search & Refresh Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by user, email or comment..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full rounded-md px-4 py-2.5 pl-10 border shadow text-sm outline-none focus:ring-1 focus:ring-yellow-500 bg-white dark:bg-gray-800"
                    />
                </div>
                
                <div className="flex items-center gap-4">
                    <p className='text-sm font-medium text-gray-500 w-[107px]'>
                        Total Reviews ({filteredReviews.length})
                    </p>
                    <button
                        onClick={handleRefresh}
                        disabled={isFetching}
                        className="p-2.5 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto border rounded-xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-900">
                            <th className="p-4 border-b font-semibold text-sm text-left">User</th>
                            <th className="p-4 border-b font-semibold text-sm text-left">Event</th>
                            <th className="p-4 border-b font-semibold text-sm text-left">Rating & Comment</th>
                            <th className="p-4 border-b font-semibold text-sm text-center">Date</th>
                            <th className="p-4 border-b font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-900">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center p-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-400 text-sm italic">Fetching reviews...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedReviews.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-20 text-gray-400 italic font-medium">No reviews found.</td>
                            </tr>
                        ) : (
                            paginatedReviews.map((review: any) => (
                                <tr key={review._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar 
                                                src={review.userId?.picture} 
                                                name={review.userId?.name} 
                                                size="40" 
                                                className="rounded-full border border-gray-100" 
                                            />
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-sm line-clamp-1">{review.userId?.name}</p>
                                                <span className="text-[11px] text-gray-500">{review.userId?.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium line-clamp-1">
                                                {review.eventId?.eventName || 'General Review'}
                                            </p>
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded-md w-fit">
                                                {review.eventId?.eventType || 'N/A'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                                                    />
                                                ))}
                                                <span className="text-xs font-bold ml-1">{review.rating}</span>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 italic line-clamp-2 max-w-[250px]">
                                                &quot;{review.comment}&quot;
                                            </p>
                                        </div>
                                    </td>

                                    <td className="p-4 text-center">
                                        <p className="text-xs font-semibold text-gray-500 flex items-center justify-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center justify-center">
                                            <button 
                                                onClick={() => handleDeleteClick(review._id)}
                                                className="p-2 cursor-pointer text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all active:scale-90 disabled:opacity-50"
                                                title="Delete Review"
                                                disabled={isDeleting}
                                            >
                                                <Trash2 className={`w-4 h-4 ${isDeleting && deleteId === review._id ? 'animate-pulse' : ''}`} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <p className="text-sm text-gray-500 font-medium">
                    Showing page <span className="text-yellow-600 font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
                </p>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 text-sm font-bold border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        disabled={page <= 1 || isLoading}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-bold border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        disabled={page >= totalPages || isLoading}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Delete Alert Dialog */}
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-black uppercase italic tracking-tighter">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm italic font-medium">
                            This action will permanently remove this review from the system. This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="rounded-xl font-bold" disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={(e) => {
                                e.preventDefault(); // ডায়ালগ অটো বন্ধ হওয়া রোধ করে যদি কাজ বাকি থাকে
                                confirmDelete();
                            }} 
                            className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete Review"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ManageReviewTable
/* eslint-disable @typescript-eslint/no-explicit-any */ 
'use client'
import { useState, useEffect } from 'react'
import { User } from '@/hooks/user/useAllUsers'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, Edit2, RefreshCw, Trash2, Search } from 'lucide-react'
import UserDetailsModal from './UserDetailsModal'
import Avatar from 'react-avatar'
import UpdateUserModal from './UpdateUserModal'
import { useAllHosts } from '@/hooks/user/useAllHosts'
import { useDeleteHost } from '@/hooks/user/useDeleteHost'
import { IUser } from '@/types/userTypes'
import toast from 'react-hot-toast'
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from '../ui/alert-dialog'

const AllHostTable = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '')
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
    const [selectedUser, setSelectedUser] = useState<User | IUser | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    // Delete States (Matching your Events Table style)
    const [alertOpen, setAlertOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const { data, isLoading, refetch, isFetching } = useAllHosts({ searchTerm, page, limit: 10 })
    const { mutate: deleteHost, isPending: deleting } = useDeleteHost() as any

    const hosts = data?.data || []
    const totalPages = data?.meta?.totalPage || 1
    const totalHosts = data?.meta.total 

    // --- URL Sync ---
    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams();
            if (searchTerm.trim()) params.set('searchTerm', searchTerm);
            if (page > 1) params.set('page', page.toString());
            const queryString = params.toString();
            router.replace(queryString ? `?${queryString}` : window.location.pathname);
        }, 700); 
        return () => clearTimeout(handler);
    }, [searchTerm, page, router]);

    // --- Handlers ---
    const handleRefresh = async () => {
        setSearchTerm('');
        setPage(1);
        router.replace(window.location.pathname);
        await refetch();
    }; 

    const confirmDelete = () => {
        if (!deleteId) return
        const toastId = toast.loading('Deleting host...');
        deleteHost(deleteId, {
            onSuccess: () => {
                toast.success('Host deleted successfully', { id: toastId })
                setAlertOpen(false)
                setDeleteId(null)
                refetch()
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'Delete failed')
            },
        })
    }

    return (
        <div className="p-6 rounded-xl shadow-sm border border-gray-100 dark:border-yellow-700 w-full">
            {/* Search & Refresh */}
            <div className="mb-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search hosts..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
                        className="w-full rounded-xl px-4 py-2.5 pl-10 border shadow text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
                    />
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isFetching}
                    className="p-2.5 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95 disabled:opacity-50"
                >
                    <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <p className='text-lg mb-4 font-medium'>Total Hosts ({totalHosts})</p>

            {/* Table */}
            <div className="overflow-x-auto border rounded-xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900 text-sm">
                            <th className="p-4 border-b text-left font-semibold">Picture</th>
                            <th className="p-4 border-b text-left font-semibold">Name & Role</th>
                            <th className="p-4 border-b text-left font-semibold">Email</th>
                            <th className="p-4 border-b text-center font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="text-center p-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-400 text-sm">Fetching hosts...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : hosts.length === 0 ? (
                            <tr><td colSpan={4} className="text-center p-20 text-gray-400">No hosts found.</td></tr>
                        ) : (
                            hosts.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
                                    <td className="p-4">
                                        <Avatar src={user?.picture} name={user?.name} size='40' className='rounded-full shadow-sm' />
                                    </td>
                                    <td className="p-4">
                                        <p className="font-semibold text-sm">{user.name}</p>
                                        <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold uppercase rounded-md">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">{user.email}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => { setSelectedUser(user as any); setShowModal(true); }} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all active:scale-95">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => { setSelectedUser(user as any); setShowUpdateModal(true); }} className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all active:scale-95">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => { setDeleteId((user as any)._id); setAlertOpen(true); }} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all active:scale-95">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination UI */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-5 gap-4">
                <p className="text-sm">
                    Showing page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
                </p>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                        disabled={page <= 1 || isLoading}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                        disabled={page >= totalPages || isLoading}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Delete AlertDialog (Matching Events Table) */}
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Do you really want to delete this host?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">
                            {deleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Other Modals */}
            {showModal && selectedUser && <UserDetailsModal user={selectedUser} onClose={() => setShowModal(false)} />}
            {showUpdateModal && selectedUser && (
                <UpdateUserModal user={selectedUser} onClose={() => setShowUpdateModal(false)} onUpdated={refetch} />
            )}
        </div>
    )
}

export default AllHostTable
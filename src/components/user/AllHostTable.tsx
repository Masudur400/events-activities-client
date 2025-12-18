/* eslint-disable @typescript-eslint/no-explicit-any */ 
'use client'
import { useState, useEffect } from 'react'
import { User } from '@/hooks/user/useAllUsers'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, Edit2, RefreshCw } from 'lucide-react'
import UserDetailsModal from './UserDetailsModal'
import Avatar from 'react-avatar'
import UpdateUserModal from './UpdateUserModal'
import { useAllHosts } from '@/hooks/user/useAllHosts'
import { IUser } from '@/types/userTypes'

const AllHostTable = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '')
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
    const [selectedUser, setSelectedUser] = useState<User | IUser | null>(null)
    const [showModal, setShowModal] = useState(false)

    const { data, isLoading, refetch, isFetching } = useAllHosts({ searchTerm, page, limit: 10 })

     
    const hosts = data?.data || []
    const totalPages = data?.meta?.totalPage || 1

    const totalHosts = data?.meta.total 


    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams();
            if (searchTerm) {
                params.set('searchTerm', searchTerm);
            } else {
                params.delete('searchTerm');
            } 
            if (page > 1) {
                params.set('page', page.toString());
            } else {
                params.delete('page');
            }
            const queryString = params.toString();
            router.replace(queryString ? `?${queryString}` : window.location.pathname);
        }, 1500); 
        return () => clearTimeout(handler);
    }, [searchTerm, page, router]);

    const openModal = (user: User) => {
        setSelectedUser(user)
        setShowModal(true)
    }

    const closeModal = () => {
        setSelectedUser(null)
        setShowModal(false)
    }

    const handleRefresh = async () => {
        setSearchTerm('');
        setPage(1);
        router.replace(window.location.pathname);
        await refetch();
    }; 

    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const openUpdateModal = (user: User) => {
        setSelectedUser(user)
        setShowUpdateModal(true)
    }

    const closeUpdateModal = () => {
        setSelectedUser(null)
        setShowUpdateModal(false)
    }

    return (
        <div className="p-6 rounded-xl shadow-sm border border-gray-100 dark:border-yellow-700 w-full">
            {/* Search & Refresh */}
            <div className="mb-4 flex gap-2 items-center">
                <p className='font-medium'>Total Users ({totalHosts})</p>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
                    className="flex-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    onClick={handleRefresh}
                    disabled={isFetching}
                    className="p-2 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                    title="Refresh Users"
                >
                    <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900">
                            <th className="p-4 border-b text-left">Picture</th>
                            <th className="p-4 border-b text-left">Name & Role</th>
                            <th className="p-4 border-b text-left">Email</th>
                            <th className="p-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="text-center p-10">Loading users...</td>
                            </tr>
                        ) : hosts.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center p-10">No users found.</td>
                            </tr>
                        ) : (
                            hosts.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                    <td className="p-4">
                                        <Avatar
                                            src={user?.picture}
                                            name={user?.name}
                                            size='40'
                                            className='rounded-full'
                                        />
                                    </td>
                                    <td className="p-4">
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.role}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </td>
                                    <td className="p-4 text-center flex justify-center gap-2">
                                        <button onClick={() => openModal(user as any)} title="View" className="p-2 bg-blue-500 text-white rounded-lg"><Eye className="w-4 h-4" /></button>
                                        <button onClick={() => openUpdateModal(user as any)} title="Edit" className="p-2 bg-amber-600 text-white rounded-lg"><Edit2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-5 gap-4">
                <p className="text-sm">
                    Showing page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
                </p>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        disabled={page <= 1 || isLoading}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        disabled={page >= totalPages || isLoading}
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* User Details Modal */}
            {showModal && selectedUser && (
                <UserDetailsModal user={selectedUser} onClose={closeModal} />
            )}

            {showUpdateModal && selectedUser && (
                <UpdateUserModal
                    user={selectedUser}
                    onClose={closeUpdateModal}
                    onUpdated={refetch}
                />
            )}
        </div>
    )
}

export default AllHostTable

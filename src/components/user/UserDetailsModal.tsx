/* eslint-disable @typescript-eslint/no-explicit-any */ 
'use client'
import { User } from '@/hooks/user/useAllUsers'
import Avatar from 'react-avatar'

interface Props {
    user: User | any
    onClose: () => void
}

const UserDetailsModal: React.FC<Props> = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 dark:text-white"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center gap-4">
                    <div className="">
                        <div className="">
                            {/* <img src={user.picture} alt={user.name} className="object-cover" /> */}
                            <Avatar
                                src={user?.picture}
                                name={user?.name}
                                size='70'
                                className='rounded-full'
                            ></Avatar>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.role}</p>
                    {user.bio && <p className="text-sm text-gray-600 italic">{user?.bio}</p>}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                    {user.email && <p>Email: {user.email}</p>}
                    {user.phone && <p>Phone: {user.phone}</p>}
                    {user.address && <p>Address: {user.address || 'N/A'}</p>}
                    <p>Status: {user.isActive}</p>
                    <p>Verified: {user.isVerified ? 'Yes' : 'No'}</p>
                    <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsModal

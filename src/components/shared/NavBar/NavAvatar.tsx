'use client'
import { IUser } from '@/types/userTypes';
import Link from 'next/link';
import React, { useState, useTransition } from 'react';
import Avatar from 'react-avatar';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { logoutUser } from '@/services/auth/logoutUser'; // তোমার server function import

const NavAvatar = ({ user }: { user: IUser }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isPending, startTransition] = useTransition();

    const userRole = user?.role;

    const handleLogout = () => {
        startTransition(() => {
            logoutUser(); // server function call
        });
    }

    return (
        <div>
            {
                user && userRole ?
                    <div className="relative">
                        <Avatar
                            alt='img'
                            size="45"
                            className="rounded-full cursor-pointer border dark:border-gray-600"
                            onClick={() => setDropdownOpen(!dropdownOpen)}></Avatar>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border dark:border-gray-600 py-2">
                                <Link
                                    href={userRole === 'USER' ? '/dashboard' :
                                        userRole === 'SUPER_ADMIN' ? '/admin/dashboard' :
                                            '/host/dashboard'}>
                                    <p className="px-4 py-2 hover:bg-gray-100  dark:hover:bg-neutral-900 cursor-pointer flex gap-2  items-center">
                                        <span><LuLayoutDashboard /></span>
                                        <span>Dashboard</span>
                                    </p>
                                </Link>
                                <p onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer flex gap-2 items-center text-red-500">
                                    <span><MdLogout /></span>
                                    <span>Logout</span>
                                </p>
                            </div>
                        )}
                    </div> :
                    <Link href='/login'>
                        <button className="px-4 py-2 font-medium rounded-lg bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50 text-sm cursor-pointer">
                            Login
                        </button>
                    </Link>
            }
        </div>
    );
};

export default NavAvatar;

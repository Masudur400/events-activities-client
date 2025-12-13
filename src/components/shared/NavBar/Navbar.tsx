"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import logo from '../../../../public/images/event.logo-2.png'
import { ModeToggle } from '@/components/ModeToggle'
import Avatar from 'react-avatar'

interface IUser {
  name: string;
  photo?: string; // URL of profile photo (optional)
}

const user: IUser = {
  name: "Masudur Rahman",
  photo: "https://example.com/profile.jpg", // যদি photo থাকে
};



export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname() // current route

  // helper to check active link
  const isActive = (href: string) => pathname === href

  const links = [
    { href: '/', label: 'Home' },
    { href: '/event', label: 'Event' },
    { href: '/about', label: 'About' },
    { href: '/service', label: 'Service' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-neutral-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT: Burger menu + logo (small devices) */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link href='/'>
            <Image src={logo} width={50} height={50} alt="Logo" />
          </Link>
        </div>

        {/* LEFT: Logo + Links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href='/'>
            <Image src={logo} width={50} height={50} alt="Logo" />
          </Link>
          <ul className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-yellow-700/90 px-4 py-1 ${isActive(link.href) ? 'text-yellow-600 bg-neutral-100 rounded-md dark:text-yellow-600 dark:bg-gray-900/50' : ''
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>

        {/* RIGHT: Avatar + ModeToggle */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* <Avatar name={name?.charAt(0)} src={photo} alt='img' className="rounded-full" size="45" onClick={() => setDropdownOpen(!dropdownOpen)}></Avatar> */}
            <Avatar
              name={user.name}
              src={user.photo}
              alt='img'
              size="45"
              className="rounded-full cursor-pointer border dark:border-gray-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}></Avatar>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border dark:border-gray-600 py-2">
                <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer flex gap-2 items-center">
                  <span><LuLayoutDashboard /></span>
                  <span>Dashboard</span>
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer flex gap-2 items-center text-red-500">
                  <span><MdLogout /></span>
                  <span>Logout</span>
                </p>
              </div>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-white dark:bg-gray-800 shadow-lg w-full py-4 text-gray-700 dark:text-gray-200 font-medium flex flex-col gap-4 px-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`hover:text-yellow-700/90 px-4 py-1 ${isActive(link.href) ? 'text-yellow-600 bg-neutral-100 rounded-md dark:text-yellow-600 dark:bg-gray-900/50' : ''
                }`}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      )}
    </nav>
  )
}

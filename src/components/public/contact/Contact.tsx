/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import {
  Mail,
  Send,
  User,
  MessageSquare,
  BookOpen,
  MapPin,
} from 'lucide-react'
import { useContact } from '@/hooks/contact/useContact'
import backgroundImage from '../../../../public/images/contact.png'

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { mutate: sendMail, isPending } = useContact()

  const onSubmit = (data: any) => {
    sendMail(data, {
      onSuccess: () => reset(),
    })
  }

  return (
    <div className="relative my-10 min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Contact background"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/70 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row gap-12 items-stretch">
        {/* Contact Info Side */}
        <div className="lg:w-1/3 flex flex-col justify-center text-white space-y-8">
          <div>
            <h1 className="text-5xl font-bold leading-none">
              Get In <span className="text-yellow-600">Touch</span>
            </h1>
            <p className="mt-4 text-gray-300 font-medium">
              Have questions about an event? Our team is here to help you
              24/7.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-4 bg-white/10 rounded-2xl bg-linear-to-br group-hover:from-yellow-900/50 group-hover:via-yellow-800/90 group-hover:to-yellow-900/50 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Email Us
                </p>
                <p className="text-lg font-semibold">
                  dev.mdmasudur@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-4 bg-white/10 rounded-2xl bg-linear-to-br group-hover:from-yellow-900/50 group-hover:via-yellow-800/90 group-hover:to-yellow-900/50 transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Office
                </p>
                <p className="text-lg font-semibold">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="lg:w-2/3 bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-md shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-200 ml-1 uppercase tracking-wider">
                  <User size={14} className="text-yellow-600" /> Full
                  Name
                </label>
                <input
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none transition-all"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-200 ml-1 uppercase tracking-wider">
                  <Mail size={14} className="text-yellow-600" /> Email
                  Address
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email',
                    },
                  })}
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none transition-all"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-200 ml-1 uppercase tracking-wider">
                <BookOpen size={14} className="text-yellow-600" /> Subject
              </label>
              <input
                {...register('subject', {
                  required: 'Subject is required',
                })}
                placeholder="How can we help?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none transition-all"
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.subject.message as string}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-200 ml-1 uppercase tracking-wider">
                <MessageSquare
                  size={14}
                  className="text-yellow-600"
                />{' '}
                Message
              </label>
              <textarea
                {...register('message', {
                  required: 'Message is required',
                })}
                rows={5}
                placeholder="Write your message here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none transition-all resize-none"
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.message.message as string}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full group flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-500 font-bold  px-4 py-3 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-xl shadow hover:shadow-lg"
            >
              {isPending ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact

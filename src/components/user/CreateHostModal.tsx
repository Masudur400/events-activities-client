/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useCreateHost } from '@/hooks/user/useCreateHost'
import { X, Upload, Eye, EyeOff,  } from 'lucide-react' // Eye আইকনগুলো ইম্পোর্ট করা হয়েছে
import { toast } from 'react-hot-toast'

interface CreateHostModalProps {
  open: boolean
  onClose: () => void
  onCreated?: () => void;
}

const CreateHostModal = ({ open, onClose }: CreateHostModalProps) => {
  const [picture, setPicture] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)  

  const { mutateAsync, isPending } = useCreateHost() as any

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (preview) URL.revokeObjectURL(preview)
      setPicture(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleRemovePicture = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPicture(null)
    setPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (picture) {
      formData.set('file', picture);
    }

    try {
      await mutateAsync(formData);
      toast.success('Host created successfully');
      
      handleRemovePicture(); 
      form.reset(); 
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to create host');
    }
  };

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl relative flex flex-col max-h-[95vh]">
        
        <div className="flex items-center justify-between p-5 border-b dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Host</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
            <X size={22} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              className="w-full border dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="host@example.com"
              className="w-full border dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Password Field with Eye Icon */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}  
                placeholder="••••••••"
                className="w-full border dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 pr-12 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Profile Picture Section */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Profile Picture</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-yellow-500 px-4 py-3 rounded-lg transition w-full text-center">
                <Upload size={18} className="text-gray-500" />
                <span className="text-sm text-gray-600">Click to upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            
            {preview && (
              <div className="mt-4 relative w-24 h-24 group">
                <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded-2xl border-2 border-yellow-500 shadow-md" />
                <button
                  type="button"
                  onClick={handleRemovePicture}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-red-600 transition"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t dark:border-gray-800">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl border dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-yellow-700/90 dark:bg-yellow-600 text-white font-bold hover:bg-yellow-700 transition disabled:opacity-50"
            >
              {isPending ? 'Creating...' : 'Create Host'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateHostModal
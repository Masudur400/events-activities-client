/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { IsActive } from '@/types/userTypes'
import { useUpdateUser } from '@/hooks/user/useUpdateUser'
import { User } from '@/hooks/user/useAllUsers'

interface Props {
  user: User | any
  onClose: () => void
  onUpdated?: () => void
}

const UpdateUserModal = ({ user, onClose, onUpdated }: Props) => {
  const [isActive, setIsActive] = useState<IsActive>(
    user.isActive ?? IsActive.INACTIVE
  )
  const [isVerified, setIsVerified] = useState<boolean>(
    user.isVerified ?? false
  )

  const { mutate, isLoading } = useUpdateUser() as any

  const handleUpdate = () => {
    const payload: {
      isActive?: IsActive
      isVerified?: boolean
    } = {}

    if (isActive !== user.isActive) payload.isActive = isActive
    if (isVerified !== user.isVerified) payload.isVerified = isVerified

    if (Object.keys(payload).length === 0) return

    mutate(
      { id: user._id, payload },
      {
        onSuccess: () => {
          onUpdated?.()
          onClose() // ✅ toast দেখানোর পর modal close
        }
      }
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md">

        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4">Update User</h2>

        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value as IsActive)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value={IsActive.ACTIVE}>ACTIVE</option>
          <option value={IsActive.INACTIVE}>INACTIVE</option>
          <option value={IsActive.BLOCKED}>BLOCKED</option>
        </select>

        <label className="flex gap-2 mb-4 items-center">
          <input
            type="checkbox"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
          />
          Verified
        </label>

        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded"
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  )
}

export default UpdateUserModal

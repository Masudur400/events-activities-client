/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { X, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateEvent } from '@/hooks/event/useCreateEvent'

interface CreateEventModalProps {
  open: boolean
  onClose: () => void
}

export default function CreateEventModal({ open, onClose }: CreateEventModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // ✅ React Query hook
  const { mutateAsync, isPending } = useCreateEvent()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
  })

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    const formData = new FormData(e.currentTarget)

    if (imageFile) {
      formData.set('file', imageFile)
    }

    const res = await mutateAsync(formData)

    if (!res.success) {
      setErrors(res.errors || {})
      toast.error(res.errors?.general || 'Validation failed')
      return
    }

    toast.success('Event created successfully!')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Create Event</h2>
              <button onClick={onClose}><X /></button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Event Name', 'eventName', 'text'],
                  ['Event Type', 'eventType', 'text'],
                  ['Date', 'date', 'date'],
                  ['Start Time', 'startTime', 'time'],
                  ['End Time', 'endTime', 'time'],
                  ['Min Participants', 'minParticipants', 'number'],
                  ['Max Participants', 'maxParticipants', 'number'],
                  ['Joining Fee', 'joiningFee', 'number'],
                ].map(([label, name, type]) => (
                  <div key={name} className="flex flex-col gap-1">
                    <label className="text-sm font-medium">{label}</label>
                    <Input name={name} type={type as any} required />
                    {errors[name] && (
                      <p className="text-red-500 text-xs">{errors[name]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="border rounded p-2 bg-transparent text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Event Image</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${
                    isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
                  }`}
                >
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <div className="relative w-full h-40">
                      <img src={imagePreview} className="w-full h-full object-cover rounded" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage()
                        }}
                        className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Drag & drop or click to upload
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Creating...' : 'Create Event'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

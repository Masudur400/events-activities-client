/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
'use client'

import { X, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone' 
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' 
import { useUpdateEvent } from '@/hooks/event/useUpdateEvent'

interface UpdateEventModalProps {
  open: boolean
  onClose: () => void
  event: any 
}

export default function UpdateEventModal({ open, onClose, event }: UpdateEventModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formValues, setFormValues] = useState({
    eventName: '',
    eventType: '',
    date: '',
    startTime: '',
    endTime: '',
    minParticipants: 0,
    maxParticipants: 0,
    joiningFee: 0,
    description: '',
  })

  const { mutateAsync, isPending } = useUpdateEvent()

  // Helper function to format ISO date to YYYY-MM-DD
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    try {
      return new Date(dateString).toISOString().split('T')[0]
    } catch (e) {
      return ''
    }
  }

  useEffect(() => {
    if (event && open) {
      setFormValues({
        eventName: event.eventName || '',
        eventType: event.eventType || '', 
        date: formatDate(event.date), 
        startTime: event.startTime || '',
        endTime: event.endTime || '',
        minParticipants: event.minParticipants || 0,
        maxParticipants: event.maxParticipants || 0,
        joiningFee: event.joiningFee || 0,
        description: event.description || '',
      })
      setImagePreview(event.image || null)
      setImageFile(null)  
    }
  }, [event, open])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormValues(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? Number(value) : value 
    }))
  }

  


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData();
  
  
  const dataToSubmit = {
    eventName: formValues.eventName,
    eventType: formValues.eventType,
    date: formValues.date,
    startTime: formValues.startTime,
    endTime: formValues.endTime,
    minParticipants: Number(formValues.minParticipants),
    maxParticipants: Number(formValues.maxParticipants),
    joiningFee: Number(formValues.joiningFee),
    description: formValues.description,
  };

  formData.append('data', JSON.stringify(dataToSubmit));

   
  if (imageFile) {
    formData.append('file', imageFile);
  }

  try {
    const res = await mutateAsync({ id: event._id, data: formData });
    if (res.success) onClose();
  } catch (error) {
    console.error("Update error:", error);
  }
}; 



  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-neutral-800">
              <h2 className="text-xl font-bold">Update Event</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Input
                      name={name}
                      type={type as any}
                      value={formValues[name as keyof typeof formValues]}
                      onChange={handleInputChange}
                      required
                      className={errors[name] ? 'border-red-500' : ''}
                    />
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
                  className="border rounded-md p-2 bg-transparent text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={formValues.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Event Image</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-neutral-700'
                  }`}
                >
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <div className="relative w-full h-44">
                      <img src={imagePreview} className="w-full h-full object-cover rounded-md" alt="Preview" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage()
                        }}
                        className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full text-white shadow-md hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div className=" flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="min-w-[120px]">
                  {isPending ? 'Updating...' : 'Update Event'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
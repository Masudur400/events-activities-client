'use client'

import React, { useEffect, useState } from 'react'
import MyEventsTable from './MyEventsTable'
import { getEventTypes } from '@/services/event/getEventTypes'
import CreateEventModal from './CreateEventModal'

const MyEventsTableWrapper = () => {
  const [eventTypes, setEventTypes] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await getEventTypes()
      if (res.success) setEventTypes(res.data || [])
    }
    fetchTypes()
  }, [])

  return (
    <div className="space-y-4">
      {/* Create Event Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow   hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
        >
          Create Event
        </button>
      </div>

      {/* Events Table */}
      <MyEventsTable eventTypes={eventTypes} />

      {/* Create Event Modal */}
      <CreateEventModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default MyEventsTableWrapper

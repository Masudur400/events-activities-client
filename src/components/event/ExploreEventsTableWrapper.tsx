'use client'

import React, { useEffect, useState } from 'react' 
import { getEventTypes } from '@/services/event/getEventTypes' 
import ExploreEventsTable from './ExploreEventsTable'

const ExploreEventsTableWrapper = () => {
  const [eventTypes, setEventTypes] = useState<string[]>([]) 

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await getEventTypes()
      if (res.success) setEventTypes(res.data || [])
    }
    fetchTypes()
  }, [])

  return (
    <div className="space-y-4"> 
      {/* Events Table */}
      <ExploreEventsTable eventTypes={eventTypes} /> 
    </div>
  )
}

export default ExploreEventsTableWrapper

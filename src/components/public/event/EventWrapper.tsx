'use client'
import React, { useEffect, useState } from 'react';
import Events from './Events';
import { getEventTypes } from '@/services/event/getEventTypes';

const EventWrapper = () => {

    const [eventTypes, setEventTypes] = useState<string[]>([]) 
    
      useEffect(() => {
        const fetchTypes = async () => {
          const res = await getEventTypes()
          if (res.success) setEventTypes(res.data || [])
        }
        fetchTypes()
      }, [])

    return (
        <div>
            <Events eventTypes={eventTypes}></Events>
        </div>
    );
};

export default EventWrapper;
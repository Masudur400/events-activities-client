// 'use client'

// import { useEffect, useState } from 'react'
// import CreateEventModal from './CreateEventModal'
// import { getEventTypes } from '@/services/event/getEventTypes'
// import { Search } from 'lucide-react'
// import { Input } from '../ui/input'


// interface EventTypeFilterProps {
//   onChange: (eventType: string) => void
// }


// const CreateEvent = () => {
//   const [open, setOpen] = useState(false)
//   const [eventTypes, setEventTypes] = useState<string[]>([])
//   const [loading, setLoading] = useState(false)
//   const [selectedType, setSelectedType] = useState('')

//   useEffect(() => {
//     const fetchTypes = async () => {
//       setLoading(true)
//       const res = await getEventTypes()
//       if (res.success && res.data) {
//         setEventTypes(res.data)
//       } else {
//         console.error(res.error)
//       }
//       setLoading(false)
//     }
//     fetchTypes()
//   }, [])

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value
//     setSelectedType(value)
//     console.log(value);
//     // onChange(value)
//   }

//   return (
//     <div className='flex   max-sm:flex-col-reverse justify-between items-center md:gap-10'>
//       {/* Search Input */}
//       <div className="relative w-full max-sm:mt-3">
//         <Search
//           className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer"
//         // onClick={handleSearchIconClick}
//         />
//         <Input
//           type="text"
//           placeholder="Search event..."
//           className="pl-9 pr-4"
//         // value={searchQuery}
//         // onChange={(e) => setSearchQuery(e.target.value)}
//         // onKeyDown={handleSearchKeyDown}
//         />
//       </div>
//       <div className='flex md:flex-col md:justify-self-end-safe'>
//         <div className="space-y-2 max-sm:flex items-center justify-between gap-5 w-full">
//           <button
//             onClick={() => setOpen(true)}
//             className="lg:px-8 px-4 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
//           >
//             Create Event
//           </button>
//           <div className="flex items-center gap-2 max-sm:mb-2">
//             <select
//               value={selectedType}
//               onChange={handleChange}
//               className="border-2 bg-linear-to-r from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 font-medium rounded-lg lg:px-8 px-2 py-2 shadow-md hover:shadow-lg text-sm text-white dark:bg-gray-900"
//               disabled={loading}
//             >
//               <option value="" className='text-[12px] text-black dark:text-white'>Filter By Event Type</option>
//               {eventTypes.map((type) => (
//                 <option key={type} value={type} className='text-[12px] text-black dark:text-white dark:bg-gray-900'>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//         </div>
//         <CreateEventModal open={open} onClose={() => setOpen(false)} />
//       </div>
//     </div>
//   )
// }

// export default CreateEvent

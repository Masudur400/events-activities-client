'use client'
import { useState } from 'react'
import AllHostTable from './AllHostTable'
import CreateHostModal from './CreateHostModal'

const AllHostTableWrapper = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className='container mx-auto'>
      <div className="flex justify-end pb-6 ">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
        >
          Create Host
        </button>
      </div>

      <AllHostTable />

      <CreateHostModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={() => console.log('Host created!')}
      />
    </div>
  )
}

export default AllHostTableWrapper

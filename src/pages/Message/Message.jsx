import React from 'react'
import Siidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Suggestion from '../../components/suggestion/Suggestion'

function Message() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
  {/* Sidebar */}
  <div className="w-full md:w-1/5 p-4">
    <Siidebar />
  </div>

  {/* Timeline */}
  <div className="flex-grow p-4">
    <Timeline />
  </div>

  {/* Suggestions */}
  <div className="w-full md:w-1/5 p-4 hidden md:block">
    <Suggestion />
  </div>
</div>

  )
}

export default Message
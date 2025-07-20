import React from 'react'

function Notification() {
  return (
    <div className='w-screen flex items-center inset-0 fixed h-screen bg-black/20 '>


    <div className="ml-96 relative w-96 h-[70vh]  rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl flex flex-col space-y-4 before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.15\'/></svg>')] before:bg-repeat before:z-[-1] before:rounded-2xl">Notification</div>

    </div>
  )
}

export default Notification
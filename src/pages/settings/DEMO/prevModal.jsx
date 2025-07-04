import React, { useState } from 'react'
import Modal from './prev';


function PrevModal() {
            const [isModalOpen, setIsModalOpen] = useState(false);

            return (
                <div className='bg-yellow-400 w-full h-screen justify-center items-center flex '>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-white rounded-lg text-indigo-600 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        Open Modal
                    </button>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>
            );
        }

export default PrevModal 
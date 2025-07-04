
import React from 'react'
import "../DEMO/prev.css"




       export default function Modal({ isOpen, onClose }) {
            if (!isOpen) return null;

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* Modal body */}
                    <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-20 shadow-xl noise-texture">

                        <h2 className="text-2xl font-semibold text-white mb-4">Glassmorphism Modal</h2>
                        <p className="text-white text-opacity-80 mb-6">
                            This is a beautiful glassmorphism modal with a subtle noise texture effect. 
                            The background blur creates a frosted glass appearance.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button 
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg border border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-medium hover:bg-opacity-90 transition-all"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

   


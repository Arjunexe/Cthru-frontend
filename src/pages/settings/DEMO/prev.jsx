import React, { useState } from "react";

const FuturisticModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg
                   hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
      >
        Launch Portal
      </button>

      {/* Futuristic Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative w-[320px] h-[320px] bg-gradient-to-br from-gray-900 via-gray-800 to-black
                       border border-cyan-400/60 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.5)]
                       animate-pulse-slow overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scanning Lines */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-px bg-cyan-400 animate-scan-y" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-cyan-400 animate-scan-y-reverse" />
            </div>

            {/* Glitch Frame */}
            <div className="absolute inset-0 border-2 border-cyan-400/70 rounded-lg animate-glitch" />

            {/* Picture Placeholder */}
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
                <span className="text-cyan-300 text-sm font-mono w-fit">
                  <img
                    src="https://res.cloudinary.com/da05006gl/image/upload/v1752650548/u9jvtgwgrriafxmpqkgz.jpg"
                    alt=""
                  />
                </span>
              </div>
            </div>

            {/* Corner Dots */}
            <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full" />
            <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-400 rounded-full" />
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-cyan-400 rounded-full" />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-cyan-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan-y {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(320px);
          }
        }
        @keyframes scan-y-reverse {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-320px);
          }
        }
        @keyframes glitch {
          0%,
          100% {
            clip-path: inset(0 0 0 0);
          }
          20% {
            clip-path: inset(20% 0 60% 0);
          }
          40% {
            clip-path: inset(50% 0 20% 0);
          }
          60% {
            clip-path: inset(80% 0 5% 0);
          }
          80% {
            clip-path: inset(10% 0 80% 0);
          }
        }
        .animate-scan-y {
          animation: scan-y 3s linear infinite;
        }
        .animate-scan-y-reverse {
          animation: scan-y-reverse 3s linear infinite;
        }
        .animate-glitch {
          animation: glitch 0.3s infinite linear alternate;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default FuturisticModal;

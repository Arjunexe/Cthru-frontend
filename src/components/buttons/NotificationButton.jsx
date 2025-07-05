<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glassmorphic Notification Button</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
        }
        
        @keyframes shine {
            0% { left: -100%; }
            20% { left: 100%; }
            100% { left: 100%; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        function NotificationButton() {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 to-orange-200">
                    <button className="relative px-8 py-4 rounded-xl bg-white/20 backdrop-blur-lg shadow-lg text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-lg group">
                        Notifications
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold shadow-md animate-pulse">
                            3
                        </div>
                        <div className="absolute inset-0 rounded-xl noise pointer-events-none"></div>
                        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transform rotate-45 transition-all duration-500"></div>
                    </button>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<NotificationButton />);
    </script>
</body>
</html>
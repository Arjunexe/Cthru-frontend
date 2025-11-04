import { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, MessageCircle, Settings } from "lucide-react";

export default function ExampleLogin() {
  const [posts] = useState([
    {
      id: 1,
      user: "Arjun",
      img: "https://picsum.photos/600/400?1",
      caption: "Morning vibes 🌤️",
    },
    {
      id: 2,
      user: "Maya",
      img: "https://picsum.photos/600/400?2",
      caption: "Weekend mood 🍃",
    },
    {
      id: 3,
      user: "Ravi",
      img: "https://picsum.photos/600/400?3",
      caption: "City lights ✨",
    },
  ]);

  return (
    <div className="min-h-screen w-full flex bg-slate-950 text-white relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 pointer-events-none"></div>

      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="m-6 hidden md:flex flex-col justify-between p-6 rounded-3xl 
          bg-white/10 backdrop-blur-2xl border border-white/15 
          shadow-[0_0_25px_rgba(255,255,255,0.05)] w-64 h-[90vh] sticky top-6"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white/90 mb-10">
            Cthru
          </h1>
          <nav className="flex flex-col gap-4">
            <NavItem icon={<Home />} label="Home" />
            <NavItem icon={<User />} label="Profile" />
            <NavItem icon={<MessageCircle />} label="Messages" />
            <NavItem icon={<Settings />} label="Settings" />
          </nav>
        </div>
        <div className="flex items-center gap-3 mt-10 border-t border-white/10 pt-4">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md" />
          <div>
            <p className="text-sm font-medium">You</p>
            <p className="text-xs text-slate-400">View Profile</p>
          </div>
        </div>
      </motion.aside>

      {/* Main Feed */}
      <main className="flex-1 p-6 md:p-10 flex flex-col items-center gap-8 overflow-y-auto">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl rounded-2xl overflow-hidden backdrop-blur-2xl 
              bg-white/10 border border-white/10 shadow-xl hover:bg-white/15 transition"
          >
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md" />
              <h2 className="text-lg font-semibold">{post.user}</h2>
            </div>
            <img
              src={post.img}
              alt="post"
              className="w-full object-cover max-h-[500px]"
            />
            <p className="p-4 text-slate-200 text-sm">{post.caption}</p>
          </motion.div>
        ))}
      </main>
    </div>
  );
}

function NavItem({ icon, label }) {
  return (
    <button
      className="flex items-center gap-3 px-3 py-2 w-full rounded-xl 
      hover:bg-white/10 transition text-slate-200"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </button>
  );
}

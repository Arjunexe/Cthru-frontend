import ProfileField from "../../components/profileLayouts/ProfileField";
export default function ExampleLogin() {
  return (
    <div className="min-h-screen w-screen flex justify-center items-centerbg-black/95 text-white">
      <div className="w-full max-w-lg p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative">
            <input
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept="image/jpeg, image/png, image/webp, image/jpg"
              type="file"
            />
            <ProfileField
              width="20"
              height="20"
              profilePicUrl={
                "https://res.cloudinary.com/da05006gl/image/upload/v1762347352/bvk4rshzqeiu1rquc96c.jpg"
              }
            />
          </div>
          <p className="mt-3 text-sm text-gray-300">
            Tap to change profile picture
          </p>
        </div>

        {/* Section Title */}
        <h2 className="text-xl font-semibold text-center mb-6 tracking-wide">
          Edit Profile
        </h2>

        {/* Bio */}
        <div className="w-full mb-6">
          <label className="block text-sm mb-2 text-gray-300">Bio</label>
          <textarea
            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm text-white placeholder-gray-400"
            rows="3"
            placeholder="Write something about yourself..."
          ></textarea>
        </div>

        {/* Input Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Username</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Email or Phone
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all shadow-md font-semibold">
            Save Changes
          </button>
        </div>

        {/* Change Password */}
        <div className="mt-6 text-center">
          <button className="text-sm text-gray-400 hover:text-blue-400 transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

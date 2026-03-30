import { ChevronRight, User, MapPin, Bell, Shield, Star, LogOut } from "lucide-react";

export function Settings() {
  return (
    <div className="pb-28 pt-12 px-5 h-full bg-gray-50/50 overflow-y-auto min-h-full">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Profile</h1>

      <div className="flex items-center gap-5 mb-8 bg-white p-5 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
        <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-0.5">Alex Johnson</h2>
          <p className="text-[#DE6543] font-bold text-sm">View and edit profile</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>

      <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Account Settings</h3>
      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-8">
        <SettingsItem icon={<User className="text-gray-700 w-5 h-5" />} label="Personal Information" />
        <SettingsItem icon={<MapPin className="text-gray-700 w-5 h-5" />} label="Location Preferences" />
        <SettingsItem icon={<Bell className="text-gray-700 w-5 h-5" />} label="Notifications" />
        <SettingsItem icon={<Shield className="text-gray-700 w-5 h-5" />} label="Privacy & Security" border={false} />
      </div>

      <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Premium</h3>
      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-8">
        <SettingsItem icon={<Star className="text-[#DE6543] w-5 h-5 fill-current" />} label="Get Pro Features" isPro border={false} />
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-red-500 font-bold text-[17px] py-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}

function SettingsItem({ icon, label, border = true, isPro = false }: { icon: React.ReactNode, label: string, border?: boolean, isPro?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-5 bg-white active:bg-gray-50 transition-colors cursor-pointer ${border ? 'border-b border-gray-50' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPro ? 'bg-[#DE6543]/10' : 'bg-gray-50'}`}>
          {icon}
        </div>
        <span className={`text-[16px] ${isPro ? 'text-[#DE6543] font-bold' : 'text-gray-900 font-semibold'}`}>{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300" />
    </div>
  );
}
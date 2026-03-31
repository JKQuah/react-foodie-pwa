import { Outlet, NavLink, useLocation } from "react-router";
import { Home, Users, UtensilsCrossed, MessageCircle, Settings } from "lucide-react";
import { useBadge } from "../context/BadgeContext";

export function Layout() {
  const location = useLocation();
  const hideNav = location.pathname.includes('/chats/');
  const { badgeCount } = useBadge();

  return (
    <div className="flex flex-col h-[100dvh] bg-white w-full max-w-md mx-auto relative overflow-hidden shadow-2xl md:ring-1 md:ring-gray-200">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {!hideNav && (
        <div className="border-t border-gray-100 bg-white/90 backdrop-blur-md pb-safe px-6 flex justify-between items-center z-50 absolute bottom-0 w-full pb-8 pt-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
          <NavItem to="/" icon={<Home />} label="Feed" />
          <NavItem to="/host" icon={<Users />} label="Plans" />
          <NavItem to="/match" icon={<UtensilsCrossed />} label="Match" />
          <NavItem to="/chats" icon={<MessageCircle />} label="Chats" badge={badgeCount} />
          <NavItem to="/settings" icon={<Settings />} label="Settings" />
        </div>
      )}
    </div>
  );
}

function NavItem({ to, icon, label, badge }: { to: string; icon: React.ReactNode; label: string; badge?: number }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1.5 text-[10px] transition-all ${isActive ? 'text-[#DE6543] scale-105' : 'text-gray-400'}`
      }
    >
      <div className="relative [&>svg]:w-[22px] [&>svg]:h-[22px]">
        {icon}
        {badge != null && badge > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-[#DE6543] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </div>
      <span className="font-semibold">{label}</span>
    </NavLink>
  );
}
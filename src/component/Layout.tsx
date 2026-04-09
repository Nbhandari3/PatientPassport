import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home, Sparkles, TestTubes, Pill, Salad, TrendingUp,
  CalendarDays, Clock, Bot, User, AlertTriangle, Menu, X, ChevronRight, Lock, ShieldCheck
} from "lucide-react";

const navItems = [
  { section: "Overview" },
  { name: "My Health Home", path: "/", icon: Home },
  { name: "Smart Reminders", path: "/action-plan", icon: Sparkles, badge: "LIVE" },
  { section: "✨ New Features" },
  { name: "Share Records", path: "/share-records", icon: Sparkles, badge: "NEW" },
  { name: "Doctor Hub", path: "/doctor-hub", icon: User },
  { section: "Health Data" },
  { name: "Personal Health Record", path: "/lab-results", icon: TestTubes },
  { name: "Medications", path: "/medications", icon: Pill },
  { name: "Health Trends", path: "/health-trends", icon: TrendingUp },
  { section: "Access" },
  { name: "Appointments", path: "/appointments", icon: CalendarDays },
  { name: "Med Schedule", path: "/med-schedule", icon: Clock },
  { name: "AI Assistant", path: "/ai-assistant", icon: Bot },
  { name: "Full Profile", path: "/profile", icon: User },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Mock profile
  const profile = {
    full_name: "Alex Johnson",
    passport_id: "PP-847291",
    blood_type: "O+",
    severity_level: "low",
    profile_image_url: null
  };

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "PP";

  const currentNav = navItems.find(n => n.path === location.pathname);
  const currentPageName = currentNav ? currentNav.name : (location.pathname === '/emergency' ? 'Emergency Card' : 'Patient Passport');

  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-[260px] z-50 flex flex-col overflow-y-auto overflow-x-hidden transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "#0E0C2E",
          backgroundImage: "radial-gradient(ellipse 120% 50% at 50% -5%, rgba(124,111,247,0.22) 0%, transparent 60%), radial-gradient(ellipse 80% 40% at 100% 90%, rgba(15,207,180,0.08) 0%, transparent 50%)"
        }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-[14px] flex items-center justify-center text-[22px] flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #0ECFB4, #7C6FF7)", boxShadow: "0 4px 20px rgba(14,207,180,0.4)" }}>
              🛂
            </div>
            <div>
              <div className="font-['Outfit'] text-[15px] font-extrabold text-white tracking-tight">Patient Passport</div>
              <div className="text-[10px] text-white/[0.38] tracking-[0.1em] uppercase mt-0.5">Personal Health</div>
            </div>
          </div>
        </div>

        {/* Profile */}
        <Link to="/profile" onClick={() => setSidebarOpen(false)}
          className="px-5 py-5 border-b border-white/[0.06] no-underline block hover:bg-white/[0.03] transition-colors">
          <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center font-['Outfit'] text-[20px] font-extrabold text-white mb-3 overflow-hidden"
            style={{
              background: profile?.profile_image_url ? "none" : "linear-gradient(135deg, #0ECFB4, #7C6FF7)",
              border: "2.5px solid rgba(14,207,180,0.5)",
              boxShadow: "0 0 0 5px rgba(14,207,180,0.08), 0 6px 20px rgba(0,0,0,0.3)"
            }}>
            {profile?.profile_image_url ? (
              <img src={profile.profile_image_url} alt="" className="w-full h-full object-cover" />
            ) : initials}
          </div>
          <div className="font-['Outfit'] text-[13px] font-bold text-white/95">{profile?.full_name || "Set Up Profile"}</div>
          <div className="text-[10.5px] text-white/[0.35] mt-0.5">{profile?.passport_id || "Click to configure"}</div>
          {profile?.blood_type && (
            <span className="inline-block mt-2 text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #FF5C72, #FF8A50)", boxShadow: "0 2px 10px rgba(255,92,114,0.4)" }}>
              🩸 {profile.blood_type}
            </span>
          )}
        </Link>

        {/* Severity */}
        {profile?.severity_level && (
          <div className={`mx-3.5 mt-3 px-3.5 py-2 rounded-xl text-[11.5px] font-bold flex items-center gap-2 ${
            profile.severity_level === "high" ? "bg-red-500/[0.12] text-[#FF5C72] border border-red-500/25" :
            profile.severity_level === "moderate" ? "bg-yellow-400/[0.12] text-[#FFD740] border border-yellow-400/25" :
            "bg-green-500/[0.12] text-[#26D07C] border border-green-500/25"
          }`}>
            <span>{profile.severity_level === "high" ? "🔴" : profile.severity_level === "moderate" ? "⚠️" : "✅"}</span>
            <span>{profile.severity_level === "high" ? "High Risk" : profile.severity_level === "moderate" ? "Moderate Risk" : "Low Risk"}</span>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-2.5">
          {navItems.map((item, i) => {
            if (item.section) {
              return (
                <div key={i} className="text-[9.5px] font-bold text-white/25 tracking-[0.12em] uppercase px-2.5 pt-3 pb-1">
                  {item.section}
                </div>
              );
            }
            const Icon = item.icon as React.ElementType;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path!}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl no-underline mb-0.5 transition-all duration-200 text-[13px] font-medium ${
                  isActive
                    ? "text-[#0ECFB4] font-bold border-l-[3px] border-[#0ECFB4] pl-[9px]"
                    : "text-white/50 hover:text-white/90 hover:bg-white/[0.07] hover:translate-x-[3px]"
                }`}
                style={isActive ? { background: "linear-gradient(135deg, rgba(14,207,180,0.18), rgba(124,111,247,0.1))" } : {}}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
                {item.badge && (
                  <span className={`ml-auto text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded-full ${
                    item.badge === "LIVE" || item.badge === "NEW"
                      ? "bg-gradient-to-br from-[#0ECFB4] to-[#7C6FF7]"
                      : "bg-gradient-to-br from-[#FF5C72] to-[#FF8A50]"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Emergency Button */}
        <div className="px-3.5 pb-4">
          <Link
            to="/emergency"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-[14px] text-white font-['Outfit'] text-[13px] font-extrabold no-underline tracking-wide transition-all duration-250 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #FF5C72, #FF8A50)",
              boxShadow: "0 6px 24px rgba(255,92,114,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
            }}
          >
            🚨 Emergency Card
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-h-screen lg:ml-[260px] flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-30 bg-white/92 backdrop-blur-xl border-b border-indigo-900/5 px-4 md:px-8 py-3 flex items-center justify-between"
          style={{ boxShadow: "0 2px 20px rgba(18,16,58,0.05)" }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-['Outfit'] text-[19px] font-extrabold text-slate-900 tracking-tight">
              {currentPageName}
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <Link to="/action-plan"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white no-underline transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #0ECFB4, #09A892)", boxShadow: "0 4px 16px rgba(14,207,180,0.38)" }}>
              <Sparkles className="w-3.5 h-3.5" /> Smart Reminders
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 animate-in flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

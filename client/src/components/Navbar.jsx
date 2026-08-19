import React from "react";

const Navbar = () => {
  return (
    <header className="h-16 bg-[#0B1120] border-b border-slate-800
                       flex items-center justify-between px-6 md:px-8">

      {/* Left */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-white">
          Admin Dashboard
        </h2>

        <p className="hidden md:block text-xs text-slate-500 mt-0.5">
          Quiz Management System
        </p>
      </div>


      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Status */}
        <div className="hidden sm:flex items-center gap-2
                        px-3 py-1.5 rounded-full
                        bg-emerald-500/10 border border-emerald-500/20">

          <span className="w-2 h-2 rounded-full bg-emerald-400
                           shadow-sm shadow-emerald-400/50">
          </span>

          <span className="text-xs font-medium text-emerald-400">
            Online
          </span>

        </div>


        {/* Welcome */}
        <span className="hidden sm:block text-sm text-slate-400">
          Welcome, <span className="text-slate-200 font-medium">Admin</span>
        </span>


        {/* Avatar */}
        <div className="w-10 h-10 rounded-xl
                        bg-gradient-to-br from-blue-500 to-purple-600
                        text-white flex items-center justify-center
                        font-bold
                        shadow-lg shadow-blue-500/20
                        hover:scale-105
                        transition-transform duration-300">
          A
        </div>

      </div>

    </header>
  );
};

export default Navbar;
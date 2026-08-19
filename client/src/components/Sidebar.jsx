import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const menuItems = [
        {
            name: "Dashboard",
            icon: "🏠",
            path: "/",
        },
        {
            name: "Users",
            icon: "👥",
            path: "/users",
        },
        {
            name: "Quizzes",
            icon: "📝",
            path: "/quizzes",
        },
        {
            name: "Subjects",
            icon: "📚",
            path: "/subjects",
        },
        {
            name: "Questions",
            icon: "❓",
            path: "/questions",
        },
        {
            name: "Results",
            icon: "📊",
            path: "/results",
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-[#070B14] text-white border-r border-slate-800 p-5 flex flex-col">

            {/* Logo */}
            <div className="mb-10 px-2">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600
                                    flex items-center justify-center text-xl
                                    shadow-lg shadow-blue-500/20">
                        🧠
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-white">
                            Quiz Admin
                        </h1>

                        <p className="text-xs text-slate-500">
                            Management Panel
                        </p>
                    </div>

                </div>

            </div>


            {/* Navigation */}
            <div className="mb-3 px-3">

                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600">
                    Menu
                </p>

            </div>


            <nav className="space-y-2">

                {menuItems.map((item) => {

                    const isActive =
                        location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl
                                transition-all duration-300
                                ${
                                    isActive
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                                }`}
                        >

                            <span
                                className={`text-lg transition-transform duration-300
                                    group-hover:scale-110
                                    ${isActive ? "scale-110" : ""}`}
                            >
                                {item.icon}
                            </span>

                            <span className="font-medium text-sm">
                                {item.name}
                            </span>

                            {isActive && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                            )}

                        </Link>
                    );

                })}

            </nav>


            {/* Bottom section */}
            <div className="mt-auto pt-6">

                <div className="border-t border-slate-800 pt-5">

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                   text-slate-400
                                   hover:text-red-400
                                   hover:bg-red-500/10
                                   border border-transparent
                                   hover:border-red-500/20
                                   transition-all duration-300"
                    >

                        <span className="text-lg">
                            🚪
                        </span>

                        <span className="font-medium text-sm">
                            Logout
                        </span>

                    </button>

                </div>

            </div>

        </aside>
    );
};

export default Sidebar;
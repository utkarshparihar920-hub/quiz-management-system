import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    totalQuestions: 0,
    totalAttempts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchDashboardStats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/dashboard/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.message || "Failed to fetch dashboard statistics"
          );
          return;
        }

        setStats(data);
      } catch (error) {
        console.error(
          "Error fetching dashboard statistics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-[#0B1120] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0">

        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="p-6 md:p-8 lg:p-10">

          {/* Header */}
          <div className="mb-8">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
              Overview
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Admin Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Welcome back! Here's what's happening in your Quiz
              Management System.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* Users */}
            <div
              className="group bg-[#111827] border border-slate-800 rounded-2xl p-6
              shadow-lg shadow-black/20
              hover:-translate-y-1 hover:border-blue-500/50
              hover:shadow-blue-500/10
              transition-all duration-300"
            >

              <div className="flex items-center justify-between mb-5">

                <div
                  className="w-12 h-12 rounded-xl bg-blue-500/10
                  flex items-center justify-center
                  text-2xl group-hover:bg-blue-500/20
                  transition"
                >
                  👥
                </div>

                <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  Live
                </span>

              </div>

              <p className="text-slate-400 text-sm">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-white mt-1">
                {loading ? "..." : stats.totalUsers}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Registered users
              </p>

            </div>


            {/* Quizzes */}
            <div
              className="group bg-[#111827] border border-slate-800 rounded-2xl p-6
              shadow-lg shadow-black/20
              hover:-translate-y-1 hover:border-purple-500/50
              hover:shadow-purple-500/10
              transition-all duration-300"
            >

              <div className="flex items-center justify-between mb-5">

                <div
                  className="w-12 h-12 rounded-xl bg-purple-500/10
                  flex items-center justify-center
                  text-2xl group-hover:bg-purple-500/20
                  transition"
                >
                  📝
                </div>

                <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                  Live
                </span>

              </div>

              <p className="text-slate-400 text-sm">
                Total Quizzes
              </p>

              <h2 className="text-3xl font-bold text-white mt-1">
                {loading ? "..." : stats.totalQuizzes}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Available quizzes
              </p>

            </div>


            {/* Questions */}
            <div
              className="group bg-[#111827] border border-slate-800 rounded-2xl p-6
              shadow-lg shadow-black/20
              hover:-translate-y-1 hover:border-violet-500/50
              hover:shadow-violet-500/10
              transition-all duration-300"
            >

              <div className="flex items-center justify-between mb-5">

                <div
                  className="w-12 h-12 rounded-xl bg-violet-500/10
                  flex items-center justify-center
                  text-2xl group-hover:bg-violet-500/20
                  transition"
                >
                  ❓
                </div>

                <span className="text-xs font-medium text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full">
                  Live
                </span>

              </div>

              <p className="text-slate-400 text-sm">
                Total Questions
              </p>

              <h2 className="text-3xl font-bold text-white mt-1">
                {loading ? "..." : stats.totalQuestions}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Questions in database
              </p>

            </div>


            {/* Attempts */}
            <div
              className="group bg-[#111827] border border-slate-800 rounded-2xl p-6
              shadow-lg shadow-black/20
              hover:-translate-y-1 hover:border-cyan-500/50
              hover:shadow-cyan-500/10
              transition-all duration-300"
            >

              <div className="flex items-center justify-between mb-5">

                <div
                  className="w-12 h-12 rounded-xl bg-cyan-500/10
                  flex items-center justify-center
                  text-2xl group-hover:bg-cyan-500/20
                  transition"
                >
                  📊
                </div>

                <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
                  Live
                </span>

              </div>

              <p className="text-slate-400 text-sm">
                Total Attempts
              </p>

              <h2 className="text-3xl font-bold text-white mt-1">
                {loading ? "..." : stats.totalAttempts}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Quiz submissions
              </p>

            </div>

          </div>


          {/* Recent Activity */}
          <div
            className="mt-8 bg-[#111827] border border-slate-800 rounded-2xl
            shadow-lg shadow-black/20 overflow-hidden"
          >

            <div className="p-6 border-b border-slate-800">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-blue-400 text-sm font-semibold uppercase tracking-wide">
                    Activity
                  </p>

                  <h2 className="text-2xl font-bold text-white mt-1">
                    Recent Activity
                  </h2>

                </div>

                <div
                  className="w-10 h-10 rounded-xl bg-blue-500/10
                  flex items-center justify-center"
                >
                  ⚡
                </div>

              </div>

            </div>


            <div className="p-6">

              <div className="space-y-3">

                <div
                  className="flex items-center gap-4 p-4 rounded-xl
                  bg-slate-900/60 border border-slate-800
                  hover:border-blue-500/30
                  transition"
                >

                  <div
                    className="w-10 h-10 rounded-full bg-blue-500/10
                    flex items-center justify-center"
                  >
                    📝
                  </div>

                  <div>

                    <p className="text-slate-200 font-medium">
                      Quiz Management System
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Dashboard statistics are connected to the database
                    </p>

                  </div>

                </div>


                <div
                  className="flex items-center gap-4 p-4 rounded-xl
                  bg-slate-900/60 border border-slate-800
                  hover:border-purple-500/30
                  transition"
                >

                  <div
                    className="w-10 h-10 rounded-full bg-purple-500/10
                    flex items-center justify-center"
                  >
                    📚
                  </div>

                  <div>

                    <p className="text-slate-200 font-medium">
                      Quiz Data
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {stats.totalQuizzes} quizzes available
                    </p>

                  </div>

                </div>


                <div
                  className="flex items-center gap-4 p-4 rounded-xl
                  bg-slate-900/60 border border-slate-800
                  hover:border-violet-500/30
                  transition"
                >

                  <div
                    className="w-10 h-10 rounded-full bg-violet-500/10
                    flex items-center justify-center"
                  >
                    ❓
                  </div>

                  <div>

                    <p className="text-slate-200 font-medium">
                      Question Bank
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {stats.totalQuestions} questions in database
                    </p>

                  </div>

                </div>


                <div
                  className="flex items-center gap-4 p-4 rounded-xl
                  bg-slate-900/60 border border-slate-800
                  hover:border-cyan-500/30
                  transition"
                >

                  <div
                    className="w-10 h-10 rounded-full bg-cyan-500/10
                    flex items-center justify-center"
                  >
                    📊
                  </div>

                  <div>

                    <p className="text-slate-200 font-medium">
                      Quiz Attempts
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {stats.totalAttempts} total submissions
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;
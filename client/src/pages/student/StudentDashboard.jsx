import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user || user.role !== "student") {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

            {/* Background Glow Effects */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>


            {/* Main Container */}
            <div className="relative max-w-7xl mx-auto p-6 md:p-8">


                {/* Header */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                        {/* Welcome Section */}
                        <div>

                            <div className="flex items-center gap-3 mb-3">

                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                                    <span className="text-2xl">
                                        🎓
                                    </span>

                                </div>

                                <span className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                                    Student Portal
                                </span>

                            </div>


                            <h1 className="text-3xl md:text-4xl font-bold">

                                Welcome Back,{" "}

                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Student
                                </span>

                                👋

                            </h1>


                            <p className="text-slate-400 mt-3">
                                Challenge yourself, test your knowledge and track your progress.
                            </p>

                        </div>


                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="
                                px-6
                                py-3
                                rounded-xl
                                bg-red-500/10
                                border
                                border-red-500/30
                                text-red-400
                                font-semibold
                                hover:bg-red-500
                                hover:text-white
                                transition-all
                                duration-300
                                hover:shadow-lg
                                hover:shadow-red-500/20
                            "
                        >
                            Logout
                        </button>

                    </div>

                </div>



                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-500/20 rounded-3xl p-8 md:p-10 mb-8">

                    {/* Decorative circles */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>

                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl"></div>


                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">

                        <div className="max-w-2xl">

                            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-sm font-semibold mb-4">
                                🚀 Keep Learning
                            </span>


                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">

                                Ready to test your{" "}

                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    knowledge?
                                </span>

                            </h2>


                            <p className="text-slate-400 mt-4 leading-relaxed">
                                Explore subjects, attempt quizzes and check your results.
                                Every quiz is an opportunity to learn something new.
                            </p>

                        </div>


                        {/* Hero Illustration */}
                        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/20 flex items-center justify-center shadow-2xl shadow-blue-500/10">

                            <div className="text-7xl">
                                🧠
                            </div>

                        </div>

                    </div>

                </div>



                {/* Section Heading */}
                <div className="flex items-center justify-between mb-5">

                    <div>

                        <h2 className="text-2xl font-bold">
                            Your Learning Space
                        </h2>

                        <p className="text-slate-500 text-sm mt-1">
                            Choose what you want to explore
                        </p>

                    </div>

                </div>



                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                    {/* Subjects */}
                    <Link to="/student-subjects">

                        <div
                            className="
                                group
                                relative
                                overflow-hidden
                                h-full
                                bg-slate-900/80
                                backdrop-blur-xl
                                border
                                border-slate-800
                                rounded-3xl
                                p-7
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:border-blue-500/50
                                hover:shadow-2xl
                                hover:shadow-blue-500/10
                            "
                        >

                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>


                            <div className="relative">

                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl mb-6">
                                    📚
                                </div>


                                <h3 className="text-xl font-bold">
                                    Subjects
                                </h3>


                                <p className="text-slate-400 mt-2 leading-relaxed">
                                    Explore different subjects and choose what you want to learn.
                                </p>


                                <div className="mt-6 text-blue-400 font-semibold flex items-center gap-2">
                                    Explore Subjects
                                    <span className="group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </div>

                            </div>

                        </div>

                    </Link>



                    {/* Available Quizzes */}
                    <Link to="/quiz-list">

                        <div
                            className="
                                group
                                relative
                                overflow-hidden
                                h-full
                                bg-slate-900/80
                                backdrop-blur-xl
                                border
                                border-slate-800
                                rounded-3xl
                                p-7
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:border-green-500/50
                                hover:shadow-2xl
                                hover:shadow-green-500/10
                            "
                        >

                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>


                            <div className="relative">

                                <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-3xl mb-6">
                                    📝
                                </div>


                                <h3 className="text-xl font-bold">
                                    Available Quizzes
                                </h3>


                                <p className="text-slate-400 mt-2 leading-relaxed">
                                    Find available quizzes and challenge yourself with exciting questions.
                                </p>


                                <div className="mt-6 text-green-400 font-semibold flex items-center gap-2">
                                    Start Quiz
                                    <span className="group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </div>

                            </div>

                        </div>

                    </Link>



                    {/* Results */}
                    <Link to="/student-results">

                        <div
                            className="
                                group
                                relative
                                overflow-hidden
                                h-full
                                bg-slate-900/80
                                backdrop-blur-xl
                                border
                                border-slate-800
                                rounded-3xl
                                p-7
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:border-purple-500/50
                                hover:shadow-2xl
                                hover:shadow-purple-500/10
                            "
                        >

                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>


                            <div className="relative">

                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-3xl mb-6">
                                    🏆
                                </div>


                                <h3 className="text-xl font-bold">
                                    Results
                                </h3>


                                <p className="text-slate-400 mt-2 leading-relaxed">
                                    Review your quiz attempts and track your learning performance.
                                </p>


                                <div className="mt-6 text-purple-400 font-semibold flex items-center gap-2">
                                    View Results
                                    <span className="group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </div>

                            </div>

                        </div>

                    </Link>

                </div>



                {/* Bottom Motivational Section */}
                <div className="mt-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 text-center">

                    <p className="text-slate-400">
                        💡 <span className="text-slate-300 font-medium">
                            Every question you answer makes you better.
                        </span>{" "}
                        Keep practicing and keep growing!
                    </p>

                </div>

            </div>

        </div>
    );
};

export default StudentDashboard;
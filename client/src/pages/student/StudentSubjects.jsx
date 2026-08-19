import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentSubjects = () => {

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchSubjects = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/subjects`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {

                    console.error(
                        data.message || "Failed to fetch subjects"
                    );

                    return;
                }

                setSubjects(data);

            } catch (error) {

                console.error(
                    "Error fetching subjects:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchSubjects();

    }, []);


    const subjectIcons = [
        "📚",
        "💻",
        "🧠",
        "🔬",
        "📐",
        "🌐",
        "⚡",
        "🎯",
    ];


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

                        <div>

                            <div className="flex items-center gap-3 mb-3">

                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                                    <span className="text-2xl">
                                        📚
                                    </span>

                                </div>

                                <span className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                                    Learning Hub
                                </span>

                            </div>


                            <h1 className="text-3xl md:text-4xl font-bold">

                                Select a{" "}

                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Subject
                                </span>

                            </h1>


                            <p className="text-slate-400 mt-3">
                                Choose a subject to explore available quizzes and test your knowledge.
                            </p>

                        </div>


                        {/* Subject Count */}

                        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl px-6 py-4 text-center min-w-[130px]">

                            <p className="text-2xl font-bold text-blue-400">
                                {subjects.length}
                            </p>

                            <p className="text-xs text-slate-400 uppercase tracking-wider">
                                Subjects
                            </p>

                        </div>

                    </div>

                </div>



                {/* Loading State */}

                {loading ? (

                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl py-20 flex flex-col items-center justify-center">

                        <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>

                        <p className="text-slate-400 mt-5">
                            Loading subjects...
                        </p>

                    </div>

                ) : subjects.length === 0 ? (

                    /* Empty State */

                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center">

                        <div className="text-6xl mb-5">
                            📚
                        </div>

                        <h2 className="text-2xl font-bold">
                            No Subjects Available
                        </h2>

                        <p className="text-slate-400 mt-2">
                            There are currently no subjects available.
                        </p>

                    </div>

                ) : (

                    /* Subject Cards */

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {subjects.map((subject, index) => (

                            <Link
                                key={subject.id}
                                to="/quiz-list"
                                state={subject.subject_name}
                                className="group"
                            >

                                <div
                                    className="
                                        relative
                                        overflow-hidden
                                        h-full
                                        min-h-[230px]
                                        bg-slate-900/80
                                        backdrop-blur-xl
                                        border
                                        border-slate-800
                                        rounded-3xl
                                        p-6
                                        transition-all
                                        duration-300
                                        hover:-translate-y-2
                                        hover:border-blue-500/40
                                        hover:shadow-2xl
                                        hover:shadow-blue-500/10
                                    "
                                >

                                    {/* Card Glow */}

                                    <div className="absolute -right-16 -top-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-300"></div>

                                    <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-300"></div>


                                    <div className="relative">

                                        {/* Icon */}

                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">

                                            {subjectIcons[index % subjectIcons.length]}

                                        </div>


                                        {/* Subject Name */}

                                        <h2 className="text-xl font-bold mt-6 group-hover:text-blue-400 transition-colors duration-300">

                                            {subject.subject_name}

                                        </h2>


                                        {/* Description */}

                                        <p className="text-slate-400 text-sm mt-2 leading-relaxed">

                                            Explore quizzes and test your knowledge in this subject.

                                        </p>


                                        {/* Bottom Action */}

                                        <div className="flex items-center justify-between mt-6">

                                            <span className="text-blue-400 font-semibold text-sm">
                                                View Quizzes
                                            </span>

                                            <span className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                                →
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}



                {/* Bottom Motivation */}

                {!loading && subjects.length > 0 && (

                    <div className="mt-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 text-center">

                        <p className="text-slate-400">

                            💡 <span className="text-slate-300 font-medium">
                                Pick a subject and start learning.
                            </span>{" "}
                            Your next challenge is waiting!

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

};

export default StudentSubjects;
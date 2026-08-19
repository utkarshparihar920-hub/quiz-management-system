import React, { useEffect, useState } from "react";

const StudentResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyResults = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/results/my-results",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error(
                        data.message || "Failed to fetch results"
                    );
                    return;
                }

                setResults(data);
            } catch (error) {
                console.error(
                    "Error fetching student results:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyResults();
    }, []);

    return (
        <div className="min-h-screen bg-[#070b17] text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">

            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto">

                {/* ================= HEADER ================= */}

                <div className="mb-8">

                    <div className="flex items-center gap-3 mb-3">

                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 17v-2a4 4 0 014-4h4"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 7h.01M17 7h.01"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                                />
                            </svg>

                        </div>

                        <div>

                            <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
                                Performance
                            </p>

                            <h1 className="text-3xl sm:text-4xl font-bold mt-1">
                                My Results
                            </h1>

                        </div>

                    </div>

                    <p className="text-slate-400 mt-4 max-w-2xl">
                        Review your completed quizzes and track your
                        performance over time.
                    </p>

                </div>


                {/* ================= MAIN CARD ================= */}

                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">

                    {/* Card Header */}

                    <div className="px-5 sm:px-7 py-5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <h2 className="text-xl font-semibold text-white">
                                Result History
                            </h2>

                            <p className="text-sm text-slate-400 mt-1">
                                Your completed quiz attempts
                            </p>

                        </div>

                        {!loading && results.length > 0 && (

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm">

                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />

                                {results.length}{" "}
                                {results.length === 1
                                    ? "Result"
                                    : "Results"}

                            </div>

                        )}

                    </div>


                    {/* ================= LOADING ================= */}

                    {loading && (

                        <div className="p-6">

                            <div className="space-y-4">

                                <div className="h-12 rounded-xl bg-white/[0.05] animate-pulse" />

                                <div className="h-16 rounded-xl bg-white/[0.05] animate-pulse" />

                                <div className="h-16 rounded-xl bg-white/[0.05] animate-pulse" />

                                <div className="h-16 rounded-xl bg-white/[0.05] animate-pulse" />

                            </div>

                        </div>

                    )}


                    {/* ================= NO RESULTS ================= */}

                    {!loading && results.length === 0 && (

                        <div className="text-center py-16 px-6">

                            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/10 flex items-center justify-center mb-5">

                                <svg
                                    className="w-10 h-10 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l6 6v10a2 2 0 01-2 2z"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 3v6h6"
                                    />
                                </svg>

                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                No Results Found
                            </h3>

                            <p className="text-slate-400 mt-2 max-w-md mx-auto">
                                Your completed quiz attempts will appear
                                here once you finish a quiz.
                            </p>

                        </div>

                    )}


                    {/* ================= DESKTOP TABLE ================= */}

                    {!loading && results.length > 0 && (

                        <>

                            <div className="hidden md:block overflow-x-auto">

                                <table className="w-full">

                                    <thead>

                                        <tr className="bg-white/[0.025] border-b border-white/[0.08]">

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Quiz
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Score
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Percentage
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Date
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {results.map((result) => (

                                            <tr
                                                key={result.id}
                                                className="border-b border-white/[0.05] last:border-b-0 hover:bg-blue-500/[0.035] transition-all duration-300"
                                            >

                                                {/* Quiz */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/10 flex items-center justify-center">

                                                            <svg
                                                                className="w-5 h-5 text-blue-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.7"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                                                                />
                                                            </svg>

                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-white">
                                                                {result.quiz_title}
                                                            </p>

                                                            <p className="text-xs text-slate-500 mt-1">
                                                                Quiz Attempt
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Score */}

                                                <td className="px-6 py-5">

                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-400/10 text-purple-300 font-semibold">

                                                        {result.score}

                                                    </span>

                                                </td>


                                                {/* Percentage */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <span className="font-bold text-white min-w-[50px]">
                                                            {result.percentage}%
                                                        </span>

                                                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">

                                                            <div
                                                                className={`h-full rounded-full transition-all duration-500 ${
                                                                    Number(result.percentage) >= 80
                                                                        ? "bg-emerald-400"
                                                                        : Number(result.percentage) >= 60
                                                                        ? "bg-blue-400"
                                                                        : Number(result.percentage) >= 40
                                                                        ? "bg-yellow-400"
                                                                        : "bg-red-400"
                                                                }`}
                                                                style={{
                                                                    width: `${Math.min(
                                                                        100,
                                                                        Math.max(
                                                                            0,
                                                                            Number(
                                                                                result.percentage
                                                                            ) || 0
                                                                        )
                                                                    )}%`,
                                                                }}
                                                            />

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Date */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-2 text-slate-400">

                                                        <svg
                                                            className="w-4 h-4 text-slate-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>

                                                        {new Date(
                                                            result.created_at
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>


                            {/* ================= MOBILE CARDS ================= */}

                            <div className="md:hidden divide-y divide-white/[0.07]">

                                {results.map((result) => (

                                    <div
                                        key={result.id}
                                        className="p-5 hover:bg-white/[0.025] transition-all duration-300"
                                    >

                                        <div className="flex items-start gap-3">

                                            <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/10 flex items-center justify-center">

                                                <svg
                                                    className="w-5 h-5 text-blue-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.7"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                                                    />
                                                </svg>

                                            </div>

                                            <div className="flex-1 min-w-0">

                                                <h3 className="font-semibold text-white truncate">
                                                    {result.quiz_title}
                                                </h3>

                                                <p className="text-xs text-slate-500 mt-1">
                                                    {new Date(
                                                        result.created_at
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>

                                            </div>

                                        </div>


                                        <div className="grid grid-cols-2 gap-3 mt-5">

                                            <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4">

                                                <p className="text-xs text-slate-500">
                                                    Score
                                                </p>

                                                <p className="text-xl font-bold text-purple-300 mt-1">
                                                    {result.score}
                                                </p>

                                            </div>


                                            <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4">

                                                <p className="text-xs text-slate-500">
                                                    Percentage
                                                </p>

                                                <p className="text-xl font-bold text-blue-400 mt-1">
                                                    {result.percentage}%
                                                </p>

                                            </div>

                                        </div>


                                        <div className="mt-4">

                                            <div className="flex items-center justify-between mb-2">

                                                <span className="text-xs text-slate-500">
                                                    Performance
                                                </span>

                                                <span className="text-xs font-semibold text-slate-300">
                                                    {result.percentage}%
                                                </span>

                                            </div>

                                            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                                                <div
                                                    className={`h-full rounded-full ${
                                                        Number(result.percentage) >= 80
                                                            ? "bg-emerald-400"
                                                            : Number(result.percentage) >= 60
                                                            ? "bg-blue-400"
                                                            : Number(result.percentage) >= 40
                                                            ? "bg-yellow-400"
                                                            : "bg-red-400"
                                                    }`}
                                                    style={{
                                                        width: `${Math.min(
                                                            100,
                                                            Math.max(
                                                                0,
                                                                Number(
                                                                    result.percentage
                                                                ) || 0
                                                            )
                                                        )}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </>

                    )}

                </div>

            </div>

        </div>
    );
};

export default StudentResults;
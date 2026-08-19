import React from "react";
import { Link, useLocation } from "react-router-dom";

const Result = () => {

    const location = useLocation();

    const result = location.state;


    if (!result) {

        return (

            <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex items-center justify-center p-6">

                {/* Background Glow */}

                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>


                <div className="relative max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">

                    <div className="text-6xl mb-5">
                        📊
                    </div>

                    <h1 className="text-2xl font-bold">
                        No Result Found
                    </h1>

                    <p className="text-slate-400 mt-3">
                        There is no quiz result available to display.
                    </p>


                    <Link
                        to="/quiz-list"
                        className="
                            inline-block
                            mt-7
                            px-6
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-600
                            font-semibold
                            hover:scale-105
                            transition-transform
                        "
                    >
                        Browse Quizzes →
                    </Link>

                </div>

            </div>

        );

    }


    const percentage = Number(result.percentage) || 0;

    const passed = percentage >= 40;


    return (

        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

            {/* Background Glow */}

            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>


            {/* Main Container */}

            <div className="relative max-w-4xl mx-auto p-6 md:p-8">


                {/* Header */}

                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">

                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center text-4xl shadow-lg shadow-blue-500/10">

                        {passed ? "🏆" : "📚"}

                    </div>


                    <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mt-5">
                        Quiz Completed
                    </p>


                    <h1 className="text-3xl md:text-4xl font-bold mt-2">

                        Your Quiz{" "}

                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Result
                        </span>

                    </h1>


                    <p className="text-slate-400 mt-3">

                        {passed
                            ? "Excellent work! Keep challenging yourself."
                            : "Keep practicing and come back stronger."}

                    </p>

                </div>



                {/* Score Card */}

                <div className="mt-6 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

                    <div className="flex flex-col items-center">


                        {/* Circular Score */}

                        <div className="relative w-48 h-48 flex items-center justify-center">

                            <div
                                className="
                                    absolute
                                    inset-0
                                    rounded-full
                                    bg-gradient-to-br
                                    from-blue-500
                                    to-purple-600
                                    opacity-20
                                    blur-xl
                                "
                            ></div>


                            <div className="relative w-40 h-40 rounded-full bg-slate-950 border-4 border-blue-500/30 flex flex-col items-center justify-center shadow-2xl">

                                <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    {percentage}%
                                </span>

                                <span className="text-xs text-slate-500 mt-1">
                                    SCORE
                                </span>

                            </div>

                        </div>


                        {/* Status */}

                        <div
                            className={`
                                mt-6
                                px-5
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                                border
                                ${
                                    passed
                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                        : "bg-red-500/10 text-red-400 border-red-500/20"
                                }
                            `}
                        >

                            {passed
                                ? "✓ Passed"
                                : "✕ Keep Practicing"}

                        </div>

                    </div>



                    {/* Statistics */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">


                        {/* Total Questions */}

                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-center">

                            <div className="text-2xl mb-2">
                                📝
                            </div>

                            <p className="text-2xl font-bold">
                                {result.totalQuestions}
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                Total Questions
                            </p>

                        </div>


                        {/* Correct Answers */}

                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-center">

                            <div className="text-2xl mb-2">
                                ✅
                            </div>

                            <p className="text-2xl font-bold text-green-400">
                                {result.score}
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                Correct Answers
                            </p>

                        </div>


                        {/* Percentage */}

                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-center">

                            <div className="text-2xl mb-2">
                                📈
                            </div>

                            <p className="text-2xl font-bold text-blue-400">
                                {percentage}%
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                Percentage
                            </p>

                        </div>

                    </div>



                    {/* Performance Bar */}

                    <div className="mt-8">

                        <div className="flex justify-between text-sm mb-2">

                            <span className="text-slate-400">
                                Performance
                            </span>

                            <span className="text-blue-400 font-semibold">
                                {percentage}%
                            </span>

                        </div>


                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                                style={{
                                    width: `${Math.min(percentage, 100)}%`
                                }}
                            ></div>

                        </div>

                    </div>

                </div>



                {/* Actions */}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Link
                        to="/quiz-list"
                        className="
                            text-center
                            px-6
                            py-4
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-600
                            font-semibold
                            shadow-lg
                            shadow-blue-500/10
                            hover:shadow-blue-500/30
                            hover:scale-[1.02]
                            transition-all
                        "
                    >
                        Try Another Quiz →
                    </Link>


                    <Link
                        to="/student-results"
                        className="
                            text-center
                            px-6
                            py-4
                            rounded-2xl
                            bg-slate-900/80
                            border
                            border-slate-700
                            text-slate-300
                            font-semibold
                            hover:bg-slate-800
                            hover:text-white
                            transition-all
                        "
                    >
                        View My Results
                    </Link>

                </div>



                {/* Bottom Message */}

                <div className="mt-6 text-center">

                    <p className="text-xs text-slate-600">
                        💡 Every attempt is a step toward improving your knowledge.
                    </p>

                </div>

            </div>

        </div>

    );

};


export default Result;
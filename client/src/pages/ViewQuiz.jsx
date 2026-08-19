import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewQuiz = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchQuiz = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    `http://localhost:5000/api/quizzes/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                console.log("Quiz details:", data);

                if (!response.ok) {

                    alert(
                        data.message ||
                        "Failed to fetch quiz"
                    );

                    return;
                }

                setQuiz(data.quiz);

            } catch (error) {

                console.error(
                    "Error fetching quiz:",
                    error
                );

                alert("Server error");

            } finally {

                setLoading(false);

            }

        };

        fetchQuiz();

    }, [id, navigate]);


    // Loading
    if (loading) {

        return (

            <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">

                <div className="text-center">

                    <div className="text-4xl mb-4">
                        ⏳
                    </div>

                    <p className="text-slate-400">
                        Loading quiz details...
                    </p>

                </div>

            </div>

        );

    }


    // Quiz not found
    if (!quiz) {

        return (

            <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center p-6">

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>

                    <h1 className="text-2xl font-bold mb-2">
                        Quiz Not Found
                    </h1>

                    <p className="text-slate-400 mb-6">
                        The requested quiz could not be found.
                    </p>

                    <button
                        onClick={() => navigate("/quizzes")}
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                        "
                    >
                        Back to Quizzes
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-8">

            {/* Header */}

            <div className="max-w-5xl mx-auto mb-8">

                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Quiz Management
                </p>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h1 className="text-3xl md:text-4xl font-bold">
                            Quiz Details
                        </h1>

                        <p className="text-slate-400 mt-2">
                            View complete information about this quiz.
                        </p>

                    </div>


                    {/* Status */}

                    <span
                        className={`
                            inline-flex
                            items-center
                            gap-2
                            w-fit
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                            ${
                                quiz.status === "Published"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            }
                        `}
                    >

                        <span className="w-2 h-2 rounded-full bg-current"></span>

                        {quiz.status}

                    </span>

                </div>

            </div>


            {/* Main Card */}

            <div className="max-w-5xl mx-auto">

                <div
                    className="
                        bg-[#111827]
                        border
                        border-slate-800
                        rounded-2xl
                        shadow-xl
                        shadow-black/20
                        overflow-hidden
                    "
                >

                    {/* Quiz Header */}

                    <div className="p-6 md:p-8 border-b border-slate-800">

                        <div className="flex items-start gap-4">

                            <div
                                className="
                                    w-14
                                    h-14
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-purple-500/20
                                    to-blue-500/20
                                    border
                                    border-purple-500/20
                                    flex
                                    items-center
                                    justify-center
                                    text-2xl
                                    shrink-0
                                "
                            >
                                📝
                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">
                                    {quiz.title}
                                </h2>

                                <p className="text-slate-400 mt-2">
                                    {quiz.description}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Quiz Information */}

                    <div className="p-6 md:p-8">

                        <h3 className="text-lg font-bold mb-6">
                            Quiz Information
                        </h3>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                            {/* Category */}

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

                                <p className="text-sm text-slate-500 mb-1">
                                    Category
                                </p>

                                <p className="font-semibold text-white">
                                    {quiz.category}
                                </p>

                            </div>


                            {/* Difficulty */}

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

                                <p className="text-sm text-slate-500 mb-1">
                                    Difficulty
                                </p>

                                <p className="font-semibold text-white">
                                    {quiz.difficulty}
                                </p>

                            </div>


                            {/* Duration */}

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

                                <p className="text-sm text-slate-500 mb-1">
                                    Duration
                                </p>

                                <p className="font-semibold text-white">
                                    ⏱️ {quiz.duration} Minutes
                                </p>

                            </div>


                            {/* Total Marks */}

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

                                <p className="text-sm text-slate-500 mb-1">
                                    Total Marks
                                </p>

                                <p className="font-semibold text-white">
                                    ⭐ {quiz.total_marks}
                                </p>

                            </div>


                            {/* Passing Marks */}

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

                                <p className="text-sm text-slate-500 mb-1">
                                    Passing Marks
                                </p>

                                <p className="font-semibold text-white">
                                    ✓ {quiz.passing_marks}
                                </p>

                            </div>


                            {/* Quiz ID */}

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

                                <p className="text-sm text-slate-500 mb-1">
                                    Quiz ID
                                </p>

                                <p className="font-semibold text-white">
                                    #{quiz.id}
                                </p>

                            </div>

                        </div>


                        {/* Description */}

                        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-5">

                            <p className="text-sm text-slate-500 mb-2">
                                Description
                            </p>

                            <p className="text-slate-300 leading-relaxed">
                                {quiz.description}
                            </p>

                        </div>


                        {/* Buttons */}

                        <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-slate-800">

                            <button
                                onClick={() => navigate("/quizzes")}
                                className="
                                    bg-slate-800
                                    hover:bg-slate-700
                                    text-slate-300
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >
                                ← Back to Quizzes
                            </button>


                            <button
                                onClick={() => navigate(`/edit-quiz/${id}`)}
                                className="
                                    bg-gradient-to-r
                                    from-purple-500
                                    to-blue-600
                                    hover:from-purple-600
                                    hover:to-blue-700
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition-all
                                    duration-300
                                "
                            >
                                ✏️ Edit Quiz
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ViewQuiz;
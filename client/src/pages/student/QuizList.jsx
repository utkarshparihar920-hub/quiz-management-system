import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const QuizList = () => {

    const location = useLocation();

    const subject = location.state;

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const fetchQuizzes = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/quizzes`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                console.log("Quizzes from database:", data);

                if (!response.ok) {

                    console.error(
                        data.message || "Failed to fetch quizzes"
                    );

                    return;
                }

                setQuizzes(data);

            } catch (error) {

                console.error(
                    "Error fetching quizzes:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchQuizzes();

    }, []);


    const subjectQuizzes = subject
        ? quizzes.filter(
            (quiz) => quiz.category === subject
        )
        : quizzes;


    const filteredQuizzes = subjectQuizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(search.toLowerCase()) ||
        quiz.category.toLowerCase().includes(search.toLowerCase()) ||
        quiz.difficulty.toLowerCase().includes(search.toLowerCase())
    );


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

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

                        <div>

                            <div className="flex items-center gap-3 mb-3">

                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                                    <span className="text-2xl">
                                        📝
                                    </span>

                                </div>

                                <span className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                                    Quiz Arena
                                </span>

                            </div>


                            <h1 className="text-3xl md:text-4xl font-bold">

                                {subject
                                    ? `${subject} Quizzes`
                                    : "Available Quizzes"}

                            </h1>


                            <p className="text-slate-400 mt-2">

                                {subject
                                    ? `Explore quizzes available in ${subject}.`
                                    : "Choose a quiz and test your knowledge."}

                            </p>

                        </div>


                        {/* Quiz Count */}

                        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl px-5 py-4 text-center min-w-[130px]">

                            <p className="text-2xl font-bold text-blue-400">
                                {filteredQuizzes.length}
                            </p>

                            <p className="text-xs text-slate-400 uppercase tracking-wider">
                                Quizzes
                            </p>

                        </div>

                    </div>

                </div>



                {/* Search Section */}

                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 md:p-6 mb-8 shadow-xl">

                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Search Box */}

                        <div className="relative flex-1">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                                🔍
                            </span>


                            <input
                                type="text"
                                placeholder="Search by quiz title, category or difficulty..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="
                                    w-full
                                    bg-slate-800/70
                                    border
                                    border-slate-700
                                    text-white
                                    placeholder-slate-500
                                    rounded-xl
                                    pl-12
                                    pr-4
                                    py-4
                                    focus:outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                    transition-all
                                "
                            />

                        </div>


                        {/* Clear Button */}

                        {search && (

                            <button
                                onClick={() => setSearch("")}
                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-slate-800
                                    border
                                    border-slate-700
                                    text-slate-300
                                    font-semibold
                                    hover:bg-red-500/10
                                    hover:border-red-500/30
                                    hover:text-red-400
                                    transition-all
                                "
                            >
                                Clear
                            </button>

                        )}

                    </div>

                </div>



                {/* Quiz Content */}

                {loading ? (

                    <div className="flex flex-col items-center justify-center py-20">

                        <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>

                        <p className="text-slate-400 mt-5">
                            Loading quizzes...
                        </p>

                    </div>

                ) : filteredQuizzes.length === 0 ? (

                    /* Empty State */

                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center">

                        <div className="text-6xl mb-5">
                            🔎
                        </div>

                        <h2 className="text-2xl font-bold">
                            No Quizzes Found
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Try changing your search or check again later.
                        </p>

                        {search && (

                            <button
                                onClick={() => setSearch("")}
                                className="
                                    mt-6
                                    px-6
                                    py-3
                                    bg-gradient-to-r
                                    from-blue-500
                                    to-purple-600
                                    rounded-xl
                                    font-semibold
                                    hover:scale-105
                                    transition-transform
                                "
                            >
                                Clear Search
                            </button>

                        )}

                    </div>

                ) : (

                    /* Quiz Cards */

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {filteredQuizzes.map((quiz) => (

                            <div
                                key={quiz.id}
                                className="
                                    group
                                    relative
                                    overflow-hidden
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

                                <div className="absolute -right-16 -top-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>


                                <div className="relative">

                                    {/* Quiz Icon */}

                                    <div className="flex justify-between items-start">

                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center text-3xl">
                                            🧠
                                        </div>


                                        {/* Difficulty Badge */}

                                        <span
                                            className={`
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                border
                                                ${
                                                    quiz.difficulty?.toLowerCase() === "easy"
                                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                        : quiz.difficulty?.toLowerCase() === "hard"
                                                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                }
                                            `}
                                        >
                                            {quiz.difficulty}
                                        </span>

                                    </div>


                                    {/* Title */}

                                    <h2 className="text-xl font-bold mt-6 group-hover:text-blue-400 transition-colors">

                                        {quiz.title}

                                    </h2>


                                    {/* Category */}

                                    <div className="flex items-center gap-2 mt-3">

                                        <span className="text-slate-500">
                                            📚
                                        </span>

                                        <span className="text-slate-400 text-sm">
                                            {quiz.category}
                                        </span>

                                    </div>


                                    {/* Duration */}

                                    <div className="flex items-center gap-2 mt-2">

                                        <span className="text-slate-500">
                                            ⏱️
                                        </span>

                                        <span className="text-slate-400 text-sm">
                                            {quiz.duration} minutes
                                        </span>

                                    </div>


                                    {/* Divider */}

                                    <div className="border-t border-slate-800 my-5"></div>


                                    {/* Start Quiz */}

                                    <Link
                                        to={`/attempt-quiz/${quiz.id}`}
                                        className="
                                            block
                                            w-full
                                            text-center
                                            bg-gradient-to-r
                                            from-blue-500
                                            to-purple-600
                                            text-white
                                            font-semibold
                                            py-3
                                            rounded-xl
                                            shadow-lg
                                            shadow-blue-500/10
                                            hover:shadow-blue-500/30
                                            hover:scale-[1.02]
                                            transition-all
                                        "
                                    >
                                        Start Quiz →
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
};

export default QuizList;
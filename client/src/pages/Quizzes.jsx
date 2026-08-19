import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Quizzes = () => {

    const [quizzes, setQuizzes] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

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

                console.log("Quiz API response:", data);

                if (!response.ok) {
                    console.error(data.message);
                    return;
                }

                setQuizzes(data);

            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this quiz?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/quizzes/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to delete quiz");
                return;
            }

            setQuizzes((previousQuizzes) =>
                previousQuizzes.filter((quiz) => quiz.id !== id)
            );

            alert("Quiz deleted successfully");

        } catch (error) {
            console.error("Error deleting quiz:", error);
            alert("Server error");
        }
    };


    const handleToggleStatus = async (id) => {

        try {
            const token = localStorage.getItem("token");

            const quiz = quizzes.find((q) => q.id === id);

            if (!quiz) {
                return;
            }

            const newStatus =
                quiz.status === "Published"
                    ? "Draft"
                    : "Published";

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/quizzes/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: quiz.title,
                        description: quiz.description,
                        category: quiz.category,
                        difficulty: quiz.difficulty,
                        duration: quiz.duration,
                        total_marks: quiz.total_marks,
                        passing_marks: quiz.passing_marks,
                        status: newStatus,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to update status");
                return;
            }

            setQuizzes((previousQuizzes) =>
                previousQuizzes.map((q) =>
                    q.id === id
                        ? { ...q, status: newStatus }
                        : q
                )
            );

        } catch (error) {
            console.error("Error updating status:", error);
            alert("Server error");
        }
    };


    const filteredQuizzes = quizzes.filter((quiz) => {

        const matchesSearch =
            quiz.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "All" ||
            quiz.category === categoryFilter;

        const matchesStatus =
            statusFilter === "All" ||
            quiz.status === statusFilter;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
        );
    });


    return (
        <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-8">

            {/* Header */}
            <div className="mb-8">

                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Administration
                </p>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div>

                        <h1 className="text-3xl md:text-4xl font-bold">
                            Quiz Management
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Create, manage, publish and organize your quizzes.
                        </p>

                    </div>


                    <Link to="/create-quiz">

                        <button
                            className="w-full lg:w-auto
                                       bg-gradient-to-r from-blue-500 to-purple-600
                                       hover:from-blue-600 hover:to-purple-700
                                       text-white font-semibold
                                       px-5 py-3 rounded-xl
                                       shadow-lg shadow-blue-500/20
                                       hover:-translate-y-0.5
                                       transition-all duration-300"
                        >
                            + Create Quiz
                        </button>

                    </Link>

                </div>

            </div>


            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                <div className="bg-[#111827] border border-slate-800 rounded-xl p-5">

                    <p className="text-sm text-slate-500">
                        Total Quizzes
                    </p>

                    <p className="text-2xl font-bold text-white mt-1">
                        {quizzes.length}
                    </p>

                </div>


                <div className="bg-[#111827] border border-slate-800 rounded-xl p-5">

                    <p className="text-sm text-slate-500">
                        Published
                    </p>

                    <p className="text-2xl font-bold text-emerald-400 mt-1">
                        {quizzes.filter(
                            (quiz) => quiz.status === "Published"
                        ).length}
                    </p>

                </div>


                <div className="bg-[#111827] border border-slate-800 rounded-xl p-5">

                    <p className="text-sm text-slate-500">
                        Drafts
                    </p>

                    <p className="text-2xl font-bold text-amber-400 mt-1">
                        {quizzes.filter(
                            (quiz) => quiz.status === "Draft"
                        ).length}
                    </p>

                </div>

            </div>


            {/* Main Card */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">


                {/* Filters */}
                <div className="p-6 border-b border-slate-800">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                        {/* Search */}
                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search quiz..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#0B1120]
                                           border border-slate-700
                                           text-white
                                           placeholder-slate-500
                                           pl-11 pr-4 py-3
                                           rounded-xl
                                           outline-none
                                           focus:border-blue-500
                                           focus:ring-2
                                           focus:ring-blue-500/10
                                           transition"
                            />

                        </div>


                        {/* Category */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="bg-[#0B1120]
                                       border border-slate-700
                                       text-slate-300
                                       px-4 py-3
                                       rounded-xl
                                       outline-none
                                       focus:border-blue-500
                                       transition"
                        >
                            <option value="All">All Categories</option>
                            <option value="Programming">Programming</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                        </select>


                        {/* Status */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-[#0B1120]
                                       border border-slate-700
                                       text-slate-300
                                       px-4 py-3
                                       rounded-xl
                                       outline-none
                                       focus:border-blue-500
                                       transition"
                        >
                            <option value="All">All Status</option>
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                        </select>

                    </div>

                </div>


                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

                        <thead>

                            <tr className="bg-slate-900/60 border-b border-slate-800">

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    ID
                                </th>

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Quiz
                                </th>

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Category
                                </th>

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Duration
                                </th>

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Status
                                </th>

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredQuizzes.map((quiz) => (

                                <tr
                                    key={quiz.id}
                                    className="border-b border-slate-800/80
                                               hover:bg-slate-900/50
                                               transition-colors duration-200"
                                >

                                    {/* ID */}
                                    <td className="px-6 py-4">

                                        <span className="text-slate-500 font-mono text-sm">
                                            #{quiz.id}
                                        </span>

                                    </td>


                                    {/* Title */}
                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-xl
                                                            bg-gradient-to-br
                                                            from-blue-500/20
                                                            to-purple-500/20
                                                            border border-blue-500/10
                                                            flex items-center justify-center
                                                            text-lg">
                                                📝
                                            </div>

                                            <div>

                                                <p className="text-slate-200 font-semibold">
                                                    {quiz.title}
                                                </p>

                                                <p className="text-xs text-slate-500 mt-1">
                                                    Quiz #{quiz.id}
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* Category */}
                                    <td className="px-6 py-4">

                                        <span className="inline-flex px-3 py-1
                                                         rounded-full
                                                         bg-purple-500/10
                                                         text-purple-400
                                                         border border-purple-500/20
                                                         text-xs font-semibold">
                                            {quiz.category}
                                        </span>

                                    </td>


                                    {/* Duration */}
                                    <td className="px-6 py-4">

                                        <span className="text-slate-400">
                                            ⏱️ {quiz.duration} min
                                        </span>

                                    </td>


                                    {/* Status */}
                                    <td className="px-6 py-4">

                                        <span
                                            className={`inline-flex items-center gap-2
                                                        px-3 py-1 rounded-full
                                                        text-xs font-semibold
                                                        border
                                                        ${
                                                            quiz.status === "Published"
                                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                        }`}
                                        >

                                            <span
                                                className={`w-1.5 h-1.5 rounded-full
                                                    ${
                                                        quiz.status === "Published"
                                                            ? "bg-emerald-400"
                                                            : "bg-amber-400"
                                                    }`}
                                            />

                                            {quiz.status}

                                        </span>

                                    </td>


                                    {/* Actions */}
                                    <td className="px-6 py-4">

                                        <div className="flex flex-wrap gap-2">

                                            <Link to={`/view-quiz/${quiz.id}`}>

                                                <button
                                                    className="px-3 py-2 rounded-lg
                                                               bg-emerald-500/10
                                                               text-emerald-400
                                                               border border-emerald-500/20
                                                               hover:bg-emerald-500
                                                               hover:text-white
                                                               transition-all duration-200"
                                                >
                                                    👁️ View
                                                </button>

                                            </Link>


                                            <Link to={`/edit-quiz/${quiz.id}`}>

                                                <button
                                                    className="px-3 py-2 rounded-lg
                                                               bg-blue-500/10
                                                               text-blue-400
                                                               border border-blue-500/20
                                                               hover:bg-blue-500
                                                               hover:text-white
                                                               transition-all duration-200"
                                                >
                                                    ✏️ Edit
                                                </button>

                                            </Link>


                                            <button
                                                onClick={() => handleDelete(quiz.id)}
                                                className="px-3 py-2 rounded-lg
                                                           bg-red-500/10
                                                           text-red-400
                                                           border border-red-500/20
                                                           hover:bg-red-500
                                                           hover:text-white
                                                           transition-all duration-200"
                                            >
                                                🗑️ Delete
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleToggleStatus(quiz.id)
                                                }
                                                className="px-3 py-2 rounded-lg
                                                           bg-purple-500/10
                                                           text-purple-400
                                                           border border-purple-500/20
                                                           hover:bg-purple-500
                                                           hover:text-white
                                                           transition-all duration-200"
                                            >
                                                {quiz.status === "Published"
                                                    ? "⏸️ Unpublish"
                                                    : "▶️ Publish"}
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* Empty State */}
                {filteredQuizzes.length === 0 && (

                    <div className="p-12 text-center">

                        <div className="text-4xl mb-3">
                            📝
                        </div>

                        <p className="text-slate-400">
                            No quizzes found.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Quizzes;
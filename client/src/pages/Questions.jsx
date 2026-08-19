import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Questions = () => {

    const [questions, setQuestions] = useState([]);

    // Fetch questions from backend
    useEffect(() => {

        const fetchQuestions = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/questions",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error(
                        data.message || "Failed to fetch questions"
                    );
                    return;
                }

                setQuestions(data);

            } catch (error) {

                console.error(
                    "Error fetching questions:",
                    error
                );

            }

        };

        fetchQuestions();

    }, []);


    // Delete Question
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/questions/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to delete question"
                );

                return;
            }

            alert("Question deleted successfully");

            setQuestions((previousQuestions) =>
                previousQuestions.filter(
                    (question) => question.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Delete Question Error:",
                error
            );

            alert("Server error");

        }

    };


    return (

        <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-8">

            {/* Header */}
            <div className="mb-8">

                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Administration
                </p>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div>

                        <h1 className="text-3xl md:text-4xl font-bold">
                            Question Management
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Create, review and manage questions for your quizzes.
                        </p>

                    </div>


                    {/* Total Questions */}
                    <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-3">

                        <p className="text-xs text-slate-500">
                            Total Questions
                        </p>

                        <p className="text-2xl font-bold text-blue-400">
                            {questions.length}
                        </p>

                    </div>

                </div>

            </div>


            {/* Main Card */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">


                {/* Card Header */}
                <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h2 className="text-xl font-bold text-white">
                            All Questions
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Manage questions and their correct answers.
                        </p>

                    </div>


                    <Link to="/add-question">

                        <button
                            className="
                                bg-gradient-to-r
                                from-blue-500
                                to-purple-600
                                hover:from-blue-600
                                hover:to-purple-700
                                text-white
                                font-semibold
                                px-5
                                py-3
                                rounded-xl
                                shadow-lg
                                shadow-blue-500/20
                                hover:-translate-y-0.5
                                transition-all
                                duration-300
                            "
                        >
                            + Add Question
                        </button>

                    </Link>

                </div>


                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead>

                            <tr className="bg-slate-900/60 border-b border-slate-800">

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Question
                                </th>

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Quiz ID
                                </th>

                                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Correct Answer
                                </th>

                                <th className="text-center px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {questions.length > 0 ? (

                                questions.map((question) => (

                                    <tr
                                        key={question.id}
                                        className="
                                            border-b
                                            border-slate-800/80
                                            hover:bg-slate-900/50
                                            transition-colors
                                            duration-200
                                        "
                                    >

                                        {/* Question */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-start gap-3">

                                                <div
                                                    className="
                                                        w-10
                                                        h-10
                                                        shrink-0
                                                        rounded-xl
                                                        bg-gradient-to-br
                                                        from-blue-500/20
                                                        to-purple-500/20
                                                        border
                                                        border-blue-500/10
                                                        flex
                                                        items-center
                                                        justify-center
                                                    "
                                                >
                                                    ❓
                                                </div>

                                                <div>

                                                    <p className="text-slate-200 font-semibold leading-relaxed">
                                                        {question.question}
                                                    </p>

                                                    <p className="text-xs text-slate-500 mt-1">
                                                        Question #{question.id}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Quiz ID */}
                                        <td className="px-6 py-5">

                                            <span
                                                className="
                                                    inline-flex
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-purple-500/10
                                                    text-purple-400
                                                    border
                                                    border-purple-500/20
                                                    text-xs
                                                    font-semibold
                                                "
                                            >
                                                Quiz #{question.quiz_id}
                                            </span>

                                        </td>


                                        {/* Correct Answer */}
                                        <td className="px-6 py-5">

                                            <span
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-emerald-500/10
                                                    text-emerald-400
                                                    border
                                                    border-emerald-500/20
                                                    text-xs
                                                    font-semibold
                                                "
                                            >
                                                ✓ {question.correct_answer}
                                            </span>

                                        </td>


                                        {/* Actions */}
                                        <td className="px-6 py-5">

                                            <div className="flex justify-center gap-2">

                                                {/* View */}
                                                <Link
                                                    to="/view-question"
                                                    state={question}
                                                >

                                                    <button
                                                        className="
                                                            px-3
                                                            py-2
                                                            rounded-lg
                                                            bg-emerald-500/10
                                                            text-emerald-400
                                                            border
                                                            border-emerald-500/20
                                                            hover:bg-emerald-500
                                                            hover:text-white
                                                            transition-all
                                                            duration-200
                                                        "
                                                    >
                                                        👁️ View
                                                    </button>

                                                </Link>


                                                {/* Edit */}
                                                <Link
                                                    to="/edit-question"
                                                    state={question}
                                                >

                                                    <button
                                                        className="
                                                            px-3
                                                            py-2
                                                            rounded-lg
                                                            bg-blue-500/10
                                                            text-blue-400
                                                            border
                                                            border-blue-500/20
                                                            hover:bg-blue-500
                                                            hover:text-white
                                                            transition-all
                                                            duration-200
                                                        "
                                                    >
                                                        ✏️ Edit
                                                    </button>

                                                </Link>


                                                {/* Delete */}
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            question.id
                                                        )
                                                    }
                                                    className="
                                                        px-3
                                                        py-2
                                                        rounded-lg
                                                        bg-red-500/10
                                                        text-red-400
                                                        border
                                                        border-red-500/20
                                                        hover:bg-red-500
                                                        hover:text-white
                                                        transition-all
                                                        duration-200
                                                    "
                                                >
                                                    🗑️ Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center p-12"
                                    >

                                        <div className="text-4xl mb-3">
                                            ❓
                                        </div>

                                        <p className="text-slate-400">
                                            No questions found.
                                        </p>

                                        <p className="text-slate-600 text-sm mt-1">
                                            Add your first question to get started.
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default Questions;
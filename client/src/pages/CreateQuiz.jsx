import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {

    const navigate = useNavigate();

    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        category: "",
        difficulty: "",
        duration: "",
        totalMarks: "",
        passingMarks: "",
        status: "Draft",
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setQuiz({
            ...quiz,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login again.");
                navigate("/login");
                return;
            }


            const response = await fetch(
                "http://localhost:5000/api/quizzes",
                {
                    method: "POST",

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
                        total_marks: quiz.totalMarks,
                        passing_marks: quiz.passingMarks,
                        status: quiz.status,
                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to create quiz"
                );

                return;
            }


            console.log(
                "Created Quiz:",
                data.quiz
            );


            alert("Quiz created successfully!");


            // Go back to Quiz Management
            navigate("/quizzes");


        } catch (error) {

            console.error(
                "Create Quiz Error:",
                error
            );

            alert(
                "Server error. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-8">

            {/* Header */}

            <div className="mb-8">

                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Quiz Management
                </p>

                <h1 className="text-3xl md:text-4xl font-bold">
                    Create New Quiz
                </h1>

                <p className="text-slate-400 mt-2">
                    Create and configure a new quiz for students.
                </p>

            </div>


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="
                    max-w-4xl
                    bg-[#111827]
                    border
                    border-slate-800
                    rounded-2xl
                    shadow-xl
                    shadow-black/20
                    overflow-hidden
                "
            >

                {/* Form Header */}

                <div className="p-6 md:p-8 border-b border-slate-800">

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                w-12
                                h-12
                                rounded-xl
                                bg-blue-500/10
                                border
                                border-blue-500/20
                                flex
                                items-center
                                justify-center
                                text-2xl
                            "
                        >
                            📝
                        </div>

                        <div>

                            <h2 className="text-xl font-bold">
                                Quiz Details
                            </h2>

                            <p className="text-sm text-slate-500">
                                Enter the information for your new quiz.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Form Body */}

                <div className="p-6 md:p-8 space-y-6">


                    {/* Title */}

                    <div>

                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Quiz Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter quiz title"
                            value={quiz.title}
                            onChange={handleChange}
                            required
                            className="
                                w-full
                                bg-slate-900
                                border
                                border-slate-700
                                text-white
                                placeholder-slate-600
                                p-3.5
                                rounded-xl
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/20
                            "
                        />

                    </div>


                    {/* Description */}

                    <div>

                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Enter quiz description"
                            value={quiz.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="
                                w-full
                                bg-slate-900
                                border
                                border-slate-700
                                text-white
                                placeholder-slate-600
                                p-3.5
                                rounded-xl
                                outline-none
                                resize-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/20
                            "
                        />

                    </div>


                    {/* Category + Difficulty */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                placeholder="e.g. Programming"
                                value={quiz.category}
                                onChange={handleChange}
                                required
                                className="
                                    w-full
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    text-white
                                    placeholder-slate-600
                                    p-3.5
                                    rounded-xl
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                "
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Difficulty
                            </label>

                            <select
                                name="difficulty"
                                value={quiz.difficulty}
                                onChange={handleChange}
                                required
                                className="
                                    w-full
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    text-white
                                    p-3.5
                                    rounded-xl
                                    outline-none
                                    focus:border-purple-500
                                    focus:ring-2
                                    focus:ring-purple-500/20
                                "
                            >

                                <option value="">
                                    Select Difficulty
                                </option>

                                <option value="Easy">
                                    Easy
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="Hard">
                                    Hard
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* Duration + Marks */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Duration (Minutes)
                            </label>

                            <input
                                type="number"
                                name="duration"
                                placeholder="30"
                                value={quiz.duration}
                                onChange={handleChange}
                                required
                                min="1"
                                className="
                                    w-full
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    text-white
                                    placeholder-slate-600
                                    p-3.5
                                    rounded-xl
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                "
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Total Marks
                            </label>

                            <input
                                type="number"
                                name="totalMarks"
                                placeholder="100"
                                value={quiz.totalMarks}
                                onChange={handleChange}
                                required
                                min="1"
                                className="
                                    w-full
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    text-white
                                    placeholder-slate-600
                                    p-3.5
                                    rounded-xl
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                "
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Passing Marks
                            </label>

                            <input
                                type="number"
                                name="passingMarks"
                                placeholder="40"
                                value={quiz.passingMarks}
                                onChange={handleChange}
                                required
                                min="1"
                                className="
                                    w-full
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    text-white
                                    placeholder-slate-600
                                    p-3.5
                                    rounded-xl
                                    outline-none
                                    focus:border-emerald-500
                                    focus:ring-2
                                    focus:ring-emerald-500/20
                                "
                            />

                        </div>

                    </div>


                    {/* Status */}

                    <div>

                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Quiz Status
                        </label>

                        <select
                            name="status"
                            value={quiz.status}
                            onChange={handleChange}
                            className="
                                w-full
                                bg-slate-900
                                border
                                border-slate-700
                                text-white
                                p-3.5
                                rounded-xl
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/20
                            "
                        >

                            <option value="Draft">
                                Draft
                            </option>

                            <option value="Published">
                                Published
                            </option>

                        </select>

                    </div>


                    {/* Buttons */}

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                bg-gradient-to-r
                                from-blue-500
                                to-purple-600
                                hover:from-blue-600
                                hover:to-purple-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                text-white
                                font-semibold
                                px-8
                                py-3
                                rounded-xl
                                transition-all
                                duration-300
                            "
                        >
                            {loading
                                ? "Creating Quiz..."
                                : "✓ Create Quiz"}
                        </button>


                        <button
                            type="button"
                            onClick={() => navigate("/quizzes")}
                            className="
                                bg-slate-800
                                hover:bg-slate-700
                                text-slate-300
                                font-semibold
                                px-8
                                py-3
                                rounded-xl
                                transition
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </form>

        </div>

    );
};

export default CreateQuiz;
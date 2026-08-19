import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const EditQuiz = () => {
    const { id } = useParams();
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    // Load existing quiz
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
                if (!response.ok) {
                    alert(
                        data.message ||
                        "Failed to fetch quiz"
                    );
                    return;
                }
                const quizData = data.quiz;
                setQuiz({
                    title: quizData.title || "",
                    description: quizData.description || "",
                    category: quizData.category || "",
                    difficulty: quizData.difficulty || "",
                    duration: quizData.duration || "",
                    totalMarks: quizData.total_marks || "",
                    passingMarks: quizData.passing_marks || "",
                    status: quizData.status || "Draft",
                });
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
    // Handle input changes
    const handleChange = (e) => {
        setQuiz({
            ...quiz,
            [e.target.name]: e.target.value,
        });
    };
    // Update quiz
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:5000/api/quizzes/${id}`,
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
                    "Failed to update quiz"
                );
                return;
            }
            alert("Quiz updated successfully!");
            navigate("/quizzes");
        } catch (error) {
            console.error(
                "Error updating quiz:",
                error
            );
            alert("Server error");
        } finally {
            setSaving(false);
        }
    };
    // Loading screen
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">
                        ⏳
                    </div>
                    <p className="text-slate-400">
                        Loading quiz...
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Quiz Management
                </p>
                <h1 className="text-3xl md:text-4xl font-bold">
                    Edit Quiz
                </h1>
                <p className="text-slate-400 mt-2">
                    Update the quiz information and settings.
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
                                bg-purple-500/10
                                border
                                border-purple-500/20
                                flex
                                items-center
                                justify-center
                                text-2xl
                            "
                        >
                            ✏️
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">
                                Quiz Information
                            </h2>
                            <p className="text-sm text-slate-500">
                                Modify the details of this quiz.
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
                            value={quiz.title}
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
                                value={quiz.category}
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
                    {/* Duration / Marks */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Duration (Minutes)
                            </label>
                            <input
                                type="number"
                                name="duration"
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
                            disabled={saving}
                            className="
                                bg-gradient-to-r
                                from-purple-500
                                to-blue-600
                                hover:from-purple-600
                                hover:to-blue-700
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
                            {saving
                                ? "Updating Quiz..."
                                : "✓ Update Quiz"}
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
export default EditQuiz;
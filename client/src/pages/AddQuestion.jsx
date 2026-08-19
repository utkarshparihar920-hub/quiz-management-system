import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {

    const navigate = useNavigate();

    const [quizId, setQuizId] = useState("");
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/questions`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        quiz_id: Number(quizId),
                        question: question,
                        option_a: optionA,
                        option_b: optionB,
                        option_c: optionC,
                        option_d: optionD,
                        correct_answer: correctAnswer,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to add question"
                );

                return;
            }

            alert("Question added successfully");

            navigate("/questions");

        } catch (error) {

            console.error(
                "Add Question Error:",
                error
            );

            alert("Server error");

        }
    };


    return (

        <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-8">

            {/* Header */}

            <div className="max-w-4xl mx-auto mb-8">

                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Question Management
                </p>

                <h1 className="text-3xl md:text-4xl font-bold">
                    Add Question
                </h1>

                <p className="text-slate-400 mt-2">
                    Add a new question to your quiz.
                </p>

            </div>


            {/* Form Card */}

            <div className="max-w-4xl mx-auto">

                <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-xl p-6 md:p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Quiz ID */}

                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Quiz ID
                            </label>

                            <input
                                type="number"
                                placeholder="Enter Quiz ID"
                                value={quizId}
                                onChange={(e) =>
                                    setQuizId(e.target.value)
                                }
                                className="
                                    w-full
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    text-white
                                    placeholder-slate-500
                                    p-3
                                    rounded-xl
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                "
                                required
                            />

                        </div>


                        {/* Question */}

                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Question
                            </label>

                            <textarea
                                placeholder="Enter your question..."
                                value={question}
                                onChange={(e) =>
                                    setQuestion(e.target.value)
                                }
                                rows="4"
                                className="
                                    w-full
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    text-white
                                    placeholder-slate-500
                                    p-3
                                    rounded-xl
                                    outline-none
                                    resize-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                "
                                required
                            />

                        </div>


                        {/* Options */}

                        <div>

                            <h2 className="text-lg font-bold mb-4">
                                Answer Options
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                                {/* Option A */}

                                <div>

                                    <label className="block text-sm font-semibold text-slate-400 mb-2">
                                        Option A
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter option A"
                                        value={optionA}
                                        onChange={(e) =>
                                            setOptionA(e.target.value)
                                        }
                                        className="
                                            w-full
                                            bg-slate-900
                                            border
                                            border-slate-700
                                            text-white
                                            placeholder-slate-500
                                            p-3
                                            rounded-xl
                                            outline-none
                                            focus:border-purple-500
                                            focus:ring-2
                                            focus:ring-purple-500/20
                                        "
                                        required
                                    />

                                </div>


                                {/* Option B */}

                                <div>

                                    <label className="block text-sm font-semibold text-slate-400 mb-2">
                                        Option B
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter option B"
                                        value={optionB}
                                        onChange={(e) =>
                                            setOptionB(e.target.value)
                                        }
                                        className="
                                            w-full
                                            bg-slate-900
                                            border
                                            border-slate-700
                                            text-white
                                            placeholder-slate-500
                                            p-3
                                            rounded-xl
                                            outline-none
                                            focus:border-purple-500
                                            focus:ring-2
                                            focus:ring-purple-500/20
                                        "
                                        required
                                    />

                                </div>


                                {/* Option C */}

                                <div>

                                    <label className="block text-sm font-semibold text-slate-400 mb-2">
                                        Option C
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter option C"
                                        value={optionC}
                                        onChange={(e) =>
                                            setOptionC(e.target.value)
                                        }
                                        className="
                                            w-full
                                            bg-slate-900
                                            border
                                            border-slate-700
                                            text-white
                                            placeholder-slate-500
                                            p-3
                                            rounded-xl
                                            outline-none
                                            focus:border-purple-500
                                            focus:ring-2
                                            focus:ring-purple-500/20
                                        "
                                        required
                                    />

                                </div>


                                {/* Option D */}

                                <div>

                                    <label className="block text-sm font-semibold text-slate-400 mb-2">
                                        Option D
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter option D"
                                        value={optionD}
                                        onChange={(e) =>
                                            setOptionD(e.target.value)
                                        }
                                        className="
                                            w-full
                                            bg-slate-900
                                            border
                                            border-slate-700
                                            text-white
                                            placeholder-slate-500
                                            p-3
                                            rounded-xl
                                            outline-none
                                            focus:border-purple-500
                                            focus:ring-2
                                            focus:ring-purple-500/20
                                        "
                                        required
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Correct Answer */}

                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Correct Answer
                            </label>

                            <select
                                value={correctAnswer}
                                onChange={(e) =>
                                    setCorrectAnswer(e.target.value)
                                }
                                className="
                                    w-full
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    text-white
                                    p-3
                                    rounded-xl
                                    outline-none
                                    focus:border-green-500
                                    focus:ring-2
                                    focus:ring-green-500/20
                                "
                                required
                            >

                                <option value="">
                                    Select Correct Answer
                                </option>

                                <option value="A">
                                    Option A
                                </option>

                                <option value="B">
                                    Option B
                                </option>

                                <option value="C">
                                    Option C
                                </option>

                                <option value="D">
                                    Option D
                                </option>

                            </select>

                        </div>


                        {/* Buttons */}

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">

                            <button
                                type="button"
                                onClick={() => navigate("/questions")}
                                className="
                                    flex-1
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
                                ← Cancel
                            </button>


                            <button
                                type="submit"
                                className="
                                    flex-1
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
                                ✓ Save Question
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
};

export default AddQuestion;
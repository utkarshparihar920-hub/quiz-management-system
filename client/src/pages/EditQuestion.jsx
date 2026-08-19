import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditQuestion = () => {

    const location = useLocation();
    const selectedQuestion = location.state;

    const navigate = useNavigate();

    const [question, setQuestion] = useState(
        selectedQuestion?.question || ""
    );

    const [quizId, setQuizId] = useState(
        selectedQuestion?.quiz_id || ""
    );

    const [optionA, setOptionA] = useState(
        selectedQuestion?.option_a || ""
    );

    const [optionB, setOptionB] = useState(
        selectedQuestion?.option_b || ""
    );

    const [optionC, setOptionC] = useState(
        selectedQuestion?.option_c || ""
    );

    const [optionD, setOptionD] = useState(
        selectedQuestion?.option_d || ""
    );

    const [correctAnswer, setCorrectAnswer] = useState(
        selectedQuestion?.correct_answer || ""
    );


    const handleUpdate = async (e) => {

        e.preventDefault();

        if (!selectedQuestion?.id) {
            alert("Question ID not found");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/questions/${selectedQuestion.id}`,
                {
                    method: "PUT",

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
                    "Failed to update question"
                );

                return;
            }

            alert("Question updated successfully");

            navigate("/questions");

        } catch (error) {

            console.error(
                "Update Question Error:",
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
                    Edit Question
                </h1>

                <p className="text-slate-400 mt-2">
                    Update the question and its answer options.
                </p>

            </div>


            {/* Form Card */}

            <div className="max-w-4xl mx-auto">

                <div className="
                    bg-[#111827]
                    border
                    border-slate-800
                    rounded-2xl
                    shadow-xl
                    p-6
                    md:p-8
                ">

                    <form
                        onSubmit={handleUpdate}
                        className="space-y-6"
                    >

                        {/* Question */}

                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Question
                            </label>

                            <textarea
                                value={question}
                                onChange={(e) =>
                                    setQuestion(e.target.value)
                                }
                                placeholder="Enter question..."
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


                        {/* Quiz ID */}

                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Quiz ID
                            </label>

                            <input
                                type="number"
                                value={quizId}
                                onChange={(e) =>
                                    setQuizId(e.target.value)
                                }
                                placeholder="Enter Quiz ID"
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


                        {/* Answer Options */}

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
                                        value={optionA}
                                        onChange={(e) =>
                                            setOptionA(e.target.value)
                                        }
                                        placeholder="Enter option A"
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
                                        value={optionB}
                                        onChange={(e) =>
                                            setOptionB(e.target.value)
                                        }
                                        placeholder="Enter option B"
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
                                        value={optionC}
                                        onChange={(e) =>
                                            setOptionC(e.target.value)
                                        }
                                        placeholder="Enter option C"
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
                                        value={optionD}
                                        onChange={(e) =>
                                            setOptionD(e.target.value)
                                        }
                                        placeholder="Enter option D"
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

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                            pt-6
                            border-t
                            border-slate-800
                        ">

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
                                ✓ Update Question
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditQuestion;
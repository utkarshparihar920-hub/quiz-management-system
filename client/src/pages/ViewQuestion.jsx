import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewQuestion = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const question = location.state;

    return (
        <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-8">

            {/* Header */}

            <div className="max-w-4xl mx-auto mb-8">

                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Question Management
                </p>

                <h1 className="text-3xl md:text-4xl font-bold">
                    View Question
                </h1>

                <p className="text-slate-400 mt-2">
                    View complete question and answer details.
                </p>

            </div>


            {/* Question Card */}

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

                    {question ? (

                        <div className="space-y-7">

                            {/* Question */}

                            <div>

                                <p className="text-blue-400 text-sm font-semibold mb-2">
                                    QUESTION
                                </p>

                                <div className="
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    rounded-xl
                                    p-5
                                ">

                                    <p className="text-lg font-semibold text-white leading-relaxed">
                                        {question.question}
                                    </p>

                                </div>

                            </div>


                            {/* Quiz ID */}

                            <div>

                                <p className="text-slate-400 text-sm mb-2">
                                    Quiz ID
                                </p>

                                <span className="
                                    inline-block
                                    bg-blue-500/10
                                    text-blue-400
                                    border
                                    border-blue-500/30
                                    px-4
                                    py-2
                                    rounded-lg
                                    font-semibold
                                ">
                                    {question.quiz_id}
                                </span>

                            </div>


                            {/* Options */}

                            <div>

                                <p className="text-slate-400 text-sm mb-3">
                                    Answer Options
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="
                                        bg-slate-900
                                        border
                                        border-slate-700
                                        rounded-xl
                                        p-4
                                    ">
                                        <span className="text-purple-400 font-bold mr-2">
                                            A.
                                        </span>
                                        <span className="text-slate-200">
                                            {question.option_a}
                                        </span>
                                    </div>


                                    <div className="
                                        bg-slate-900
                                        border
                                        border-slate-700
                                        rounded-xl
                                        p-4
                                    ">
                                        <span className="text-purple-400 font-bold mr-2">
                                            B.
                                        </span>
                                        <span className="text-slate-200">
                                            {question.option_b}
                                        </span>
                                    </div>


                                    <div className="
                                        bg-slate-900
                                        border
                                        border-slate-700
                                        rounded-xl
                                        p-4
                                    ">
                                        <span className="text-purple-400 font-bold mr-2">
                                            C.
                                        </span>
                                        <span className="text-slate-200">
                                            {question.option_c}
                                        </span>
                                    </div>


                                    <div className="
                                        bg-slate-900
                                        border
                                        border-slate-700
                                        rounded-xl
                                        p-4
                                    ">
                                        <span className="text-purple-400 font-bold mr-2">
                                            D.
                                        </span>
                                        <span className="text-slate-200">
                                            {question.option_d}
                                        </span>
                                    </div>

                                </div>

                            </div>


                            {/* Correct Answer */}

                            <div>

                                <p className="text-slate-400 text-sm mb-2">
                                    Correct Answer
                                </p>

                                <div className="
                                    bg-green-500/10
                                    border
                                    border-green-500/30
                                    rounded-xl
                                    p-4
                                ">

                                    <span className="text-green-400 font-bold text-lg">
                                        Option {question.correct_answer}
                                    </span>

                                </div>

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
                                    ← Back to Questions
                                </button>


                                <button
                                    onClick={() =>
                                        navigate("/edit-question", {
                                            state: question
                                        })
                                    }
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
                                    ✎ Edit Question
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="text-center py-12">

                            <p className="text-slate-400 text-lg mb-6">
                                No Question Found
                            </p>

                            <button
                                onClick={() => navigate("/questions")}
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
                                ← Back to Questions
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default ViewQuestion;
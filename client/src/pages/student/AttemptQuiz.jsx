import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AttemptQuiz = () => {
    const navigate = useNavigate();
    const { id: quiz_id } = useParams();

    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answers, setAnswers] = useState([]);

    const [timeLeft, setTimeLeft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);


    // Fetch quiz details and questions
    useEffect(() => {

        const fetchQuizData = async () => {

            try {

                const token = localStorage.getItem("token");

                // Fetch quiz details
                const quizResponse = await fetch(
                    `http://localhost:5000/api/quizzes/${quiz_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const quizData = await quizResponse.json();

                if (!quizResponse.ok) {

                    alert(
                        quizData.message ||
                        "Failed to fetch quiz"
                    );

                    return;
                }

                setQuiz(quizData.quiz);

                // Convert duration from minutes to seconds
                setTimeLeft(
                    Number(quizData.quiz.duration) * 60
                );


                // Fetch questions
                const questionResponse = await fetch(
                    `http://localhost:5000/api/questions/quiz/${quiz_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const questionData =
                    await questionResponse.json();

                if (!questionResponse.ok) {

                    alert(
                        questionData.message ||
                        "Failed to fetch questions"
                    );

                    return;
                }

                setQuestions(questionData);

            } catch (error) {

                console.error(
                    "Error fetching quiz:",
                    error
                );

                alert("Unable to load quiz");

            } finally {

                setLoading(false);

            }

        };

        fetchQuizData();

    }, [quiz_id]);


    // Timer
    useEffect(() => {

        if (
            timeLeft === null ||
            submitting
        ) {
            return;
        }


        if (timeLeft <= 0) {

            submitQuiz();

            return;
        }


        const timer = setInterval(() => {

            setTimeLeft(
                (previousTime) =>
                    previousTime - 1
            );

        }, 1000);


        return () => clearInterval(timer);

    }, [timeLeft, submitting]);


    // Format timer
    const formatTime = (seconds) => {

        const minutes = Math.floor(
            seconds / 60
        );

        const remainingSeconds =
            seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;

    };


    // Select answer
    const handleAnswerChange = (answer) => {

        setSelectedAnswer(answer);


        setAnswers((previousAnswers) => {

            const updatedAnswers = [
                ...previousAnswers
            ];


            const existingIndex =
                updatedAnswers.findIndex(
                    (item) =>
                        item.question_id ===
                        questions[currentQuestion].id
                );


            const answerData = {

                question_id:
                    questions[currentQuestion].id,

                selected_answer: answer

            };


            if (existingIndex !== -1) {

                updatedAnswers[
                    existingIndex
                ] = answerData;

            } else {

                updatedAnswers.push(
                    answerData
                );

            }


            return updatedAnswers;

        });

    };


    // Submit quiz
    const submitQuiz = async () => {

        if (submitting) {
            return;
        }


        setSubmitting(true);


        try {

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                "http://localhost:5000/api/results/submit",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({

                        quiz_id:
                            Number(quiz_id),

                        answers:
                            answers

                    }),
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to submit quiz"
                );

                setSubmitting(false);

                return;
            }


            navigate("/result", {

                state: data.result

            });


        } catch (error) {

            console.error(
                "Error submitting quiz:",
                error
            );

            alert("Server error");

            setSubmitting(false);

        }

    };


    // Previous question
    const previousQuestion = () => {

        if (currentQuestion === 0) {
            return;
        }

        setCurrentQuestion(currentQuestion - 1);

        const previousQuestionId =
            questions[currentQuestion - 1].id;

        const existingAnswer = answers.find(
            (answer) =>
                answer.question_id === previousQuestionId
        );

        setSelectedAnswer(
            existingAnswer
                ? existingAnswer.selected_answer
                : ""
        );

    };


    // Next question
    const nextQuestion = () => {

        if (currentQuestion === questions.length - 1) {

            submitQuiz();

            return;
        }


        setCurrentQuestion(currentQuestion + 1);


        const nextQuestionId =
            questions[currentQuestion + 1].id;

        const existingAnswer = answers.find(
            (answer) =>
                answer.question_id === nextQuestionId
        );


        setSelectedAnswer(
            existingAnswer
                ? existingAnswer.selected_answer
                : ""
        );

    };


    // Loading
    if (loading) {

        return (

            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden">

                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

                <div className="relative text-center">

                    <div className="w-14 h-14 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>

                    <p className="text-slate-400 mt-5">
                        Loading quiz...
                    </p>

                </div>

            </div>

        );

    }


    // No questions
    if (questions.length === 0) {

        return (

            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden">

                <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>

                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 text-center max-w-md mx-6">

                    <div className="text-6xl mb-5">
                        📝
                    </div>

                    <h2 className="text-2xl font-bold">
                        No Questions Found
                    </h2>

                    <p className="text-slate-400 mt-3">
                        No questions are currently available for this quiz.
                    </p>

                </div>

            </div>

        );

    }


    const currentQuestionData =
        questions[currentQuestion];


    const options = [
        {
            key: "A",
            text: currentQuestionData.option_a
        },
        {
            key: "B",
            text: currentQuestionData.option_b
        },
        {
            key: "C",
            text: currentQuestionData.option_c
        },
        {
            key: "D",
            text: currentQuestionData.option_d
        }
    ];


    const answeredCount = answers.length;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;


    const isLastQuestion =
        currentQuestion === questions.length - 1;


    const isTimerCritical =
        timeLeft !== null && timeLeft <= 60;


    return (

        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

            {/* Background Glow */}

            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>


            {/* Main Container */}

            <div className="relative max-w-5xl mx-auto p-5 md:p-8">


                {/* Header */}

                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 md:p-7 shadow-2xl mb-6">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

                        <div>

                            <div className="flex items-center gap-3 mb-3">

                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                                    <span className="text-xl">
                                        🧠
                                    </span>

                                </div>

                                <span className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                                    Quiz Arena
                                </span>

                            </div>


                            <h1 className="text-2xl md:text-3xl font-bold">

                                {quiz?.title ||
                                    "Attempt Quiz"}

                            </h1>


                            <p className="text-slate-400 mt-2">

                                Question {currentQuestion + 1} of{" "}
                                {questions.length}

                            </p>

                        </div>


                        {/* Timer */}

                        <div
                            className={`
                                px-5
                                py-3
                                rounded-2xl
                                border
                                font-bold
                                text-xl
                                flex
                                items-center
                                gap-2
                                transition-all
                                ${
                                    isTimerCritical
                                        ? "bg-red-500/10 border-red-500/40 text-red-400 animate-pulse"
                                        : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                }
                            `}
                        >

                            <span>
                                ⏱️
                            </span>

                            <span>
                                {timeLeft !== null
                                    ? formatTime(timeLeft)
                                    : "--:--"}
                            </span>

                        </div>

                    </div>


                    {/* Progress */}

                    <div className="mt-6">

                        <div className="flex justify-between text-xs text-slate-500 mb-2">

                            <span>
                                Quiz Progress
                            </span>

                            <span>
                                {Math.round(progress)}%
                            </span>

                        </div>


                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                                style={{
                                    width: `${progress}%`
                                }}
                            ></div>

                        </div>

                    </div>

                </div>



                {/* Question Card */}

                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">

                    {/* Question Number */}

                    <div className="flex items-center justify-between mb-6">

                        <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">

                            Question {currentQuestion + 1}

                        </span>


                        <span className="text-sm text-slate-500">

                            {answeredCount} / {questions.length} answered

                        </span>

                    </div>


                    {/* Question */}

                    <h2 className="text-xl md:text-2xl font-bold leading-relaxed">

                        {currentQuestionData.question}

                    </h2>


                    {/* Options */}

                    <div className="mt-8 space-y-4">

                        {options.map((option) => {

                            const isSelected =
                                selectedAnswer === option.key;


                            return (

                                <label
                                    key={option.key}
                                    className={`
                                        group
                                        flex
                                        items-center
                                        gap-4
                                        p-4
                                        md:p-5
                                        rounded-2xl
                                        border
                                        cursor-pointer
                                        transition-all
                                        duration-300
                                        ${
                                            isSelected
                                                ? "bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/10"
                                                : "bg-slate-800/40 border-slate-700 hover:border-blue-500/40 hover:bg-slate-800/80"
                                        }
                                    `}
                                >

                                    {/* Custom Radio */}

                                    <input
                                        type="radio"
                                        value={option.key}
                                        checked={
                                            selectedAnswer ===
                                            option.key
                                        }
                                        onChange={() =>
                                            handleAnswerChange(
                                                option.key
                                            )
                                        }
                                        className="sr-only"
                                    />


                                    <div
                                        className={`
                                            w-11
                                            h-11
                                            flex
                                            items-center
                                            justify-center
                                            rounded-xl
                                            font-bold
                                            transition-all
                                            duration-300
                                            ${
                                                isSelected
                                                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-105"
                                                    : "bg-slate-800 text-slate-400 group-hover:text-blue-400"
                                            }
                                        `}
                                    >
                                        {option.key}
                                    </div>


                                    <span
                                        className={`
                                            flex-1
                                            text-sm
                                            md:text-base
                                            ${
                                                isSelected
                                                    ? "text-white font-medium"
                                                    : "text-slate-300"
                                            }
                                        `}
                                    >
                                        {option.text}
                                    </span>


                                    {isSelected && (

                                        <span className="text-blue-400 text-xl">
                                            ✓
                                        </span>

                                    )}

                                </label>

                            );

                        })}

                    </div>


                    {/* Navigation */}

                    <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-4">

                        {/* Previous */}

                        <button
                            onClick={previousQuestion}
                            disabled={
                                currentQuestion === 0 ||
                                submitting
                            }
                            className="
                                px-6
                                py-3
                                rounded-xl
                                bg-slate-800
                                border
                                border-slate-700
                                text-slate-300
                                font-semibold
                                hover:bg-slate-700
                                hover:text-white
                                transition-all
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                            "
                        >
                            ← Previous
                        </button>


                        {/* Next / Submit */}

                        <button
                            onClick={nextQuestion}
                            disabled={submitting}
                            className="
                                px-7
                                py-3
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-500
                                to-purple-600
                                text-white
                                font-semibold
                                shadow-lg
                                shadow-blue-500/10
                                hover:shadow-blue-500/30
                                hover:scale-[1.02]
                                transition-all
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >

                            {submitting
                                ? "Submitting..."
                                : isLastQuestion
                                    ? "Submit Quiz ✓"
                                    : "Next Question →"}

                        </button>

                    </div>

                </div>



                {/* Bottom Hint */}

                <div className="mt-5 text-center">

                    <p className="text-xs text-slate-600">
                        💡 Select the answer you think is correct. Your final score is calculated securely by the server.
                    </p>

                </div>

            </div>

        </div>

    );
};

export default AttemptQuiz;
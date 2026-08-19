import React, { useEffect, useState } from "react";

const Results = () => {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResults = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/results`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.message || "Failed to fetch results"
          );
          return;
        }

        setResults(data);

        console.log("Results API data:", data);

      } catch (error) {

        console.error(
          "Error fetching results:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchResults();

  }, []);


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
              Results Management
            </h1>

            <p className="text-slate-400 mt-2">
              Monitor student quiz performance and results.
            </p>

          </div>


          {/* Total Attempts */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-3">

            <p className="text-xs text-slate-500">
              Total Attempts
            </p>

            <p className="text-2xl font-bold text-blue-400">
              {results.length}
            </p>

          </div>

        </div>

      </div>


      {/* Statistics */}
      {!loading && results.length > 0 && (

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          {/* Attempts */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-5">

            <p className="text-sm text-slate-500">
              Total Attempts
            </p>

            <p className="text-2xl font-bold text-white mt-1">
              {results.length}
            </p>

          </div>


          {/* Average Score */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-5">

            <p className="text-sm text-slate-500">
              Average Percentage
            </p>

            <p className="text-2xl font-bold text-purple-400 mt-1">

              {(
                results.reduce(
                  (total, result) =>
                    total + Number(result.percentage || 0),
                  0
                ) / results.length
              ).toFixed(1)}%

            </p>

          </div>


          {/* Passed */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-5">

            <p className="text-sm text-slate-500">
              Successful Attempts
            </p>

            <p className="text-2xl font-bold text-emerald-400 mt-1">

              {
                results.filter(
                  (result) =>
                    Number(result.percentage || 0) >= 40
                ).length
              }

            </p>

          </div>

        </div>

      )}


      {/* Results Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">

        {/* Card Header */}
        <div className="p-6 border-b border-slate-800">

          <h2 className="text-xl font-bold">
            Student Quiz Results
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Review student attempts and performance.
          </p>

        </div>


        {/* Loading */}
        {loading && (

          <div className="p-12 text-center">

            <div className="text-4xl mb-4">
              ⏳
            </div>

            <p className="text-slate-400">
              Loading results...
            </p>

          </div>

        )}


        {/* Empty */}
        {!loading && results.length === 0 && (

          <div className="p-12 text-center">

            <div className="text-4xl mb-4">
              📊
            </div>

            <p className="text-slate-400">
              No results found.
            </p>

            <p className="text-slate-600 text-sm mt-1">
              Student quiz attempts will appear here.
            </p>

          </div>

        )}


        {/* Table */}
        {!loading && results.length > 0 && (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>

                <tr className="bg-slate-900/60 border-b border-slate-800">

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Student
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Quiz
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Score
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Percentage
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                </tr>

              </thead>


              <tbody>

                {results.map((result) => (

                  <tr
                    key={result.id}
                    className="
                      border-b
                      border-slate-800/80
                      hover:bg-slate-900/50
                      transition-colors
                      duration-200
                    "
                  >

                    {/* Student */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-gradient-to-br
                            from-blue-500/20
                            to-purple-500/20
                            border
                            border-blue-500/10
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-blue-400
                          "
                        >
                          {result.student_name
                            ? result.student_name
                                .charAt(0)
                                .toUpperCase()
                            : "S"}
                        </div>

                        <div>

                          <p className="text-slate-200 font-semibold">
                            {result.student_name}
                          </p>

                          <p className="text-xs text-slate-500">
                            Student
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Quiz */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="text-lg">
                          📝
                        </div>

                        <span className="text-slate-300">
                          {result.quiz_title}
                        </span>

                      </div>

                    </td>


                    {/* Score */}
                    <td className="px-6 py-5">

                      <span
                        className="
                          inline-flex
                          px-3
                          py-1
                          rounded-full
                          bg-blue-500/10
                          text-blue-400
                          border
                          border-blue-500/20
                          text-sm
                          font-semibold
                        "
                      >
                        {result.score}
                      </span>

                    </td>


                    {/* Percentage */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex
                          px-3
                          py-1
                          rounded-full
                          border
                          text-sm
                          font-semibold
                          ${
                            Number(result.percentage) >= 40
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }
                        `}
                      >
                        {result.percentage}%
                      </span>

                    </td>


                    {/* Date */}
                    <td className="px-6 py-5">

                      <div>

                        <p className="text-slate-300 text-sm">
                          {new Date(
                            result.created_at
                          ).toLocaleDateString()}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(
                            result.created_at
                          ).toLocaleTimeString()}
                        </p>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
};

export default Results;
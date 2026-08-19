import React, { useState, useEffect } from "react";

const Subjects = () => {

  const [subjectName, setSubjectName] = useState("");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/subjects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setSubjects(data);

      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);


  const addSubject = async () => {

    if (subjectName.trim() === "") {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/subjects",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            subject_name: subjectName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add subject");
        return;
      }

      setSubjects([...subjects, data.subject]);

      setSubjectName("");

    } catch (error) {

      console.error("Error adding subject:", error);

    }
  };


  const deleteSubject = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/subjects/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete subject");
        return;
      }

      setSubjects(
        subjects.filter((subject) => subject.id !== id)
      );

    } catch (error) {

      console.error("Error deleting subject:", error);

    }

  };


  const updateSubject = async (id, newName) => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/subjects/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            subject_name: newName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update subject");
        return;
      }

      setSubjects(
        subjects.map((subject) =>
          subject.id === id ? data.subject : subject
        )
      );

    } catch (error) {

      console.error("Error updating subject:", error);

    }

  };


  const filteredSubjects = subjects.filter((subject) =>
    subject.subject_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (

    <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">

        <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
          Administration
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-3xl md:text-4xl font-bold">
              Manage Subjects
            </h1>

            <p className="text-slate-400 mt-2">
              Create, update and organize quiz subjects.
            </p>

          </div>


          {/* Total Subjects */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-3">

            <p className="text-xs text-slate-500">
              Total Subjects
            </p>

            <p className="text-2xl font-bold text-blue-400">
              {subjects.length}
            </p>

          </div>

        </div>

      </div>


      {/* Main Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">


        {/* Search + Add */}
        <div className="p-6 border-b border-slate-800">

          <div className="flex flex-col md:flex-row gap-4">


            {/* Search */}
            <div className="relative flex-1 max-w-lg">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search subject..."
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
                           focus:ring-2 focus:ring-blue-500/10
                           transition"
              />

            </div>


            {/* Add Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600
                         hover:from-blue-600 hover:to-purple-700
                         text-white font-semibold
                         px-5 py-3 rounded-xl
                         shadow-lg shadow-blue-500/20
                         hover:-translate-y-0.5
                         transition-all duration-300"
            >
              + Add Subject
            </button>

          </div>

        </div>


        {/* Add Subject Form */}
        {showAddForm && (

          <div className="p-6 bg-slate-900/50 border-b border-slate-800">

            <div className="flex flex-col md:flex-row gap-3">

              <input
                type="text"
                placeholder="Enter subject name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="flex-1 bg-[#0B1120]
                           border border-slate-700
                           text-white
                           placeholder-slate-500
                           px-4 py-3 rounded-xl
                           outline-none
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-500/10
                           transition"
              />


              <button
                onClick={addSubject}
                className="px-5 py-3 rounded-xl
                           bg-emerald-500/10
                           text-emerald-400
                           border border-emerald-500/20
                           hover:bg-emerald-500
                           hover:text-white
                           font-semibold
                           transition-all duration-200"
              >
                ✓ Save Subject
              </button>


              <button
                onClick={() => {
                  setShowAddForm(false);
                  setSubjectName("");
                }}
                className="px-5 py-3 rounded-xl
                           bg-slate-700/50
                           text-slate-300
                           border border-slate-700
                           hover:bg-slate-700
                           font-semibold
                           transition-all duration-200"
              >
                Cancel
              </button>

            </div>

          </div>

        )}


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[600px]">

            <thead>

              <tr className="bg-slate-900/60 border-b border-slate-800">

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  ID
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Subject
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredSubjects.map((subject) => (

                <tr
                  key={subject.id}
                  className="border-b border-slate-800/80
                             hover:bg-slate-900/50
                             transition-colors duration-200"
                >

                  {/* ID */}
                  <td className="px-6 py-4">

                    <span className="text-slate-500 font-mono text-sm">
                      #{subject.id}
                    </span>

                  </td>


                  {/* Subject */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl
                                      bg-gradient-to-br
                                      from-blue-500/20
                                      to-purple-500/20
                                      border border-blue-500/10
                                      flex items-center justify-center
                                      text-lg">
                        📚
                      </div>

                      <span className="text-slate-200 font-semibold">
                        {subject.subject_name}
                      </span>

                    </div>

                  </td>


                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() => {

                          const newName = prompt(
                            "Enter new subject name:",
                            subject.subject_name
                          );

                          if (newName && newName.trim() !== "") {
                            updateSubject(subject.id, newName);
                          }

                        }}
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


                      <button
                        onClick={() => deleteSubject(subject.id)}
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

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* Empty State */}
        {filteredSubjects.length === 0 && (

          <div className="p-12 text-center">

            <div className="text-4xl mb-3">
              📚
            </div>

            <p className="text-slate-400">
              No subjects found.
            </p>

          </div>

        )}

      </div>

    </div>

  );
};

export default Subjects;
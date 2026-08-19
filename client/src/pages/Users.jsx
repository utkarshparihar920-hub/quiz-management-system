import React, { useState, useEffect } from "react";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message || "Failed to fetch users");
          return;
        }

        setUsers(data);

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  const updateUser = async (id, newName) => {
    try {
      const token = localStorage.getItem("token");

      const user = users.find((user) => user.id === id);

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            full_name: newName,
            email: user.email,
            role: user.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update user");
        return;
      }

      setUsers(
        users.map((user) =>
          user.id === id ? data.user : user
        )
      );

    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete user");
        return;
      }

      setUsers(
        users.filter((user) => user.id !== id)
      );

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


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
              User Management
            </h1>

            <p className="text-slate-400 mt-2">
              Manage registered users and their roles.
            </p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl px-4 py-3">
            <p className="text-xs text-slate-500">
              Total Users
            </p>

            <p className="text-2xl font-bold text-blue-400">
              {users.length}
            </p>
          </div>

        </div>

      </div>


      {/* Main Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">

        {/* Search */}
        <div className="p-6 border-b border-slate-800">

          <div className="relative max-w-md">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0B1120] border border-slate-700
                         text-white placeholder-slate-500
                         pl-11 pr-4 py-3 rounded-xl
                         outline-none
                         focus:border-blue-500
                         focus:ring-2 focus:ring-blue-500/10
                         transition"
            />

          </div>

        </div>


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>

              <tr className="bg-slate-900/60 border-b border-slate-800">

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  ID
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Name
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {users
                .filter((user) =>
                  user.full_name.toLowerCase().includes(search.toLowerCase()) ||
                  user.email.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => (

                  <tr
                    key={user.id}
                    className="border-b border-slate-800/80
                               hover:bg-slate-900/50
                               transition-colors duration-200"
                  >

                    <td className="px-6 py-4 text-slate-500 font-mono text-sm">
                      #{user.id}
                    </td>


                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg
                                        bg-gradient-to-br from-blue-500/20 to-purple-500/20
                                        border border-blue-500/10
                                        flex items-center justify-center
                                        text-blue-400 font-semibold">
                          {user.full_name.charAt(0).toUpperCase()}
                        </div>

                        <span className="text-slate-200 font-medium">
                          {user.full_name}
                        </span>

                      </div>

                    </td>


                    <td className="px-6 py-4 text-slate-400">
                      {user.email}
                    </td>


                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            user.role === "admin"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          }`}
                      >
                        {user.role}
                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => {
                            const newName = prompt(
                              "Enter new user name:",
                              user.full_name
                            );

                            if (newName && newName.trim() !== "") {
                              updateUser(user.id, newName);
                            }
                          }}
                          className="px-3 py-2 rounded-lg
                                     bg-blue-500/10 text-blue-400
                                     border border-blue-500/20
                                     hover:bg-blue-500 hover:text-white
                                     transition-all duration-200"
                        >
                          ✏️ Edit
                        </button>


                        <button
                          onClick={() => deleteUser(user.id)}
                          className="px-3 py-2 rounded-lg
                                     bg-red-500/10 text-red-400
                                     border border-red-500/20
                                     hover:bg-red-500 hover:text-white
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
        {users.filter((user) =>
          user.full_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (

          <div className="p-12 text-center">

            <div className="text-4xl mb-3">
              👥
            </div>

            <p className="text-slate-400">
              No users found.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Users;
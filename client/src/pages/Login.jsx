import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(data.message || "Login failed");

        setLoading(false);

        return;
      }


      // Save JWT token
      localStorage.setItem("token", data.token);


      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      // Redirect according to role
      if (data.user.role === "admin") {

        navigate("/");

      } else {

        navigate("/student-dashboard");

      }


    } catch (error) {

      console.error(error);

      alert("Unable to connect to server");

    } finally {

      setLoading(false);
    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 relative overflow-hidden">

      {/* Background glow */}

      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20"></div>


      {/* Login Card */}

      <div className="relative w-full max-w-md">

        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8">


          {/* Logo / Heading */}

          <div className="text-center mb-8">

            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

              <span className="text-3xl">
                🧠
              </span>

            </div>


            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>


            <p className="text-slate-400 mt-2">
              Login to your Quiz Management System
            </p>

          </div>


          {/* Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >


            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 pl-11 pr-4 py-3 rounded-xl outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔒
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 pl-11 pr-12 py-3 rounded-xl outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {loading ? "Signing in..." : "Login"}

            </button>

          </form>


          {/* Register */}

          <p className="text-center text-slate-400 mt-7">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-400 font-semibold hover:text-blue-300 transition"
            >
              Create Account
            </Link>

          </p>


          {/* Footer */}

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">

            <p className="text-xs text-slate-500">
              Quiz Management System
            </p>

          </div>


        </div>

      </div>

    </div>

  );

};


export default Login;
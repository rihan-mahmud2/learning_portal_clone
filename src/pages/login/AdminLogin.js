import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LearningPortal from "../../assets/image/learningportal.svg";
import { useLoginMutation } from "../../features/auth/authApi";
import { useSelector } from "react-redux";
function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const [login, { isError, error, isLoading, isSuccess }] = useLoginMutation();
  console.log(auth);
  if (auth?.accessToken && auth?.user?.role === "admin") {
    navigate("/admin/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });

    if (isSuccess) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src={LearningPortal}
            alt="learning_portal"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Admin Account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" className="sr-only">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
          {isError && <p className="error">{error}</p>}
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;

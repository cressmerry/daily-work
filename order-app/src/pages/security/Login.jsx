import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setMessage("");
    setLoading(true);
    try {
      await login(data.username, data.password);
      navigate("/order");
    } catch (error) {
      setLoading(false);
      setMessage(error.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile"
          className="w-24 h-24 mx-auto rounded-full mb-6 border-4 border-slate-50"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-sm">
              Username
            </label>
            <input
              {...register("username")}
              className={`w-full p-2.5 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.username ? "border-red-500" : "border-slate-200"}`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full p-2.5 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-slate-200"}`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium border border-red-100">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

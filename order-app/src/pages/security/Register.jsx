import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthService from "../../utils/auth";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerMessage({ type: "", text: "" });

    try {
      await AuthService.register(data.username, data.email, data.password);
      setServerMessage({ type: "success", text: "Registration successful! Redirecting..." });
      
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setLoading(false);
      setServerMessage({ 
        type: "error", 
        text: error.message || "Registration failed. Username or Email might be taken." 
      });
    }
  };

  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900">Join <span className="text-blue-600">ORDERFLOW</span></h2>
          <p className="text-slate-500 mt-2">Create your account to start managing orders</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-sm">Username</label>
            <input
              {...register("username")}
              className={`w-full p-3 border rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.username ? "border-red-500" : "border-slate-200"}`}
              placeholder="johndoe"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 text-sm">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full p-3 border rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-slate-200"}`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-sm">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full p-3 border rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-slate-200"}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-sm">Confirm</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`w-full p-3 border rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-slate-200"}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg mt-4"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>

          {serverMessage.text && (
            <div className={`p-4 rounded-xl text-sm text-center font-bold border ${
              serverMessage.type === "error" ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-600 border-green-100"
            }`}>
              {serverMessage.text}
            </div>
          )}

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
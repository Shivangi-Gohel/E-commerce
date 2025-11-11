import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../constant.js";

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${URL}/auth/login`, data, {withCredentials: true});
            console.log("Login successful:", response.data);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    }
  return (
    <div className="bg-amber-950/30 py-10 text-amber-950 min-h-screen items-center justify-center flex">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto items-center flex flex-col bg-white pb-10 shadow-2xl rounded-2xl w-80 sm:110 md:w-120">
        <h1 className="font-bold text-3xl mb-3 mt-8">Sign In</h1>
        <p>Fill email and password to login</p>
        <div className="mt-10 flex flex-col gap-6   ">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Email Address</label>
            <input {...register("email", {required: 'please enter email'})} disabled={isSubmitting} type="email" className="border rounded shadow p-2 w-60 sm:w-80 md:w-100" placeholder="your@email.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Password</label>
            <input {...register("password", {required: 'please enter password'})} disabled={isSubmitting} type="password" className="border rounded shadow p-2 w-60 sm:w-80 md:w-100" placeholder="••••••••" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button disabled={isSubmitting} type="submit" className="border rounded shadow p-2 w-60 sm:w-80 md:w-100 bg-amber-950 text-white font-semibold">{isSubmitting ? "Login..." : "Login"}</button>
          <p className="text-center text-gray-500">Do not have an account? <span  onClick={() => navigate('/register')} className="text-amber-950 cursor-pointer">Sign up</span></p>
        </div>
      </form>
    </div>
  );
};

export default Login;

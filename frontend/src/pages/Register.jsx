import React from "react";
import axios from "axios"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { URL } from "../constant.js";

const Register = () => {
    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        formState:{errors, isSubmitting},
    } = useForm();

    const onSubmit = async (data) => {
        try{
            const response = await axios.post(`${URL}/auth/register`, data);
            console.log("Registration successful:", response.data);
        }
        catch (error){
            console.error("Registration failed:", error.response?.data || error.message);
        }
    };
  return (
    <div className="bg-amber-950/30 py-10 text-amber-950 flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto items-center flex flex-col bg-white pb-10 shadow-2xl rounded-2xl w-80 sm:110 md:w-120">
        <h1 className="font-bold text-3xl mb-3 mt-8">Create Account</h1>
        <p>Fill in the details below to get started</p>
        <div className="mt-10 flex flex-col gap-6   ">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Full Name</label>
            <input disabled={isSubmitting} type="text" {...register("name", {required: 'please enter your name', minLength: {value: 3, message: 'name must be at least 3 character long'}})} className="border rounded shadow p-2 w-60 sm:w-80 md:w-100" placeholder="Your name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Email Address</label>
            <input disabled={isSubmitting} type="email" {...register("email", {required: 'please enter your email', pattern: {value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, message: 'please enter valid email address'}})} className="border rounded shadow p-2 w-60 sm:w-80 md:w-100" placeholder="your@email.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Password</label>
            <input disabled={isSubmitting} type="password" {...register("password", {required: 'please enter a password', minLength: {value: 6, message: 'password length must be atleast 6'}, maxLength: {value: 20, message: 'password length must be atmost 20'}, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).+$/})} className="border rounded shadow p-2 w-60 sm:w-80 md:w-100" placeholder="••••••••" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Address</label>
            <input disabled={isSubmitting} type="text" {...register("address", {required: 'please enter address'})} className="border rounded shadow p-2 w-60 sm:w-80 md:w-100" placeholder="Area, city, state" />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Phone Number</label>
            <input disabled={isSubmitting} type="text" {...register("phone", {required: 'please enter your phone number', pattern: {value: /^[6-9]\d{9}$/, message: 'phone number must be of 10 digit'}})} className="border rounded shadow p-2 w-60 sm:w-80 md:w-100" placeholder="(555) 000-0000" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <button disabled={isSubmitting} type="submit" className="border rounded shadow p-2 w-60 sm:w-80 md:w-100 bg-amber-950 text-white font-semibold">{isSubmitting ? "Register..." : "Register"}</button>
          <p className="text-center text-gray-500">Already have an account? <span onClick={() => navigate('/login')} className="text-amber-950 cursor-pointer">Sign in</span></p>
        </div>
      </form>
    </div>
  );
};

export default Register;

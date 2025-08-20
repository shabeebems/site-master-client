'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { useAppDispatch } from "@/app/store/hooks";

// Redux
import { setUser } from '@/app/store/userSlice';

import { apiCheck } from '@/app/api/api';

// Loading component, working while loading on submit button
import Loading from '@/app/components/Loading';

// For message passing 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios, { AxiosError } from "axios"; // ✅ Added for error typing


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ✅ Type for form fields
interface FormField {
  name: keyof FormData;
  type: string;
  placeholder: string;
}

export default function SignupForm() {

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiCheck(formData, 'auth/signup');

      if (response.success) {
        Cookies.set('signup_verified', 'true', {
          expires: new Date(Date.now() + 60 * 10000) // 10 mins
        });

        dispatch(setUser(formData));

        toast.success(response.message, { position: "top-right" });
        router.push('/contractor/otp');

      } else {
        router.push('/contractor/register');
      }

    } catch (error) {
      // ✅ Strong typing for axios error
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage = axiosError.response?.data?.message || "Signup error, please try again";

        toast.error(errorMessage, { position: "top-right" });
        console.error("Signup error:", axiosError.response);

      } else {
        toast.error("Network error, please try again!", { position: "top-right" });
        console.error("Signup failed:", error);
      }

    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ✅ Strongly typed form fields
  const formFields: FormField[] = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Email address' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' }
  ];

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-8 animate-fadeIn">
        <ToastContainer />

        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tighter">
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              SiteMaster
            </span>
          </h2>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Sign up to manage your construction projects
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5 rounded-md">
            {formFields.map((field) => (
              <div key={field.name} className="relative">
                <label htmlFor={field.name} className="sr-only">
                  {field.placeholder}
                </label>
                <input
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full border border-gray-300 py-3 px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? <Loading /> : 'Sign up'}
            </button>
          </div>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/contractor/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import OTPForm from '@/components/OTPForm';
import { confirmOTP } from '@/api/apiService';

function OTPPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (loading, error = null) => {
    setIsLoading(loading);
    setError(error);
    if (error) {
      toast.error(error.message);
    } else {
      navigate('/auth/reset-password');
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto mt-20 w-full sm:max-w-[425px] bg-accent rounded-sm border-1 border-slate-500 py-4 xs:py-8 px-3 xs:px-4 shadow-md">
        <p className="text-2xl text-center font-bold mb-8">Enter your OTP</p>

        <OTPForm onSubmit={handleSubmit} />

        <p className="text-center text-sm mt-4 xs:mt-6 font-semibold">
          <span
            onClick={() => navigate(-1)}
            className="underline text-blue-500"
          >
            Back
          </span>
        </p>
      </div>
    </AuthLayout>
  );
}

export default OTPPage;

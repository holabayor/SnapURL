import React, { useState } from 'react';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import AuthLayout from './AuthLayout';
import { Link } from 'react-router-dom';

import toast from 'react-hot-toast';

function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = async (loading, error = null) => {
    setIsLoading(loading);
    setError(error);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password successfully reset');
      navigate('/auth/login');
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto mt-20 w-full sm:max-w-[425px] bg-accent rounded-sm border-1 border-slate-500 py-4 xs:py-8 px-3 xs:px-4 shadow-md">
        <p className="text-2xl text-center font-bold mb-8">
          Set a new password
        </p>

        <ResetPasswordForm onSubmit={handleReset} isLoading={isLoading} />

        <p className="text-center text-sm mt-4 xs:mt-6 font-semibold">
          <Link to="/auth/login" className="underline text-blue-500">
            Back to login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default ResetPasswordPage;

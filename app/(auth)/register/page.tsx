'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/auth/common/auth-form';
import { SubmitButton } from '@/components/auth/common/submit-button';

import { register, type RegisterActionState } from '../actions';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: 'idle',
    },
  );

  useEffect(() => {
    if (state.status === 'user_exists') {
      toast.error('Account already exists');
    } else if (state.status === 'failed') {
      toast.error('Failed to create account');
    } else if (state.status === 'invalid_data') {
      toast.error('Failed validating your submission!');
    } else if (state.status === 'success') {
      toast.success('Account created successfully');
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-white">
      <div className="w-full max-w-md overflow-hidden flex flex-col gap-8 bg-pink-200 p-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-2xl font-bold bg-yellow-300 p-3 rotate-1 border-4 border-black inline-block">Sign Up</h3>
          <p className="text-sm bg-white p-2 -rotate-1 border-4 border-black">
            Create an account with your email and password
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}
            className="w-full bg-green-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                     hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all">
            Sign Up
          </SubmitButton>
          <p className="text-center text-sm mt-4">
            {'Already have an account? '}
            <Link
              href="/login"
              className="font-bold text-black hover:bg-purple-300 p-1 border-2 border-black"
            >
              Sign in
            </Link>
            {' instead.'}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}

'use client';

import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from '../_actions';
import toast from 'react-hot-toast';
import useSupabaseClient from '@/lib/supabase/client';

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const supabase = useSupabaseClient();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(values);

      const { error } = JSON.parse(result);
      if (error?.message) {
        setError(error.message);
        toast.error(error.message);
        console.log('Error message', error.message);
        reset({ password: '' });
        return;
      }

      setError('');
      toast.success('successfully logged in');
      router.push('/');
    });
  };

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const input_style =
    'form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {error && <p className="mb-6 rounded bg-red-300 py-4 text-center">{error}</p>}
      <div className="mb-6">
        <input
          type="email"
          {...register('email')}
          placeholder="Email address"
          className={`${input_style}`}
        />
        {errors['email'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['email']?.message as string}
          </span>
        )}
      </div>
      <div className="mb-6">
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className={`${input_style}`}
        />
        {errors['password'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['password']?.message as string}
          </span>
        )}
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${isPending ? '#ccc' : '#3446eb'}` }}
        className="inline-block w-full rounded bg-blue-600 px-7 py-4 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
        disabled={isPending}
      >
        {isPending ? 'loading...' : 'Sign In'}
      </button>

      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center font-semibold">OR</p>
      </div>

      <a
        className="flex w-full items-center justify-center rounded px-7 py-2 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        style={{ backgroundColor: '#55acee' }}
        onClick={loginWithGitHub}
        role="button"
      >
        <Image className="pr-2" src="/images/github.svg" alt="" width={40} height={40} />
        Continue with GitHub
      </a>
    </form>
  );
};

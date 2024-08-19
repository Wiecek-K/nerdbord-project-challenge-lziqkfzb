'use client';
import { useState, ChangeEvent, useTransition } from 'react';
import { generateFormFromPrompt } from '@/lib/actions/actions';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const HomeInput = () => {
  const [isPending, startTransition] = useTransition();

  const [prompt, setPrompt] = useState(
    'Kto tobą rządzi? Papież czy Sułtan Kosmitów?',
    // 'potrzebuję zbierać danę użytkowników, imię, płeć, data urodzenia, ulubiony kolor, czy poleciłby naszą firmę, potwierdzenie o przeczytaniu regulaminu, jak nas ocenia w skalo od jeden do pięć',
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => generateFormFromPrompt(prompt));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={prompt} onChange={handleInputChange} />
        <button
          type="submit"
          className="bg-unclaimedOrange outline-dashed outline-4 outline-undaunted"
        >
          {isPending ? 'Przetwarzanie...' : 'Wyślij'}
        </button>
      </form>
    </>
  );
};

import Link from 'next/link';
import getUserSession from '@/lib/getUserSession';
import createSupabaseServerClient from '@/lib/supabase/server';
import { permanentMarker } from '@/app/fonts';

export const Header = async () => {
  const { data } = await getUserSession();

  const logoutAction = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-hat h-20">
      <nav className="container flex h-full items-center justify-between">
        <div>
          <Link
            href="/"
            className={`${permanentMarker.className} text-2xl font-semibold text-white`}
          >
            FormoInator
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
          {!data.session && (
            <>
              <li>
                <Link href="/register" className="text-white">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white">
                  Login
                </Link>
              </li>
            </>
          )}
          {data.session && (
            <form action={logoutAction} className="flex">
              <li>
                <Link href="/profile" className="text-white">
                  Profile
                </Link>
              </li>
              <li>
                <button className="ml-4 text-white">Logout</button>
              </li>
            </form>
          )}
        </ul>
      </nav>
    </header>
  );
};

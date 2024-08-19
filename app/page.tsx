import { Header } from '@/components/Header';
import { HomeInput } from '@/app/HomeInput';

export default async function Home() {
  return (
    <>
      <Header />
      <section className="bg-unispiredGreen min-h-screen pt-20">
        <div className="mx-auto flex min-h-[20rem] max-w-4xl flex-col items-center justify-center rounded-md bg-ct-dark-100">
          <HomeInput />
        </div>
      </section>
    </>
  );
}

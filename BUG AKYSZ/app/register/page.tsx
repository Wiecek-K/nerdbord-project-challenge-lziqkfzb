import { Header } from '@/components/Header';
import { RegisterForm } from './register-form';

export default async function RegisterPage() {
  return (
    <>
      <Header />

      <section className="min-h-screen bg-ct-blue-600 pt-20">
        <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
          <div className="bg-white px-8 py-10 md:w-8/12 lg:w-5/12">
            <RegisterForm />
          </div>
        </div>
      </section>
    </>
  );
}

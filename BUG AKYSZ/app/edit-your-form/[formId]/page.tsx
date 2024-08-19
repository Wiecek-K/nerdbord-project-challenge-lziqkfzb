import { Header } from '@/components/Header';
import { cookies } from 'next/headers';
import { EditFormTool } from './EditFormTool';
import createSupabaseServerClient from '@/lib/supabase/server';

export default async function Page({ params }: { params: { formId: string } }) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('forms').select('*').eq('id', params.formId).single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Nie znaleziono rekordu
      return null; //TODO:
    }
    throw error;
  }

  if (!data) {
    return <h2>Halo, coś się zepsuło i mnie nie widać</h2>; //TODO:
  }

  const { body, name } = data;

  return (
    <>
      <Header />
      <section className="flex min-h-screen flex-row justify-between bg-unispiredGreen py-20">
        <div className="mx-auto flex min-h-[20rem] max-w-4xl flex-col items-center justify-center rounded-md bg-ct-dark-100">
          <EditFormTool formFields={body} formName={name} />
        </div>
      </section>
    </>
  );
}

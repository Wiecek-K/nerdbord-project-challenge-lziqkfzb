import createSupabaseServerClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  try {
    const { formName, fields }: { formName: string; fields: string } = await request.json();

    const { data, error } = await supabase.rpc('create_form', {
      p_name: formName,
      p_body: fields,
    });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Błąd podczas tworzenia formularza:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

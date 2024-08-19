import { InputJSONType } from '@/lib/types';

export const saveForm = async ({
  formName,
  fields,
}: {
  formName: string;
  fields: InputJSONType[];
}) => {
  const response = await fetch(`/api/save-form`, {
    method: 'POST',
    body: JSON.stringify({
      formName,
      fields,
    }),
  });
  return response;
};

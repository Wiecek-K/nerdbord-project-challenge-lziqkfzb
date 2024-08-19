'use client';
import { useState, ChangeEvent, useTransition } from 'react';
import { FormGeneratedByUser } from '@/components/FormGeneratedByUser';

import { nanoid } from 'nanoid';
import { saveForm } from '@/lib/utils';

import type { InputJSONType, InputTypeAttribute } from '@/lib/types';
import { availableInputTypeArray } from '@/lib/types';

interface EditFormToolProps {
  formFields: InputJSONType[];
  formName: string;
}

export const EditFormTool = ({ formFields, formName }: EditFormToolProps) => {
  const [editedFields, setEditedFields] = useState<InputJSONType[]>(formFields);
  const [editedName, setEditedName] = useState(formName);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await saveForm({ formName: editedName, fields: editedFields });
    });
  };

  const handleFormNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleInputLabelChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].label = e.target.value;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputRequiredChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].required = e.target.checked;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputTypeChange = (e: ChangeEvent<HTMLSelectElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].type = e.target.value as unknown as InputTypeAttribute;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputMinValueChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].minValue = Number(e.target.value as any);
    setEditedFields(newEditedFieldsValues);
  };
  const handleInputMaxValueChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].maxValue = Number(e.target.value as any);
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputPlaceholderChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].placeholder = e.target.value;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputOptionsChange = (
    e: ChangeEvent<HTMLInputElement>,
    keyID: string,
    index: number,
  ) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);

    if (!newEditedFieldsValues[fieldIndex].options) {
      newEditedFieldsValues[fieldIndex].options = [];
    }

    if (newEditedFieldsValues[fieldIndex].options) {
      if (newEditedFieldsValues[fieldIndex].options.length > index) {
        newEditedFieldsValues[fieldIndex].options[index] = e.target.value;
        setEditedFields(newEditedFieldsValues);
      } //TODO: error handler
    }
  };

  const handleAddOption = (keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    if (!newEditedFieldsValues[fieldIndex].options) newEditedFieldsValues[fieldIndex].options = [];
    newEditedFieldsValues[fieldIndex].options.push('');
    setEditedFields(newEditedFieldsValues);
  };
  const handleDeleteOption = (keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    if (!newEditedFieldsValues[fieldIndex].options) {
      return;
    }
    newEditedFieldsValues[fieldIndex].options.pop();
    setEditedFields(newEditedFieldsValues);
  };

  const handleAddEmptyField = () => {
    const newEditedFieldsValues = [...editedFields];
    newEditedFieldsValues.push({
      keyID: nanoid(),
      label: 'Etykieta',
      type: 'text',
      name: 'newField',
      required: false,
    });
    setEditedFields(newEditedFieldsValues);
  };
  const handleDeleteField = (keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues.splice(fieldIndex, 1);
    setEditedFields(newEditedFieldsValues);
  };

  return (
    <div className="flex min-w-[80%] justify-between gap-5 p-5">
      <FormGeneratedByUser formFields={editedFields} formName={editedName} />

      <form
        className="inline-flex h-max max-w-[40%] flex-col bg-orange-200 p-4"
        onSubmit={onSubmit}
      >
        <div>
          <label>
            FormName
            <input type="text" value={editedName} onChange={handleFormNameChange} />
          </label>
          {editedFields.map((field) => {
            return (
              <div key={field.keyID} className="flex flex-wrap">
                <input
                  type="text"
                  defaultValue={field.label}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputLabelChange(e, field.keyID)
                  }
                />
                <input
                  type="checkbox"
                  defaultChecked={field.required}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputRequiredChange(e, field.keyID)
                  }
                />
                <select
                  value={field.type}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleInputTypeChange(e, field.keyID)
                  }
                >
                  {availableInputTypeArray.map((type, index) => (
                    <option key={`${field.keyID}${index}`}>{type}</option>
                  ))}
                </select>
                {field.type === 'text' && (
                  <label>
                    placeholder
                    <input
                      type="text"
                      value={field.placeholder}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputPlaceholderChange(e, field.keyID)
                      }
                    />
                  </label>
                )}
                {field.type === 'number' && (
                  <>
                    <label>
                      minValue
                      <input
                        type="number"
                        value={field.minValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputMinValueChange(e, field.keyID)
                        }
                      />
                    </label>
                    <label>
                      maxValue
                      <input
                        type="number"
                        value={field.maxValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputMaxValueChange(e, field.keyID)
                        }
                      />
                    </label>
                  </>
                )}
                {(field.type === 'radio' ||
                  field.type === 'checkbox' ||
                  field.type === 'select') && (
                  <div>
                    {field.options?.map((option, index) => (
                      <input
                        value={option}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputOptionsChange(e, field.keyID, index)
                        }
                        key={`${field.keyID}${index}`}
                      />
                    ))}
                    <button
                      className="rounded-lg border border-slate-700 bg-sky-200 p-1"
                      type="button"
                      onClick={() => handleAddOption(field.keyID)}
                    >
                      Add
                    </button>
                    <button
                      className="rounded-lg border border-slate-700 bg-sky-200 p-1"
                      type="button"
                      onClick={() => handleDeleteOption(field.keyID)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                <button
                  className="rounded-lg border border-slate-700 bg-sky-200 p-1"
                  type="button"
                  onClick={() => handleDeleteField(field.keyID)}
                >
                  Delete FIELD
                </button>
              </div>
            );
          })}
        </div>
        <button
          className="rounded-lg border border-slate-700 bg-sky-200 p-1"
          type="button"
          onClick={() => handleAddEmptyField()}
        >
          ADD Field
        </button>
        <button
          className="rounded-lg border border-slate-700 bg-sky-200 p-1"
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'LOADING...' : 'SUBMIT BUTTON'}
        </button>
      </form>
    </div>
  );
};

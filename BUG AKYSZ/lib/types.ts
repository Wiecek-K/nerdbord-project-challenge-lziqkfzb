export type InputJSONType = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean | undefined;
  type: InputTypeAttribute;
  options?: (string | number)[];
  minValue?: number;
  maxValue?: number;
  keyID: string;
};

export type InputTypeAttribute =
  | 'checkbox'
  | 'color'
  | 'date'
  | 'email'
  | 'password'
  | 'number'
  | 'radio'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | 'month'
  | 'tel'
  | 'select';

export const availableInputTypeArray: InputTypeAttribute[] = [
  'checkbox',
  'color',
  'date',
  'email',
  'password',
  'number',
  'radio',
  'text',
  'time',
  'url',
  'week',
  'month',
  'tel',
  'select',
];

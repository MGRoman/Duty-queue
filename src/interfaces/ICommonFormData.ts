import { TDateBetweenFiltersDataType } from './../hooks/use-filter/interfaces';

export interface ISelectOptions {
  value: string;
  label: string;
}

export interface ICommonFormData {
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'multi-select' | 'select' | 'date-between';
  options?: ISelectOptions[];
  initialValue?: string | number | string[] | number[] | TDateBetweenFiltersDataType;
  validate?: (value?: string) => { message: string } | undefined;
  required?: boolean;
  disabled?: boolean;
}

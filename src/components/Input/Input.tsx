'use client';

import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type InputProps = {
  id: string;
  lable: string;
  type: React.HTMLInputTypeAttribute;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errorMessage?: string;
  rules?: RegisterOptions;
};

const InputForm = ({
  id,
  lable,
  type,
  disabled,
  register,
  value,
  placeholder,
  errorMessage,
  rules,
}: InputProps) => {
  return (
    <div className="w-full ">
      <label
        htmlFor={id}
        className="block mb-2  font-medium text-gray-900 dark:text-white"
      >
        {lable}
      </label>
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, rules)}
        placeholder={placeholder}
        value={value}
        type={type}
        className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-70 disabled:cursor-not-allowed
        ${errorMessage ? 'dark:border-red-600' : 'border-slate-300'}
        ${errorMessage ? 'focus:border-red-600' : 'focus:border-slate-300'}

        `}
      />

      <div
        className={`mt-1 text-red-600 min-h-[1.25rem] text-sm ${
          errorMessage ? 'block' : 'hidden'
        }`}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default InputForm;

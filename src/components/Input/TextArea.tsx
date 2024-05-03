'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface TextAreaProps {
  id: string
  lable?: string
  value?: string
  disabled?: boolean
  placeholder?: string
  register: UseFormRegister<FieldErrors>
  errorMessage?: string
  rules?: RegisterOptions
}

export default function TextArea({
  id,
  errorMessage,
  register,
  disabled,
  lable,
  value,
  placeholder,
  rules
}: TextAreaProps) {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {lable}
      </label>
      <textarea
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        rows={4}
        {...register(id, rules)}
        className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-70 disabled:cursor-not-allowed
        ${errorMessage ? 'dark:border-red-600' : 'border-slate-300'}
        ${errorMessage ? 'focus:border-rose-400' : 'focus:border-slate-300'}

        `}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

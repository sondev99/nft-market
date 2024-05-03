import { RegisterOptions } from 'react-hook-form';

type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'confirm_password'
    | 'firsName'
    | 'lastName']?: RegisterOptions;
};

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Email address is required',
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email invalid format',
    },
    maxLength: {
      value: 160,
      message: 'Length 5 - 160 characters',
    },
    minLength: {
      value: 5,
      message: 'Length 5 - 160 characters',
    },
  },
  firsName: {
    required: {
      value: true,
      message: 'First Name is required',
    },
  },
  lastName: {
    required: {
      value: true,
      message: 'Last Name is required',
    },
  },
  password: {
    required: {
      value: true,
      message: 'password is required',
    },
    maxLength: {
      value: 160,
      message: 'Length 6 - 160 characters',
    },
    minLength: {
      value: 5,
      message: 'Length 6 - 160 characters',
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: 'confirm password is required',
    },
    maxLength: {
      value: 160,
      message: 'Length 6 - 160 characters',
    },
    minLength: {
      value: 5,
      message: 'Length 6 - 160 characters',
    },
  },
};

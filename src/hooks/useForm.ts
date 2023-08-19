import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import {
  validateAll,
  validateEmail,
  validatePassword,
  validateUsername,
  validatePasswordMatch,
} from '../utils/validates';

interface Inputs {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
}

export interface Errors {
  email?: string;
  password?: string;
  passwordCheck?: string;
  username?: string;
}

interface Callback {
  (): void;
}

interface FormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputs: Partial<Inputs>;
  errors: Errors;
}

const useForm = (
  initialValue: Partial<Inputs>,
  callback: Callback
): FormProps => {
  const [inputs, setInputs] = useState<Partial<Inputs>>(initialValue);
  const [errors, setErrors] = useState<Errors>(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasAllUndefinedValues = Object.values(errors).every(
      (value) => value === undefined
    );
    if (hasAllUndefinedValues && isSubmitting) {
      callback();
    }
    setIsSubmitting(false);
  }, [errors, isSubmitting]);

  console.log(errors);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setErrors(validateAll(inputs));
    setIsSubmitting(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    e.persist();

    let error: string | undefined;

    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        if (inputs.passwordCheck) {
          const passwordMatchError = validatePasswordMatch(
            value,
            inputs.passwordCheck
          );
          setErrors((prevErrors) => ({
            ...prevErrors,
            passwordCheck: passwordMatchError,
          }));
        }
        break;
      case 'username':
        error = validateUsername(value);
        break;
      case 'passwordCheck':
        if (inputs.password) {
          error = validatePasswordMatch(inputs.password, value);
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setInputs({ ...inputs, [name]: value });
  };

  return { handleChange, handleSubmit, inputs, errors };
};

export default useForm;

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import {
  validateAll,
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/validates';

interface Inputs {
  email: string;
  password: string;
  passwordCheck?: string;
  username?: string;
}

interface Errors {
  email?: string;
  password?: string;
  passwordCheck?: string;
  username?: string;
}

interface Callback {
  (): Promise<void>;
}

interface FormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputs: Inputs;
  errors: Errors;
}

const validatePasswordMatch = (
  password: string,
  passwordCheck: string
): string | undefined => {
  if (passwordCheck === '') {
    return '필수 항목입니다.';
  } else if (passwordCheck && password !== passwordCheck) {
    return '비밀번호가 일치하지 않습니다.';
  }
};

const useForm = (initialValue: Inputs, callback: Callback): FormProps => {
  const [inputs, setInputs] = useState<Inputs>(initialValue);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setErrors(validateAll(inputs));
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsSubmitting(true);
    }
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
        error = validatePasswordMatch(inputs.password, value);
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

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import { validateAll } from '../utils/validates';

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

const validateEmail = (email: string): string | undefined => {
  if (email === '') {
    return '필수 항목입니다.';
  } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
    return '유효한 이메일 주소가 아닙니다.';
  }
};

const validatePassword = (password: string): string | undefined => {
  if (password === '') {
    return '비밀번호는 필수 항목입니다.';
  } else if (
    !/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}/.test(password)
  ) {
    return '유효하지 않은 비밀번호입니다.';
  }
};

const validateUsername = (username: string): string | undefined => {
  if (username === '') {
    return '사용자 이름은 필수 항목입니다.';
  } else if (!/^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}/.test(username)) {
    return '유효하지 않은 사용자 이름입니다.';
  }
};

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

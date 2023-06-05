import { useState } from 'react';

interface InputValue {
  email: string;
  password: string;
  username?: string;
}

interface Valid {
  email: boolean | null;
  password: boolean | null;
  username: boolean | null;
}

export const useInputValidation = (props: InputValue) => {
  const emailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const passwordRegEx = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}/;
  const usernameRegEx = /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}/;
  const [isInputValid, setIsValid] = useState<Valid>({
    email: null,
    password: null,
    username: null,
  });

  const handleInputValidation = () => {
    setIsValid((prevIsValid) => ({
      email: props.email ? emailRegEx.test(props.email) : prevIsValid.email,
      password: props.password
        ? passwordRegEx.test(props.password)
        : prevIsValid.password,
      username: props.username
        ? usernameRegEx.test(props.username)
        : prevIsValid.username,
    }));
  };

  return { isInputValid, handleInputValidation };
};

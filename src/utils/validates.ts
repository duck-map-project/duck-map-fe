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

export const validateEmail = (email: string): string | undefined => {
  if (email === '') {
    return '필수 항목입니다.';
  } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
    return '유효한 이메일 주소가 아닙니다.';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (password === '') {
    return '비밀번호는 필수 항목입니다.';
  } else if (
    !/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}/.test(password)
  ) {
    return '유효하지 않은 비밀번호입니다.';
  }
  return undefined;
};

export const validateUsername = (username: string): string | undefined => {
  if (username === '') {
    return '사용자 이름은 필수 항목입니다.';
  } else if (!/^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}/.test(username)) {
    return '유효하지 않은 사용자 이름입니다.';
  }
  return undefined;
};

export const validatePasswordMatch = (
  password: string,
  passwordCheck: string
) => {
  if (passwordCheck === '') {
    return '필수 항목입니다.';
  } else if (passwordCheck && password !== passwordCheck) {
    return '비밀번호가 일치하지 않습니다.';
  }
};

export const validateAll = (inputs: Inputs): Errors => {
  const errors: Errors = {};
  const { email, password, passwordCheck, username } = inputs;

  errors.email = validateEmail(email);
  errors.password = validatePassword(password);
  errors.username = validateUsername(username as string);
  errors.passwordCheck = validatePasswordMatch(
    password,
    passwordCheck as string
  );

  return errors;
};

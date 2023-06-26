interface Inputs {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
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
    return '이메일 형식이 아닙니다.';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (password === '') {
    return '필수 항목입니다.';
  } else if (
    !/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}/.test(password)
  ) {
    return '영대소문자, 숫자, 특수문자를 포함한 8 ~ 16자여야 합니다.';
  }
  return undefined;
};

export const validateUsername = (username: string): string | undefined => {
  if (username === '') {
    return '필수 항목입니다.';
  } else if (!/^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}/.test(username)) {
    return '한글, 영문 소문자, 숫자, -,_ 로 이루어진 2 ~ 10자여야 합니다.';
  }
  return undefined;
};

export const validatePasswordMatch = (
  password: string,
  passwordCheck: string
): string | undefined => {
  if (passwordCheck === '') {
    return '필수 항목입니다.';
  } else if (passwordCheck && password !== passwordCheck) {
    return '비밀번호가 일치하지 않습니다.';
  }
};

export const validateAll = (inputs: Partial<Inputs>): Errors => {
  const errors: Errors = {};
  const { email, password, passwordCheck, username } = inputs;
  // TODO: as 말고 다른 방식 사용하기
  if (inputs.email) {
    errors.email = validateEmail(email as string);
  }
  if (inputs.password) {
    errors.password = validatePassword(password as string);
  }
  if (inputs.username) {
    errors.username = validateUsername(username as string);
  }
  if (inputs.passwordCheck) {
    errors.passwordCheck = validatePasswordMatch(
      password as string,
      passwordCheck as string
    );
  }

  return errors;
};

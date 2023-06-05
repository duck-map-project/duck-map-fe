import { css, styled } from 'styled-components';

const Title = styled.label`
  font-size: 1.4rem;
`;

const Input = styled.input<{
  id: string;
  validate?: boolean | null;
  isInputValid?: boolean | null;
}>`
  width: 100%;
  ${(props) =>
    (props.id === 'password-check' && props.validate === false) ||
    props.isInputValid === false
      ? error
      : primary}
  border-radius: 5px;
  padding: 10px 5px;
  font-size: 1.4rem;
  margin-top: 9px;
`;

const primary = css`
  border: 1px solid var(--purple);
`;

const error = css`
  border: 1px solid var(--red);
`;

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  validate?: boolean | null;
  isInputValid?: boolean | null;
}

const AuthInput: React.FC<PropsType> = ({
  name,
  title,
  validate,
  isInputValid,
  ...props
}) => {
  return (
    <>
      <Title htmlFor={name}>{title}</Title>
      <Input
        id={name}
        validate={validate}
        isInputValid={isInputValid}
        {...props}
      />
    </>
  );
};

export default AuthInput;

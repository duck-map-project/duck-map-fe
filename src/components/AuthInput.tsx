import { css, styled } from 'styled-components';

const Title = styled.label`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  padding-left: 10px;
`;

export const Input = styled.input<{
  id: string;
  $isInputValid?: boolean | null;
}>`
  width: 100%;
  ${(props) => (props.$isInputValid === false ? error : primary)}
  border-radius: 5px;
  padding: 10px 14px;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.248125;
  border-radius: 20px;
  box-shadow: 3px 3px 0px 0px #00000040;
  margin-top: 6px;
`;

const primary = css`
  border: 1.4px solid #1e232c;
`;

const error = css`
  border: 1.4px solid var(--red);
`;

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  isInputValid?: boolean | null;
}

const AuthInput: React.FC<PropsType> = ({
  name,
  title,
  isInputValid,
  ...props
}) => {
  return (
    <>
      <Title htmlFor={name}>{title}</Title>
      <Input id={name} $isInputValid={isInputValid} name={name} {...props} />
    </>
  );
};

export default AuthInput;

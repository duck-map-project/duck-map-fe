import { styled } from 'styled-components';

const Title = styled.label`
  font-size: 1.4rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--purple);
  border-radius: 5px;
`;

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
}

const AuthInput: React.FC<PropsType> = ({ name, title, ...props }) => {
  return (
    <>
      <Title htmlFor={name}>{title}</Title>
      <Input id={name} {...props} />
    </>
  );
};

export default AuthInput;

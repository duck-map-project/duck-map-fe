import styled, { css } from 'styled-components';

const primary = css`
  background-color: var(--blue-purple);
  color: #000;
`;

const purple = css`
  color: var(--white);
  background-color: var(--blue-purple);
`;

const white = css`
  border: 1px solid var(--blue-purple);
  background-color: var(--white);
  color: #000;
`;

const disabled = css`
  border: 1px solid var(--disabled);
  background-color: var(--disabled);
  color: var(--white);
`;

const wideBig = css`
  width: 100%;
  height: 45px;
`;

const big = css`
  width: 206px;
  height: 47px;
`;

const mid = css`
  width: 119px;
  height: 50px;
`;

const small = css`
  width: 85px;
  height: 26px;
`;

const colors = { primary, purple, white };
const sizes = { wideBig, big, mid, small };

interface PropsTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'primary' | 'purple' | 'white';
  size: 'wideBig' | 'big' | 'mid' | 'small';
}

const ButtonStyle = styled.button<PropsTypes>`
  font-size: 1.6rem;
  border-radius: 5px;
  cursor: pointer;
  word-break: keep-all;
  ${(props) =>
    !props.disabled && props.color ? colors[props.color] : disabled}
  ${(props) => (props.size ? sizes[props.size] : '')}
`;

const Button: React.FC<PropsTypes> = ({ children, ...props }) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>;
};

export default Button;

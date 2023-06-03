import { css, styled } from 'styled-components';

export interface PropsTypes
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  image: string;
  size: 'mid' | 'big';
}

const mid = css`
  width: 40px;
  height: 40px;
`;

const big = css`
  width: 80px;
  height: 80px;
`;

const IconButtonStyle = styled.label<PropsTypes>`
  display: block;
  ${({ size }) => (size === 'mid' ? mid : big)}
  border-radius: 50%;
  background-color: var(--blue-purple);
  background-image: ${(props) => (props.image ? `url(${props.image})` : '')};
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  cursor: pointer;
`;

const IconButton: React.FC<PropsTypes> = ({ ...props }) => {
  return <IconButtonStyle {...props} />;
};

export default IconButton;

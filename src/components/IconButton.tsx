import { styled } from 'styled-components';

interface PropsTypes extends React.LabelHTMLAttributes<HTMLLabelElement> {
  image: string;
}

const IconButtonStyle = styled.label<PropsTypes>`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--blue-purple);
  background-image: ${(props) => (props.image ? `url(${props.image})` : '')};
  background-repeat: no-repeat;
  background-size: 50px 50px;
  background-position: center;
  cursor: pointer;
`;

const IconButton: React.FC<PropsTypes> = ({ ...props }) => {
  return <IconButtonStyle {...props} />;
};

export default IconButton;

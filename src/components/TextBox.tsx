import styled from 'styled-components';

interface TextProps {
  text: string;
}

const TextWrapper = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #b8c0ff;
  border-radius: 5px;
  font-family: 'Abhaya Libre Medium';
  font-weight: 500;
  font-size: 16px;
  line-height: 50px;
  max-width: 500px;
  color: #000000;
  text-align: center;
`;

const TextBox = ({ text }: TextProps) => {
  return (
    <TextWrapper>
      {text}
    </TextWrapper>
  );
};

export default TextBox;

import styled from 'styled-components';

interface TextProps {
  text: string;
}

const TextWrapper = styled.div`
  position: absolute;
  width: 500px;
  height: 50px;
  left: 747px;
  top: 88px;
`;

const TextBoxInner = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: #FFFFFF;
  border: 1px solid #B8C0FF;
  border-radius: 5px;
`;

const Content = styled.span`
  position: absolute;
  left: 45%;
  right: 45.22%;
  top: 26%;
  bottom: 34%;

  font-family: 'Abhaya Libre Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
`;

const TextBox = ({ text }: TextProps) => {
  return (
    <TextWrapper>
      <TextBoxInner>
        <Content>{text}</Content>
      </TextBoxInner>
    </TextWrapper>
  );
};

export default TextBox;

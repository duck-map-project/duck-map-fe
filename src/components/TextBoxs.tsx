import { styled } from 'styled-components';

import media from '../utils/mediaQuery';

export const TextBox = styled.p`
  width: 100%;
  padding: 10px 0;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  background-color: #ffebf4;
  border: 2px solid #1e232c;
  border-radius: 30px;
  text-align: center;
  ${media.mobile`
    font-size: 2rem;
    padding: 7.5px 0;
  `}
`;

const TextBoxWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 46px;
  border: 2px solid #1e232c;
  border-radius: 30px;
  background-color: #ffebf4;
  overflow: hidden;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  ${media.mobile`
    font-size : 1.4rem
  `}
`;

const Title = styled.p<{ title: string }>`
  width: 158px;
  height: 100%;
  background-color: #ece4ff;
  border-right: 2px solid #1e232c;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.mobile`
  width: 90px;
  flex-shrink: 0;
  ${(props) => (props.title === '해시태그' ? 'display: none' : '')}
`}
`;

const Content = styled.span`
  width: 100%;
  text-align: center;
`;

interface TextBoxWithTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const TextBoxWithTitle = ({
  title,
  children,
}: TextBoxWithTitleProps) => {
  return (
    <TextBoxWrapper>
      <Title title={title}>{title}</Title>
      <Content>{children}</Content>
    </TextBoxWrapper>
  );
};

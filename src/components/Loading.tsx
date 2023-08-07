import styled from 'styled-components';

const Loading = ({ text }: { text: string }) => {
  return <LoadingWrapper>{text}</LoadingWrapper>;
};

export default Loading;

const LoadingWrapper = styled.article`
  position: absolute;
  padding: 20px;
  background-color: white;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  z-index: 9;
  font-weight: 700;
`;

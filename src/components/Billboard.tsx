import styled, { keyframes } from 'styled-components';

const SlideLeftAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const Container = styled.section`
  background: var(--gradient);
  color: #000;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  min-width: 100%;
`;

const HashtagList = styled.ul`
  display: flex;
  flex-basis: 100%;
  flex-shrink: 0;
  flex-grow: 1;
  height: 50px;
  align-items: center;
  animation: ${SlideLeftAnimation} 20s linear infinite;
`;

const ListItem = styled.li`
  font-size: 1.4rem;
  font-weight: 100;
  margin-right: 10px;
  &::before {
    content: '#';
  }
`;

const Billboard = () => {
  return (
    <Container>
      <Wrapper>
        <HashtagList>
          {/* FIXME: 나중에 동적으로 텍스트 받아오기. 현재는 테스트용 텍스트 */}
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그 Korea</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그 States</ListItem>
          <ListItem>해시태그</ListItem>
        </HashtagList>
        <HashtagList>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그 Korea</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그</ListItem>
          <ListItem>해시태그 States</ListItem>
          <ListItem>해시태그</ListItem>
        </HashtagList>
      </Wrapper>
    </Container>
  );
};

export default Billboard;

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useGetTodayHashtagsQuery } from '../features/eventApiSlice';
import { TodayHashtagsResponse } from '../types/eventService';

const SlideLeftAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const Container = styled.section`
  background: #eed8ff;
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
  height: 64px;
  align-items: center;
  animation: ${SlideLeftAnimation} 20s linear infinite;
`;

const ListItem = styled.li`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.247857142857143;
  margin-right: 10px;
`;

const Billboard = () => {
  const { data: hashtagsData } = useGetTodayHashtagsQuery();
  const [hashtags, setHashtags] = useState<TodayHashtagsResponse[]>([]);

  useEffect(() => {
    if (hashtagsData) {
      setHashtags(hashtagsData);
    }
  }, [hashtagsData]);

  const listItems = hashtags?.map((hashtag, index) => (
    <ListItem key={index}>{hashtag.hashtag}</ListItem>
  ));
  return (
    <Container>
      <Wrapper>
        <HashtagList>{listItems}</HashtagList>
        <HashtagList>{listItems}</HashtagList>
      </Wrapper>
    </Container>
  );
};

export default Billboard;

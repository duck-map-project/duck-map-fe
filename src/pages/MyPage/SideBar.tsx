import { useEffect, useState } from 'react';

import { useRouter } from '../../hooks/useRouter';

import {
  SideBarSection,
  Spring,
  SpringWrapper,
  ListsWrapper,
  List,
  ListLink,
} from './SideBarStyle';

const SideListArray = [
  {
    id: 1,
    value: 'bookmark',
    group: 'sidebar',
    text: '북마크',
    to: '/mypage/bookmark',
  },
  {
    id: 2,
    value: 'like',
    group: 'sidebar',
    text: '좋아요',
    to: '/mypage/like',
  },
  {
    id: 3,
    value: 'myreview',
    group: 'sidebar',
    text: '나의 리뷰',
    to: '/mypage/myreview',
  },
  {
    id: 4,
    value: 'myevent',
    group: 'sidebar',
    text: '나의 이벤트',
    to: '/mypage/myevent',
  },
  {
    id: 5,
    value: 'edit_profile',
    group: 'sidebar',
    text: '회원정보 수정',
    to: '/mypage/edit_profile',
  },
  {
    id: 6,
    value: 'change_password',
    group: 'sidebar',
    text: '비밀번호 변경',
    to: '/mypage/change_password',
  },
];

const SideBar = () => {
  const springNumber = new Array(8).fill(0);

  const [selectedItem, setSelectedItem] = useState('bookmark');
  const { currentPath } = useRouter();
  const params = currentPath.slice(8);

  useEffect(() => {
    if (params === '' || params === 'bookmark') {
      setSelectedItem('bookmark');
    } else {
      setSelectedItem(params);
    }
  }, [params]);

  return (
    <SideBarSection>
      <SpringWrapper>
        {springNumber.map((_, i) => (
          <Spring key={i} />
        ))}
      </SpringWrapper>
      <ListsWrapper>
        {SideListArray.map((content) => (
          <List key={content.id}>
            <ListLink selected={content.value === selectedItem} to={content.to}>
              {content.text}
            </ListLink>
          </List>
        ))}
      </ListsWrapper>
    </SideBarSection>
  );
};

export default SideBar;

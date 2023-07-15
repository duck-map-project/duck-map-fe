import heartIcon from '../../assets/icons/heart.svg';

import {
  SideBarSection,
  Spring,
  SpringWrapper,
  ListsWrapper,
  List,
  ListLabel,
  RadioInput,
} from './SideBarStyle';

type SideBarProps = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const SideListArray = [
  {
    id: 1,
    value: 'bookmark',
    group: 'sidebar',
    text: '북마크',
  },
  {
    id: 2,
    value: 'like',
    group: 'sidebar',
    text: '좋아요',
  },
  { id: 3, value: 'myreview', group: 'sidebar', text: '나의 리뷰' },
  {
    id: 4,
    value: 'myevent',
    group: 'sidebar',
    text: '나의 이벤트',
  },
  {
    id: 5,
    value: 'editprofile',
    group: 'sidebar',
    text: '회원정보 수정',
  },
  {
    id: 6,
    value: 'changepassword',
    group: 'sidebar',
    text: '비밀번호 변경',
  },
];

const SideBar = ({ state, setState }: SideBarProps) => {
  const springNumber = new Array(8).fill(0);
  state;
  setState;

  const onChangeList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

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
            <ListLabel
              htmlFor={content.value}
              selected={content.value === state}
              heartIcon={heartIcon}
            >
              {content.text}
            </ListLabel>
            <RadioInput
              type="radio"
              id={content.value}
              value={content.value}
              name={content.group}
              onChange={onChangeList}
            />
          </List>
        ))}
      </ListsWrapper>
    </SideBarSection>
  );
};

export default SideBar;

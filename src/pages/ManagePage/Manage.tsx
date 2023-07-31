import React from 'react';
import { useState } from 'react';

import { ReactComponent as Bookicon } from '../../assets/icons/book.svg';
import manageImage from '../../assets/icons/manageImage.svg';

import ArtistList from './ArtistList';
import {
  ManageInfoSection,
  ManageTitle,
  ManageInfoImage,
  List,
  TabWrapper,
  Tab,
  ListTitleText,
} from './ManageStyle';

const tabArray = [
  {
    id: 1,
    value: 'artist',
    group: 'tab',
    text: '아티스트 목록',
    iconcolor: '#B2E3FF',
  },
  {
    id: 2,
    value: 'category',
    group: 'tab',
    text: '카테고리 목록',
    iconcolor: '#DDFFB2',
  },
  {
    id: 3,
    value: 'artisttype',
    group: 'tab',
    text: '카테고리 타입 목록',
    iconcolor: '#FFDCB2',
  },
];

const Manage = () => {
  const [selectedTab, setSelectedTab] = useState('artist');

  let content;
  if (selectedTab === 'artist') {
    content = <ArtistList />;
  } else if (selectedTab === 'category') {
    content = <div>카테고리</div>;
  } else if (selectedTab === 'artisttype') {
    content = <div>아티스트타입</div>;
  }

  const onClickTab = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
  };

  const tabContent = tabArray.map((data) => (
    <div key={data.id}>
      <Tab htmlFor={data.value} selected={data.value === selectedTab}>
        <Bookicon fill={data.iconcolor} />
        {data.text}
      </Tab>
      <input
        type="radio"
        id={data.value}
        value={data.value}
        name={data.group}
        onChange={onClickTab}
        className="sr-only"
      ></input>
    </div>
  ));

  return (
    <>
      <ManageInfoSection>
        <ManageTitle>
          <h2>
            이곳은 <br />
            관리자 페이지입니다.
          </h2>
          <p>그룹을 등록하고, 아티스트, 카테고리를 등록할 수 있습니다.</p>
        </ManageTitle>
        <ManageInfoImage src={manageImage} />
      </ManageInfoSection>
      {/* 여기에 탭 */}
      <List>
        <TabWrapper>{tabContent}</TabWrapper>
        <ListTitleText>아티스트 목록</ListTitleText>
        {/* 여기서 state에 따라 분기 content를 분기두면 되겠다.  */}
        {/* content 자체를 하나의 section으로 하고, 이거를 저기로 그냥 다 옮기자 */}
        {content}
        {/* <ArtistListSection ref={artistListRef}>{content}</ArtistListSection> */}
      </List>
    </>
  );
};

export default React.memo(Manage);

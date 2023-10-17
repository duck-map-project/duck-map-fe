import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as Bookicon } from '../../assets/book.svg';
import manageImage from '../../assets/manageImage.svg';

import ArtistList from './Artist/ArtistList';
import ArtistTypeList from './ArtistType/ArtistTypeList';
import CategoryList from './Category/CategoryList';
import {
  ManageInfoSection,
  ManageTitle,
  ManageInfoImage,
  List,
  TabWrapper,
  Tab,
  ListTitleText,
} from './style';

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
    text: '아티스트 타입 목록',
    iconcolor: '#FFDCB2',
  },
];

const Manage = () => {
  const [params] = useSearchParams();
  const sort = params.get('sort');
  const [selectedTab, setSelectedTab] = useState('artist');
  useEffect(() => {
    sort && setSelectedTab(sort);
  }, [sort]);

  let content;
  let title;
  if (selectedTab === 'artist') {
    content = <ArtistList />;
    title = '아티스트 목록';
  } else if (selectedTab === 'category') {
    content = <CategoryList />;
    title = '카테고리 목록';
  } else if (selectedTab === 'artisttype') {
    content = <ArtistTypeList />;
    title = '아티스트 타입 목록';
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
      <List>
        <TabWrapper>{tabContent}</TabWrapper>
        <ListTitleText>{title}</ListTitleText>
        {content}
      </List>
    </>
  );
};

export default React.memo(Manage);

import React from 'react';

import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import { ArtistContent } from '../../types/artistsType';

import {
  ListItem,
  ListItemTitle,
  CommonButton,
  ArtistImgContainer,
  ArtistImg,
  ArtistName,
} from './ArtistListItemStyle';

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const ArtistListItem = ({ data }: { data: ArtistContent }) => {
  return (
    <ListItem>
      <ListItemTitle>
        <ArtistName>{data.name}</ArtistName>
        <CommonButton type="button">
          <img src={editIcon} />
        </CommonButton>
        <CommonButton type="button">
          <img src={deleteIcon} />
        </CommonButton>
      </ListItemTitle>
      <ArtistImgContainer>
        <ArtistImg src={testImg} />
      </ArtistImgContainer>
    </ListItem>
  );
};

export default React.memo(ArtistListItem);
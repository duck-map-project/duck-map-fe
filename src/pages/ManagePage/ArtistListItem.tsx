import React from 'react';

import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import { useDeleteArtistsMutation } from '../../redux/artistsSlice';
import { ArtistContent } from '../../types/artistsType';

import {
  ListItem,
  ListItemTitle,
  CommonButton,
  ArtistImgContainer,
  ArtistImg,
  ArtistName,
} from './ArtistListItemStyle';

const ArtistListItem = ({ data }: { data: ArtistContent }) => {
  //test data용 image
  const testImg =
    'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';
  const artistImage = data.image !== '/images/null' ? data.image : testImg;

  const [deleteArtist] = useDeleteArtistsMutation();
  const onClickDeleteBtn = async () => {
    console.log(data.id);
    if (!window.confirm(`아티스트 "${data.name}"(을)를 삭제하시겠습니까?`)) {
      return;
    }
    try {
      await deleteArtist(data.id);
      alert('성공적으로 삭제되었습니다!');
      //화면에서 지워져야 하는데!
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ListItem>
      <ListItemTitle>
        <ArtistName>{data.name}</ArtistName>
        <CommonButton type="button">
          <img src={editIcon} />
        </CommonButton>
        <CommonButton type="button" onClick={onClickDeleteBtn}>
          <img src={deleteIcon} />
        </CommonButton>
      </ListItemTitle>
      <ArtistImgContainer>
        <ArtistImg image={artistImage} />
      </ArtistImgContainer>
    </ListItem>
  );
};

export default React.memo(ArtistListItem);

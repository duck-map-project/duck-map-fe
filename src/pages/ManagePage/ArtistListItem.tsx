import React from 'react';
import { useDispatch } from 'react-redux';

import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import { useDeleteArtistsMutation } from '../../redux/artistsSlice';
import { editArtistInfo } from '../../redux/editArtistSlice';
import { toggleEditGroup } from '../../redux/manageModalSlice';
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
  const dispatch = useDispatch();
  const [deleteArtist] = useDeleteArtistsMutation();
  const artistImage = data.image !== '/images/null' ? data.image : testImg;

  // console.log(data);
  const onClickEditBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    const artistData = {
      id: data.id,
      groupId: data.groupId,
      groupName: data.groupName,
      name: data.name,
      image: data.image,
      artistTypeId: data.artistType.id,
    };
    if (data.artistType.type === '그룹' && data.groupName === null) {
      dispatch(editArtistInfo(artistData));
      dispatch(toggleEditGroup());
      return;
    }
    console.log('아티스트 수정 모달');
  };

  const onClickDeleteBtn = async () => {
    if (!window.confirm(`아티스트 "${data.name}"(을)를 삭제하시겠습니까?`)) {
      return;
    }
    try {
      await deleteArtist(data.id);
      alert('성공적으로 삭제되었습니다!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListItem>
      <ListItemTitle>
        <ArtistName>{data.name}</ArtistName>
        <CommonButton type="button" onClick={onClickEditBtn}>
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

import React from 'react';
import { useDispatch } from 'react-redux';

import deleteIcon from '../../../assets/delete.svg';
import editIcon from '../../../assets/edit.svg';
import defaultImage from '../../../assets/user-profile.svg';
import { useDeleteArtistsMutation } from '../../../features/artists/services/artistsApiSlice';
import { editArtistInfo } from '../../../features/artists/services/setArtistSlice';
import { modals } from '../../../features/modal/ReduxModalRoot';
import useModal from '../../../hooks/useModal';
import { ArtistContent } from '../../../types/artistsType';

import {
  ListItem,
  ListItemTitle,
  SettingBtnWrapper,
  CommonButton,
  ArtistImgContainer,
  ArtistImg,
  ArtistName,
} from './ArtistListItemStyle';

const ArtistListItem = ({ data }: { data: ArtistContent }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const [deleteArtist] = useDeleteArtistsMutation();
  const { openModal } = useModal();
  const artistImage =
    data.image !== '/images/null' ? baseURL + data.image : defaultImage;

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
    dispatch(editArtistInfo(artistData));

    if (data.artistType.type === '그룹' && data.groupName === null) {
      openModal({ Component: modals.groupModal, props: { type: 'edit' } });
      return;
    }
    openModal({ Component: modals.artistModal, props: { type: 'edit' } });
  };

  const onClickDeleteBtn = async () => {
    if (!window.confirm(`아티스트 "${data.name}"(을)를 삭제하시겠습니까?`)) {
      return;
    }
    try {
      await deleteArtist(data.id);
      alert('성공적으로 삭제되었습니다!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ListItem>
      <ListItemTitle>
        <ArtistName>{data.name}</ArtistName>
        <SettingBtnWrapper>
          <CommonButton type="button" onClick={onClickEditBtn}>
            <img src={editIcon} />
          </CommonButton>
          <CommonButton type="button" onClick={onClickDeleteBtn}>
            <img src={deleteIcon} />
          </CommonButton>
        </SettingBtnWrapper>
      </ListItemTitle>
      <ArtistImgContainer>
        <ArtistImg image={artistImage} />
      </ArtistImgContainer>
    </ListItem>
  );
};

export default React.memo(ArtistListItem);

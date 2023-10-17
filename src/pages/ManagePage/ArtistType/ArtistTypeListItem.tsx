import { useDispatch } from 'react-redux';

import deleteIcon from '../../../assets/icons/delete.svg';
import editIcon from '../../../assets/icons/edit.svg';
import { useDeleteArtistsTypeMutation } from '../../../features/artists/services/artistsTypeApiSlice';
import { editArtistTypeInfo } from '../../../features/artists/services/setArtistTypeSlice';
import { toggleEditArtistType } from '../../../features/modal/manageModalSlice';

import * as S from './ArtistTypeListItemStyle';

type listItemProps = {
  id: number;
  text: string;
};
const ArtistTypeListItem = ({ id, text }: listItemProps) => {
  const dispatch = useDispatch();
  const [deleteArtistType] = useDeleteArtistsTypeMutation();

  const onClickEditBtn = () => {
    dispatch(editArtistTypeInfo({ id, type: text }));
    dispatch(toggleEditArtistType());
  };
  const onClickDeleteBtn = async () => {
    if (window.confirm(`아티스트 타입 "${text}"(을)를 삭제하시겠습니까?`)) {
      try {
        const res = await deleteArtistType({ id });
        if ('data' in res) {
          alert('성공적으로 삭제되었습니다.');
        } else if ('error' in res) {
          alert('잠시 후 다시 시도해주세요.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <S.TypeListItem>
      <S.TypeText>{text}</S.TypeText>
      <S.TypeButtonWrapper>
        <S.TypeCommonButton type="button" onClick={onClickEditBtn}>
          <img src={editIcon} />
        </S.TypeCommonButton>
        <S.TypeCommonButton type="button" onClick={onClickDeleteBtn}>
          <img src={deleteIcon} />
        </S.TypeCommonButton>
      </S.TypeButtonWrapper>
    </S.TypeListItem>
  );
};

export default ArtistTypeListItem;

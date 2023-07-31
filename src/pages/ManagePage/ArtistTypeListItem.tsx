import { useDispatch } from 'react-redux';

import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import { useDeleteArtistsTypeMutation } from '../../redux/artistsTypeSlice';
import { editArtistTypeInfo } from '../../redux/editArtistTypeSlice';
import { toggleEditArtistType } from '../../redux/manageModalSlice';

import {
  ListItem,
  ItemText,
  ButtonWrapper,
  CommonButton,
} from './ArtistTypeListItemStyle';

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
    <ListItem>
      <ItemText>{text}</ItemText>
      <ButtonWrapper>
        <CommonButton type="button" onClick={onClickEditBtn}>
          <img src={editIcon} />
        </CommonButton>
        <CommonButton type="button" onClick={onClickDeleteBtn}>
          <img src={deleteIcon} />
        </CommonButton>
      </ButtonWrapper>
    </ListItem>
  );
};

export default ArtistTypeListItem;

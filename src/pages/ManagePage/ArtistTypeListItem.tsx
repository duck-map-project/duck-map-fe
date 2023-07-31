import { useDispatch } from 'react-redux';

import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
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
  const onClickEditBtn = () => {
    dispatch(editArtistTypeInfo({ id, type: text }));
    dispatch(toggleEditArtistType());
  };
  return (
    <ListItem>
      <ItemText>{text}</ItemText>
      <ButtonWrapper>
        <CommonButton type="button" onClick={onClickEditBtn}>
          <img src={editIcon} />
        </CommonButton>
        <CommonButton type="button">
          <img src={deleteIcon} />
        </CommonButton>
      </ButtonWrapper>
    </ListItem>
  );
};

export default ArtistTypeListItem;

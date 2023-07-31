import { useDispatch } from 'react-redux';

import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import { editCategoryInfo } from '../../redux/editCategorySlice';
import { useDeleteEventCategoryMutation } from '../../redux/eventCategorySlice';
import { toggleEditCategory } from '../../redux/manageModalSlice';

import {
  ListItem,
  ItemText,
  ButtonWrapper,
  CommonButton,
} from './CategoryListItemStyle';

type listItemProps = {
  id: number;
  text: string;
};

const CategoryListItem = ({ id, text }: listItemProps) => {
  const dispatch = useDispatch();
  const [deleteCategory] = useDeleteEventCategoryMutation();

  const onClickEditBtn = () => {
    dispatch(editCategoryInfo({ id, category: text }));
    dispatch(toggleEditCategory());
  };

  const onClickDeleteBtn = async () => {
    if (window.confirm(`카테고리 "${text}"(을)를 삭제하시겠습니까?`)) {
      try {
        const res = await deleteCategory({ id });
        if ('data' in res) {
          alert('성공적으로 삭제되었습니다.');
        } else {
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

export default CategoryListItem;

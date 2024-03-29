import { useDispatch } from 'react-redux';

import deleteIcon from '../../../assets/delete.svg';
import editIcon from '../../../assets/edit.svg';
import { useDeleteEventCategoryMutation } from '../../../features/categories/services/categoryApiSlice';
import { editCategoryInfo } from '../../../features/categories/services/setCategorySlice';
import { modals } from '../../../features/modal/ReduxModalRoot';
import useModal from '../../../hooks/useModal';

import * as S from './CategoryListItemStyle';

type listItemProps = {
  id: number;
  text: string;
};

const CategoryListItem = ({ id, text }: listItemProps) => {
  const dispatch = useDispatch();
  const [deleteCategory] = useDeleteEventCategoryMutation();
  const { openModal } = useModal();

  const onClickEditBtn = () => {
    dispatch(editCategoryInfo({ id, category: text }));
    openModal({ Component: modals.categoryModal, props: { type: 'edit' } });
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
    <S.ListItem>
      <S.ItemText>{text}</S.ItemText>
      <S.ButtonWrapper>
        <S.CommonButton type="button" onClick={onClickEditBtn}>
          <img src={editIcon} />
        </S.CommonButton>
        <S.CommonButton type="button" onClick={onClickDeleteBtn}>
          <img src={deleteIcon} />
        </S.CommonButton>
      </S.ButtonWrapper>
    </S.ListItem>
  );
};

export default CategoryListItem;

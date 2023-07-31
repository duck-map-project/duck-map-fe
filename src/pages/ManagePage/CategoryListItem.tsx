import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import { useDeleteEventCategoryMutation } from '../../redux/eventCategoryType';

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
  const [deleteCategory] = useDeleteEventCategoryMutation();
  const onClickDeleteBtn = async () => {
    if (window.confirm(`카테고리 "${text}"를 삭제하시겠습니까?`)) {
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
        <CommonButton type="button">
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

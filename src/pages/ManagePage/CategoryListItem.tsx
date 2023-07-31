import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';

import {
  ListItem,
  ItemText,
  ButtonWrapper,
  CommonButton,
} from './CategoryListItemStyle';

type listItemProps = {
  text: string;
};
const CategoryListItem = ({ text }: listItemProps) => {
  return (
    <ListItem>
      <ItemText>{text}</ItemText>
      <ButtonWrapper>
        <CommonButton type="button">
          <img src={editIcon} />
        </CommonButton>
        <CommonButton type="button">
          <img src={deleteIcon} />
        </CommonButton>
      </ButtonWrapper>
    </ListItem>
  );
};

export default CategoryListItem;

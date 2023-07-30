import { useDispatch } from 'react-redux';

import { toggleEventCategory } from '../../redux/manageModalSlice';

import { ModalTitle } from './AddArtistModalStyle';
import { ModalCloseButton } from './AddEventModal';
import { DoneButton } from './ArtistSelectModalStyle';
import {
  CategoryItem,
  CategoryListSection,
  CategorySelectSection,
} from './CategorySelectModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';

const CategorySelectModal = () => {
  const dispatch = useDispatch();
  const onHideModal = () => {
    dispatch(toggleEventCategory());
  };
  return (
    <ModalPortal>
      <CommonModal modalWidth="1046px" onClick={onHideModal}>
        <ModalCloseButton onClick={onHideModal} />
        <ModalTitle>카테고리 선택하기</ModalTitle>
        <CategorySelectSection>
          <CategoryListSection>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
          </CategoryListSection>
        </CategorySelectSection>
        <DoneButton>완료</DoneButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default CategorySelectModal;

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  categoryType,
  useGetEventCategoryQuery,
} from '../../redux/eventCategorySlice';
import { toggleEventCategory } from '../../redux/manageModalSlice';

import { ModalTitle } from './AddArtistModalStyle';
import { ModalCloseButton } from './AddEventModalStyle';
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
  const [categories, setCategories] = useState<categoryType[]>([]);

  const { data: categoryData } = useGetEventCategoryQuery();

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData]);
  console.log(categories);

  return (
    <ModalPortal>
      <CommonModal width="1046px" onClick={onHideModal}>
        <ModalCloseButton onClick={onHideModal} />
        <ModalTitle>카테고리 선택하기</ModalTitle>
        <CategorySelectSection>
          <CategoryListSection>
            {categories &&
              categories.map((category) => (
                <CategoryItem key={category.id}>
                  {category.category}
                </CategoryItem>
              ))}
          </CategoryListSection>
        </CategorySelectSection>
        <DoneButton>완료</DoneButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default CategorySelectModal;

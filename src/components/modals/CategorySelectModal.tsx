import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {
  categoryType,
  useGetEventCategoryQuery,
} from '../../redux/eventCategorySlice';
import { toggleEventCategory } from '../../redux/manageModalSlice';
import {
  Category,
  selectSelectedCategory,
  setCategory,
} from '../../redux/setEventElemetsSlice';

import { ModalCloseButton } from './ArtistSelectModalStyle';
import { DoneButton } from './ArtistSelectModalStyle';
import {
  CategoryModalTitle,
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
  const selectedCategories = useSelector(selectSelectedCategory);
  const [categoriesIds, setCategoriesIds] =
    useState<Category[]>(selectedCategories);
  const { data: categoryData } = useGetEventCategoryQuery();

  const onCategoryClick = (categoriesId: number, category: string) => {
    const existingCategory = categoriesIds.find(
      (category) => category.id === categoriesId
    );

    if (existingCategory) {
      const updatedCategoryIds = categoriesIds.filter(
        (category) => category.id !== categoriesId
      );
      setCategoriesIds(updatedCategoryIds);
    } else {
      setCategoriesIds((prev) => [...prev, { id: categoriesId, category }]);
    }
  };

  const handleSaveCategoryIds = () => {
    if (categoriesIds.length !== 0) {
      dispatch(setCategory(categoriesIds));
      onHideModal();
    }
  };

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  return (
    <ModalPortal>
      <CommonModal width="1046px" onClick={onHideModal}>
        <ModalCloseButton onClick={onHideModal} />
        <CategoryModalTitle>카테고리 선택하기</CategoryModalTitle>
        <CategorySelectSection>
          <CategoryListSection>
            {categories &&
              categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  onClick={() => {
                    onCategoryClick(category.id, category.category);
                  }}
                  currentId={category.id}
                  selectedIds={categoriesIds.map((category) => category.id)}
                >
                  {category.category}
                </CategoryItem>
              ))}
          </CategoryListSection>
        </CategorySelectSection>
        <DoneButton type="button" onClick={handleSaveCategoryIds}>
          완료
        </DoneButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default CategorySelectModal;

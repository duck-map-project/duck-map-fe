import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CommonModal from '../../../components/modal/CommonModal';
import { CategoryType } from '../../../types/categoryType';
import {
  ModalCloseButton,
  DoneButton,
} from '../../artists/modals/ArtistSelectModalStyle';
import {
  Category,
  selectSelectedCategory,
  setCategory,
} from '../../events/services/setEventElemetsSlice';
import { ModalProps } from '../../modal/modalsSlice';
import { useGetEventCategoryQuery } from '../services/categoryApiSlice';

import {
  CategoryModalTitle,
  CategoryItem,
  CategoryListSection,
  CategorySelectSection,
} from './CategorySelectModalStyle';

const CategorySelectModal = ({ onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<CategoryType[]>([]);
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
      onClose();
    }
  };

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  return (
    <CommonModal width="1046px" onClick={onClose}>
      <ModalCloseButton onClick={onClose} />
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
  );
};

export default CategorySelectModal;

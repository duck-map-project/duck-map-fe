import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import closeIcon from '../../../assets/icons/close.svg';
import CommonModal, {
  ModalPortal,
} from '../../../components/modal/CommonModal';
import TypeButton from '../../../components/modal/TypeButton';
import {
  toggleCategory,
  toggleEditCategory,
} from '../../modal/manageModalSlice';
import {
  useGetEventCategoryQuery,
  useAddEventCategoryMutation,
  useEditEventCategoryMutation,
} from '../services/categoryApiSlice';
import { selectEditCategorySlice } from '../services/setCategorySlice';

import {
  CategoryModalTitle,
  CategoryModalCloseButton,
  CategoryInput,
  CategoryNameLabel,
  CategorySubmitButton,
  TypeWrapper,
} from './CategoryModalStyle';

type categoryType = {
  id: number;
  category: string;
};

type categoryProps = {
  type: 'add' | 'edit';
};
const CategoryModal = ({ type }: categoryProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryContents, setCategoryContents] = useState<categoryType[]>([]);
  const dispatch = useDispatch();
  const { data: eventCategories } = useGetEventCategoryQuery();
  const [addNewCategory] = useAddEventCategoryMutation();
  const [editCategory] = useEditEventCategoryMutation();
  const editData = useSelector(selectEditCategorySlice);

  useEffect(() => {
    if (type === 'edit') {
      setCategoryName(editData.category);
    }
  }, [editData]);

  const onHideModal = () => {
    if (type === 'add') {
      dispatch(toggleCategory());
      return;
    }
    dispatch(toggleEditCategory());
  };

  const onChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const onClickAddCategoryBtn = async () => {
    try {
      await addNewCategory(categoryName);
      onHideModal();
    } catch (error) {
      console.error(error);
      alert('앗, 제대로 저장되지 않았어요 다시 시도해주세요');
    }
  };

  const onClickEditCategoryBtn = async () => {
    try {
      const res = await editCategory({
        id: editData.id,
        category: categoryName,
      });
      if ('data' in res) {
        alert('성공적으로 수정되었습니다.');
        onHideModal();
      } else {
        alert('다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (eventCategories) setCategoryContents(eventCategories);
  }, [eventCategories]);

  let typeContents;
  if (categoryContents.length > 0) {
    typeContents = categoryContents.map((content) => (
      <TypeButton
        key={content.id}
        data={content}
        text={content.category}
        selected={true}
      />
    ));
  }

  return (
    <ModalPortal>
      <CommonModal className="addGroupModal" onClick={onHideModal}>
        <CategoryModalTitle>
          카테고리 {type === 'add' ? '등록' : '수정'}하기
        </CategoryModalTitle>
        <CategoryModalCloseButton type="button" onClick={onHideModal}>
          <img src={closeIcon} />
        </CategoryModalCloseButton>
        <CategoryNameLabel htmlFor="artistName">
          카테고리를 {type === 'add' ? '입력' : '수정'}해 주세요.
        </CategoryNameLabel>
        <TypeWrapper>
          {type === 'add' ? (
            typeContents
          ) : (
            <TypeButton
              data={{ id: editData.id }}
              text={editData.category}
              selected={true}
            />
          )}
        </TypeWrapper>
        <CategoryInput
          type="text"
          id="artistName"
          value={categoryName}
          onChange={onChangeCategoryName}
          placeholder="직접 입력"
        />
        <CategorySubmitButton
          type="button"
          onClick={
            type === 'add' ? onClickAddCategoryBtn : onClickEditCategoryBtn
          }
        >
          완료
        </CategorySubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default CategoryModal;

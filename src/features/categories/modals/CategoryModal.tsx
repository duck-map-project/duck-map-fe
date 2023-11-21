import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import closeIcon from '../../../assets/close.svg';
import Loading from '../../../components/Loading';
import CommonModal from '../../../components/modal/CommonModal';
import TypeButton from '../../../components/modal/TypeButton';
import { performApiAction } from '../../../utils/apiHelpers';
import { ModalProps } from '../../modal/modalsSlice';
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

const CategoryModal = ({ type, onClose }: ModalProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryContents, setCategoryContents] = useState<categoryType[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const { data: eventCategories } = useGetEventCategoryQuery();
  const [addNewCategory] = useAddEventCategoryMutation();
  const [editCategory] = useEditEventCategoryMutation();
  const editData = useSelector(selectEditCategorySlice);

  useEffect(() => {
    if (type === 'edit') {
      setCategoryName(editData.category);
    }
  }, [editData]);

  useEffect(() => {
    if (eventCategories) setCategoryContents(eventCategories);
  }, [eventCategories]);

  const onChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const onClickSaveBtn = async () => {
    try {
      setIsRequesting(true);

      if (!categoryName) {
        alert('카테고리를 입력해주세요.');
        throw new Error('Invalid Category');
      }

      if (type === 'add') {
        const successMessage = '카테고리가 정상적으로 추가되었습니다.';

        await performApiAction(
          categoryName,
          addNewCategory,
          onClose,
          successMessage
        );
      } else if (type === 'edit') {
        const data = {
          id: editData.id,
          category: categoryName,
        };
        const successMessage = '카테고리가 정상적으로 수정되었습니다.';

        await performApiAction(data, editCategory, onClose, successMessage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  let typeContents;
  if (categoryContents.length > 0) {
    typeContents = categoryContents.map((content) => (
      <TypeButton
        key={content.id}
        id={content.id}
        text={content.category}
        selected={true}
      />
    ));
  }

  return (
    <CommonModal className="addGroupModal" onClick={onClose}>
      {isRequesting && <Loading />}
      <CategoryModalTitle>
        카테고리 {type === 'add' ? '등록' : '수정'}하기
      </CategoryModalTitle>
      <CategoryModalCloseButton type="button" onClick={onClose}>
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
            id={editData.id}
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
      <CategorySubmitButton type="button" onClick={onClickSaveBtn}>
        완료
      </CategorySubmitButton>
    </CommonModal>
  );
};

export default CategoryModal;

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import closeIcon from '../../assets/icons/close.svg';
import {
  useGetEventCategoryQuery,
  useAddEventCategoryMutation,
} from '../../redux/eventCategoryType';
import { toggleCategory } from '../../redux/manageModalSlice';

import {
  ModalTitle,
  ModalCloseButton,
  CategoryInput,
  NameLabel,
  SubmitButton,
  TypeWrapper,
} from './AddEventCategoryModalStyle';
import CommonModal from './CommonModal';
import { ModalPortal } from './CommonModal';
import TypeButton from './components/TypeButton';

type categoryType = {
  id: number;
  category: string;
};
const AddCategoryModal = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryContents, setCategoryContents] = useState<categoryType[]>([]);
  const dispatch = useDispatch();
  const { data: eventCategories } = useGetEventCategoryQuery();
  const [addNewCategory] = useAddEventCategoryMutation();
  const onHideModal = () => {
    dispatch(toggleCategory());
  };

  const onChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const onClickAddGroupBtn = async () => {
    sendCategoryInfo();
  };

  const sendCategoryInfo = async () => {
    try {
      await addNewCategory(categoryName);
      onHideModal();
    } catch (error) {
      console.error(error);
      alert('앗, 제대로 저장되지 않았어요 다시 시도해주세요');
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
        <ModalTitle>카테고리 등록하기</ModalTitle>
        <ModalCloseButton type="button" onClick={onHideModal}>
          <img src={closeIcon} />
        </ModalCloseButton>
        <NameLabel htmlFor="artistName">이벤트 타입을 입력해 주세요.</NameLabel>
        <TypeWrapper>{typeContents}</TypeWrapper>
        <CategoryInput
          type="text"
          id="artistName"
          value={categoryName}
          onChange={onChangeCategoryName}
          placeholder="직접 입력"
        />
        <SubmitButton type="button" onClick={onClickAddGroupBtn}>
          완료
        </SubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default AddCategoryModal;

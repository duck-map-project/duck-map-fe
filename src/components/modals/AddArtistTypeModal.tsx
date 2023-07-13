import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import closeIcon from '../../assets/icons/close.svg';
import { useGetArtistsTypeQuery } from '../../redux/artistsTypeSlice';
import { useAddArtistsTypeMutation } from '../../redux/artistsTypeSlice';
import { toggleArtistType } from '../../redux/manageModalSlice';

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

type artistType = {
  id: number;
  type: string;
};
const AddArtistTypeModal = () => {
  const [typeName, setTypeName] = useState('');
  const [artistTypeContents, setArtistTypeContents] = useState<artistType[]>(
    []
  );
  const dispatch = useDispatch();
  const { data: artistTypes } = useGetArtistsTypeQuery();
  const [addNewArtistType] = useAddArtistsTypeMutation();

  const onHideModal = () => {
    dispatch(toggleArtistType());
  };

  const onChangeTypeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeName(e.target.value);
  };

  const onClickAddTypeBtn = async () => {
    try {
      await addNewArtistType(typeName);
      onHideModal();
    } catch (error) {
      console.error(error);
      alert('앗, 제대로 저장되지 않았어요 다시 시도해주세요');
    }
  };

  useEffect(() => {
    if (artistTypes) setArtistTypeContents(artistTypes);
  }, [artistTypes]);

  let typeContents;
  if (artistTypeContents.length > 0) {
    typeContents = artistTypeContents.map((content) => (
      <TypeButton
        key={content.id}
        data={content}
        text={content.type}
        selected={true}
      />
    ));
  }

  return (
    <ModalPortal>
      <CommonModal className="addGroupModal" onClick={onHideModal}>
        <ModalTitle>아티스트 타입 등록하기</ModalTitle>
        <ModalCloseButton type="button" onClick={onHideModal}>
          <img src={closeIcon} />
        </ModalCloseButton>
        <NameLabel htmlFor="artistName">
          아티스트 타입을 입력해 주세요.
        </NameLabel>
        <TypeWrapper>{typeContents}</TypeWrapper>
        <CategoryInput
          type="text"
          id="artistName"
          value={typeName}
          onChange={onChangeTypeName}
          placeholder="직접 입력"
        />
        <SubmitButton type="button" onClick={onClickAddTypeBtn}>
          완료
        </SubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default AddArtistTypeModal;

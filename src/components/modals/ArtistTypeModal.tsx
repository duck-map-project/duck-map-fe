import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import closeIcon from '../../assets/icons/close.svg';
import {
  useGetArtistsTypeQuery,
  useAddArtistsTypeMutation,
  useEditArtistsTypeMutation,
} from '../../redux/artistsTypeSlice';
import { selectEditArtistType } from '../../redux/editArtistTypeSlice';
import {
  toggleArtistType,
  toggleEditArtistType,
} from '../../redux/manageModalSlice';

import { CategoryInput, TypeWrapper } from './CategoryModalStyle';
import CommonModal from './CommonModal';
import { ModalPortal } from './CommonModal';
import TypeButton from './components/TypeButton';
import {
  ModalTitle,
  ModalCloseButton,
  NameLabel,
  SubmitButton,
} from './GroupModalStyle';

type artistType = {
  id: number;
  type: string;
};

type modalProps = {
  type: 'add' | 'edit';
};
const ArtistTypeModal = ({ type }: modalProps) => {
  const [typeName, setTypeName] = useState('');
  const [artistTypeContents, setArtistTypeContents] = useState<artistType[]>(
    []
  );
  const dispatch = useDispatch();
  const { data: artistTypes } = useGetArtistsTypeQuery();
  const [addNewArtistType] = useAddArtistsTypeMutation();
  const [editArtistType] = useEditArtistsTypeMutation();
  const editData = useSelector(selectEditArtistType);

  useEffect(() => {
    if (type === 'edit') {
      setTypeName(editData.type);
    }
  }, [editData]);

  const onHideModal = () => {
    if (type === 'add') {
      dispatch(toggleArtistType());
      return;
    }
    dispatch(toggleEditArtistType());
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

  const onClickEditBtn = async () => {
    const data = {
      id: editData.id,
      type: typeName,
    };
    try {
      const res = await editArtistType(data);
      if ('data' in res) {
        alert('성공적으로 수정되었습니다.');
        onHideModal();
      } else {
        alert('잠시 후 다시 시도해주세요. ');
      }
    } catch (error) {
      console.error(error);
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
        <ModalTitle>
          아티스트 타입 {type === 'add' ? '등록' : '수정'}하기
        </ModalTitle>
        <ModalCloseButton type="button" onClick={onHideModal}>
          <img src={closeIcon} />
        </ModalCloseButton>
        <NameLabel htmlFor="artistName">
          아티스트 타입을 {type === 'add' ? '입력' : '수정'}해 주세요.
        </NameLabel>
        <TypeWrapper>
          {type === 'add' ? (
            typeContents
          ) : (
            <TypeButton
              data={{ id: editData.id }}
              text={typeName}
              selected={true}
            />
          )}
        </TypeWrapper>
        <CategoryInput
          type="text"
          id="artistName"
          value={typeName}
          onChange={onChangeTypeName}
          placeholder="직접 입력"
        />
        <SubmitButton
          type="button"
          onClick={type === 'add' ? onClickAddTypeBtn : onClickEditBtn}
        >
          완료
        </SubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default ArtistTypeModal;

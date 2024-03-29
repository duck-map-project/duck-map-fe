import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import closeIcon from '../../../assets/close.svg';
import Loading from '../../../components/Loading';
import CommonModal from '../../../components/modal/CommonModal';
import TypeButton from '../../../components/modal/TypeButton';
import { ArtisttypeType } from '../../../types/artisttypeType';
import { performApiAction } from '../../../utils/apiHelpers';
import {
  CategoryInput,
  TypeWrapper,
} from '../../categories/modals/CategoryModalStyle';
import { ModalProps } from '../../modal/modalsSlice';
import {
  useGetArtistsTypeQuery,
  useAddArtistsTypeMutation,
  useEditArtistsTypeMutation,
} from '../services/artistsTypeApiSlice';
import { selectEditArtistType } from '../services/setArtistTypeSlice';

import {
  ModalTitle,
  ModalCloseButton,
  NameLabel,
  SubmitButton,
} from './GroupModalStyle';

const ArtistTypeModal = ({ type, onClose }: ModalProps) => {
  const [typeName, setTypeName] = useState('');
  const [artistTypeContents, setArtistTypeContents] = useState<
    ArtisttypeType[]
  >([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const { data: artistTypes } = useGetArtistsTypeQuery();
  const [addArtistType] = useAddArtistsTypeMutation();
  const [editArtistType] = useEditArtistsTypeMutation();
  const editData = useSelector(selectEditArtistType);

  useEffect(() => {
    if (type === 'edit') {
      setTypeName(editData.type);
    }
  }, [editData]);

  const onChangeTypeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeName(e.target.value);
  };

  const onClickSaveBtn = async () => {
    try {
      setIsRequesting(true);

      if (!typeName) {
        alert('타입을 입력해주세요.');
        throw new Error('Invalid Type');
      }

      if (type === 'add') {
        const data = {
          type: typeName,
        };
        const successMessage = '아티스트 타입이 정상적으로 추가되었습니다.';
        await performApiAction(data, addArtistType, onClose, successMessage);
      } else if (type === 'edit') {
        const data = {
          id: editData.id,
          type: typeName,
        };
        const successMessage = '아티스트 타입이 정상적으로 수정되었습니다.';
        await performApiAction(data, editArtistType, onClose, successMessage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
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
        id={content.id}
        text={content.type}
        selected={true}
      />
    ));
  }

  return (
    <CommonModal className="addGroupModal" onClick={onClose}>
      {isRequesting && <Loading />}
      <ModalTitle>
        아티스트 타입 {type === 'add' ? '등록' : '수정'}하기
      </ModalTitle>
      <ModalCloseButton type="button" onClick={onClose}>
        <img src={closeIcon} />
      </ModalCloseButton>
      <NameLabel htmlFor="artistName">
        아티스트 타입을 {type === 'add' ? '입력' : '수정'}해 주세요.
      </NameLabel>
      <TypeWrapper>
        {type === 'add' ? (
          typeContents
        ) : (
          <TypeButton id={editData.id} text={typeName} selected={true} />
        )}
      </TypeWrapper>
      <CategoryInput
        type="text"
        id="artistName"
        value={typeName}
        onChange={onChangeTypeName}
        placeholder="직접 입력"
      />
      <SubmitButton type="button" onClick={onClickSaveBtn}>
        완료
      </SubmitButton>
    </CommonModal>
  );
};

export default ArtistTypeModal;

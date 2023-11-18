import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import closeIcon from '../../../assets/close.svg';
import photoIcon from '../../../assets/photo.svg';
import Loading from '../../../components/Loading';
import CommonModal from '../../../components/modal/CommonModal';
import TypeButton from '../../../components/modal/TypeButton';
import useImageProcessing from '../../../hooks/useImageProcessing';
import { ArtistType } from '../../../types/artistsType';
import handleErrorResponse from '../../../utils/handleErrorResponse';
import { ModalProps } from '../../modal/modalsSlice';
import {
  useAddArtistsMutation,
  useGetArtistsQuery,
  useEditArtistsMutation,
} from '../services/artistsApiSlice';
import { useGetArtistsTypeQuery } from '../services/artistsTypeApiSlice';
import { selectEditArtistSlice } from '../services/setArtistSlice';

import {
  ArtistModalTitle,
  ArtistModalCloseButton,
  TypeTitle,
  TypeWrapper,
  ArtistImageNameWrapper,
  ArtistInfoWrapper,
  ArtistImagePreview,
  ArtistNameInput,
  NameLabel,
  ArtistSubmitButton,
  StyledInput,
  GroupSortDropdown,
} from './ArtistModalStyle';

export type sortOptionsType = {
  sort: string;
  id: number;
  handler?: () => void;
};

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const ArtistModal = ({ type, onClose }: ModalProps) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  //그룹드롭다운
  const [dropdownText, setDropdownText] = useState<string | null>('그룹');
  //그룹인 경우 선택될 아이디
  const [groupId, setGroupId] = useState<number | null>(null);
  //아티스트의 타입
  const [artistType, setArtistType] = useState(2);
  //사진 file
  const [artistImage, setArtistImage] = useState<File | undefined>(undefined);
  //프리뷰 사진
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [savedImagefile, setSavedImagefile] = useState<string | undefined>(
    undefined
  ); // 저장된 이미지의 filename
  const [artistName, setArtistName] = useState<string | undefined>(undefined);
  const [artistTypeArray, setArtistTypeArray] = useState<ArtistType[] | []>([]);
  const [SortModal, setSortModal] = useState(false);
  const [groupPageNumber, _] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const [sortOption, setSortOption] = useState<sortOptionsType[]>([]);
  const pageSize = '20';
  const { data: artistTypeData } = useGetArtistsTypeQuery();
  const { data: groupArtist } = useGetArtistsQuery({
    artistTypeId: '1',
    pageNumber: groupPageNumber.toString(),
    pageSize,
  });
  const [addArtist] = useAddArtistsMutation();
  const [editArtist] = useEditArtistsMutation();
  const editData = useSelector(selectEditArtistSlice);
  const { uploadImageToServer } = useImageProcessing();

  useEffect(() => {
    if (type === 'edit') {
      setArtistType(editData.artistTypeId);
      setGroupId(editData.groupId);
      setArtistName(editData.name);
      editData.groupName && setDropdownText(editData.groupName);
      if (editData.image === '/images/null') {
        setPreviewImage(testImg);
        return;
      }
      setSavedImagefile(editData.image.slice(8));
      setPreviewImage(baseURL + editData.image);
    }
  }, [editData]);

  useEffect(() => {
    if (groupArtist) {
      const groupData = groupArtist.content.map((group) => ({
        sort: group.name,
        id: group.id,
      }));
      setSortOption(groupData);
    }
  }, [groupArtist]);

  useEffect(() => {
    const filteredTypeData = artistTypeData
      ? artistTypeData.filter((data: ArtistType) => data.id !== 1)
      : [];
    setArtistTypeArray(filteredTypeData);
  }, [artistTypeData]);

  const onClickArtistType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistType(parseInt(e.target.value));
  };

  const onChangeArtistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const onChangeArtistImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const imgFile = e.target.files[0];
      setArtistImage(imgFile);
      setPreviewImage(URL.createObjectURL(imgFile));
    }
  };

  const onClickSaveBtnHandler = async () => {
    try {
      setIsRequesting(true);

      if (!artistName) {
        alert('아티스트 이름을 입력해주세요.');
        throw new Error('Invalid Artist name');
      }

      if (!artistImage && !savedImagefile) {
        alert('아티스트 사진을 업로드 해주세요.');
        throw new Error('Invalid Artist Picture');
      }
      const filename = await processImage();

      if (type === 'add') {
        filename && onSaveArtistInfoHandler(filename);
      } else if (type === 'edit') {
        filename && onEditArtistInfoHandler(filename);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  const processImage = async () => {
    if (artistImage) {
      const uploadImage = await uploadImageToServer(artistImage);
      return uploadImage;
    } else if (savedImagefile) {
      return savedImagefile;
    }
  };

  const onSaveArtistInfoHandler = async (filename: string) => {
    try {
      if (!artistName) {
        throw new Error('Invalid name');
      }

      const artistData = {
        artistTypeId: artistType,
        groupId,
        name: artistName,
        image: filename,
      };

      const res = await addArtist(artistData);

      if ('data' in res) {
        alert('아티스트의 정보가 정상적으로 추가되었습니다');
        onClose();
      } else if ('error' in res) {
        handleErrorResponse(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEditArtistInfoHandler = async (filename: string) => {
    try {
      if (!artistName) {
        throw new Error('Invalid artist name');
      }
      const data = {
        artistTypeId: artistType,
        groupId,
        name: artistName,
        image: filename,
      };

      const res = await editArtist({
        artistId: editData.id,
        artistValue: data,
      });

      if ('data' in res) {
        alert('아티스트의 정보가 정상적으로 수정되었습니다');
        onClose();
      } else if ('error' in res) {
        handleErrorResponse(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let content;

  if (artistTypeArray.length > 0) {
    content = artistTypeArray.map((data) => (
      <TypeButton
        key={data.id}
        data={data}
        text={data.type}
        onChange={onClickArtistType}
        selected={data.id === artistType}
      />
    ));
  }

  return (
    <CommonModal className="addGroupModal" onClick={onClose}>
      {isRequesting && <Loading />}
      <ArtistModalTitle>
        아티스트 {type === 'add' ? '등록' : '수정'}하기
      </ArtistModalTitle>
      <ArtistModalCloseButton type="button" onClick={onClose}>
        <img src={closeIcon} />
      </ArtistModalCloseButton>
      <TypeTitle>아티스트 타입을 선택해주세요.</TypeTitle>
      <TypeWrapper>{content}</TypeWrapper>
      <ArtistImageNameWrapper>
        <ArtistImagePreview htmlFor="artistImage" previewimage={previewImage}>
          <img src={photoIcon} alt="아티스트 이미지 선택" />
        </ArtistImagePreview>
        <StyledInput
          type="file"
          id="artistImage"
          accept="image/png, image/jpeg"
          onChange={onChangeArtistImage}
        />
        <ArtistInfoWrapper>
          <GroupSortDropdown
            className="groupSortdrop"
            sortButtonRef={sortButtonRef}
            clicked={SortModal}
            setClicked={setSortModal}
            sortOptions={sortOption}
            selectedText={dropdownText}
            setSelectedText={setDropdownText}
            setId={setGroupId}
          />
          <NameLabel htmlFor="artistName">
            아티스트 이름을 {type === 'add' ? '입력' : '수정'}해 주세요.
          </NameLabel>
          <ArtistNameInput
            type="text"
            id="artistName"
            value={artistName}
            onChange={onChangeArtistName}
            placeholder="아티스트 이름"
          />
        </ArtistInfoWrapper>
      </ArtistImageNameWrapper>
      <ArtistSubmitButton type="button" onClick={onClickSaveBtnHandler}>
        완료
      </ArtistSubmitButton>
    </CommonModal>
  );
};

export default ArtistModal;

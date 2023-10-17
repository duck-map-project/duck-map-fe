import imageCompression from 'browser-image-compression';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import closeIcon from '../../../assets/close.svg';
import photoIcon from '../../../assets/photo.svg';
import Loading from '../../../components/Loading';
import CommonModal, {
  ModalPortal,
} from '../../../components/modal/CommonModal';
import TypeButton from '../../../components/modal/TypeButton';
import { ArtistType } from '../../../types/artistsType';
import { useAddImageMutation } from '../../images/imageSlice';
import { toggleArtist, toggleEditArtist } from '../../manageModalSlice';
import {
  useAddArtistsMutation,
  useGetArtistsQuery,
  useEditArtistsMutation,
} from '../services/artistsSlice';
import { useGetArtistsTypeQuery } from '../services/artistsTypeSlice';
import { selectEditArtistSlice } from '../services/editArtistSlice';

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

type ModalProps = {
  type: 'add' | 'edit';
};
const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const ArtistModal = ({ type }: ModalProps) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
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
  const [artistName, setArtistName] = useState('');
  const [artistTypeArray, setArtistTypeArray] = useState<ArtistType[] | []>([]);
  const [SortModal, setSortModal] = useState(false);
  const [groupPageNumber, _] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const [sortOption, setSortOption] = useState<sortOptionsType[]>([]);
  const pageSize = '20';
  const [addNewImage] = useAddImageMutation({});
  const { data: artistTypeData } = useGetArtistsTypeQuery();
  const { data: groupArtist } = useGetArtistsQuery({
    artistTypeId: '1',
    pageNumber: groupPageNumber.toString(),
    pageSize,
  });
  const [addNewArtist] = useAddArtistsMutation();
  const [editArtist] = useEditArtistsMutation();
  const editData = useSelector(selectEditArtistSlice);

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

  const onHideModal = () => {
    if (type === 'add') {
      dispatch(toggleArtist());
      return;
    }
    dispatch(toggleEditArtist());
  };

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

  // TODO: 리팩토링
  const onClickAddArtistBtn = async () => {
    // 파일도, 프리뷰이미지도(string) 없으면 사진 입력
    if (artistImage === undefined) {
      if (previewImage === undefined) {
        alert('사진은 필수값입니다.');
        return;
      }
    }
    setIsRequesting(true);
    // 파일이 있다면 사진 저장
    if (artistImage) {
      let compressedFile;
      try {
        compressedFile = await imageCompression(artistImage, {
          maxSizeMB: 0.2,
          maxIteration: 30,
        });
      } catch (error) {
        console.error(error);
        setIsRequesting(false);
        return;
      }

      const formData = new FormData();
      compressedFile && formData.append('file', compressedFile);

      try {
        const response = await addNewImage({
          imageFile: formData,
        });

        if ('error' in response) {
          return;
        }
        if (type === 'add') {
          sendArtistInfo(response.data.filename);
        } else if (type === 'edit') {
          editArtistInfo(response.data.filename);
        }
      } catch (error) {
        console.error(error);
      }
      setIsRequesting(false);
      return;
    }

    //파일은 없지만 프리뷰 이미지가 있다면(수정)
    if (type === 'edit') {
      if (previewImage) {
        editArtistInfo(previewImage.slice(8));
        setIsRequesting(false);
      }
    }
  };

  const sendArtistInfo = async (imageData: string) => {
    const artistData = {
      artistTypeId: artistType,
      groupId,
      name: artistName,
      image: imageData,
    };
    try {
      await addNewArtist(artistData);
      onHideModal();
    } catch (error) {
      console.error(error);
      alert('앗, 제대로 저장되지 않았어요 다시 시도해주세요');
    }
  };

  const editArtistInfo = async (imageData: string) => {
    const data = {
      artistTypeId: artistType,
      groupId,
      name: artistName,
      image: imageData,
    };
    try {
      await editArtist({
        artistId: editData.id,
        artistValue: data,
      });
      onHideModal();
    } catch (error) {
      console.error(error);
      alert('앗, 제대로 저장되지 않았어요 다시 시도해주세요');
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
    <ModalPortal>
      <CommonModal className="addGroupModal" onClick={onHideModal}>
        {isRequesting && <Loading text="저장중입니다. 잠시만 기다려주세요!" />}
        <ArtistModalTitle>
          아티스트 {type === 'add' ? '등록' : '수정'}하기
        </ArtistModalTitle>
        <ArtistModalCloseButton type="button" onClick={onHideModal}>
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
        <ArtistSubmitButton type="button" onClick={onClickAddArtistBtn}>
          완료
        </ArtistSubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default ArtistModal;

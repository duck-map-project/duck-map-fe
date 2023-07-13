import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import closeIcon from '../../assets/icons/close.svg';
import photoIcon from '../../assets/icons/photo.svg';
import {
  useAddArtistsMutation,
  useGetArtistsQuery,
} from '../../redux/artistsSlice';
import { useGetArtistsTypeQuery } from '../../redux/artistsTypeSlice';
import { useAddImageMutation } from '../../redux/imageSlice';
import { toggleArtist } from '../../redux/manageModalSlice';
import { artistType } from '../../types/artistsType';

import {
  ModalTitle,
  ModalCloseButton,
  TypeTitle,
  TypeWrapper,
  ImageNameWrapper,
  ImagePreview,
  NameInput,
  NameLabel,
  SubmitButton,
  StyledInput,
  GroupSortDropdown,
} from './AddArtistModalStyle';
import CommonModal from './CommonModal';
import { ModalPortal } from './CommonModal';
import TypeButton from './components/TypeButton';

export type sortOptionsType = {
  sort: string;
  id: number;
};

const AddArtistModal = () => {
  const dispatch = useDispatch();
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  //그룹드롭다운
  const [dropdownText, setDropdownText] = useState<string | null>('그룹');
  //그룹인 경우 선택될 아이디
  const [groupId, setGroupId] = useState<number | null>(null);
  //아티스트의 타입
  const [artistType, setArtistType] = useState(2);
  const [artistImage, setArtistImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [artistName, setArtistName] = useState('');
  const [artistTypeArray, setArtistTypeArray] = useState<artistType[] | []>([]);
  const [SortModal, setSortModal] = useState(false);
  const [groupPageNumber, setGroupPageNumber] = useState(0);
  const [sortOption, setSortOption] = useState<sortOptionsType[]>([]);
  const pageSize = '20';
  const [addNewImage] = useAddImageMutation({});
  const { data: artistTypeData } = useGetArtistsTypeQuery();
  const { data: groupArtist } = useGetArtistsQuery({
    artistTypeId: '1',
    pageNumber: groupPageNumber.toString(),
    pageSize,
  });
  const [addNewArtist] = useAddArtistsMutation({});

  setGroupPageNumber;

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
      ? artistTypeData.filter((data: artistType) => data.id !== 1)
      : [];
    setArtistTypeArray(filteredTypeData);
  }, [artistTypeData]);

  const onHideModal = () => {
    dispatch(toggleArtist());
  };

  const onClickGroupType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistType(parseInt(e.target.value));
  };

  const onChangeArtistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const onChangeArtistImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imgFile = e.target.files[0];
      //파일 size 확인
      if (imgFile.size > 1024 ** 2) {
        alert('앗! 이미지가 너무 커요. 1MB 이하의 사진만 업로드 가능합니다.');
        return;
      }
      setArtistImage(imgFile);
      setPreviewImage(URL.createObjectURL(imgFile));
    }
  };

  const onClickAddArtistBtn = async () => {
    const formData = new FormData();
    if (artistImage instanceof File) {
      formData.append('file', artistImage);
      try {
        const response = await addNewImage({
          imageFile: formData,
        });
        if ('error' in response) {
          return;
        }
        sendArtistInfo(response.data.filename);
      } catch (error) {
        console.error(error);
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

  let content;
  if (artistTypeArray.length > 0) {
    content = artistTypeArray.map((data) => (
      <TypeButton
        key={data.id}
        data={data}
        text={data.type}
        onChange={onClickGroupType}
        selected={data.id === artistType}
      />
    ));
  }

  return (
    <ModalPortal>
      <CommonModal className="addGroupModal" onClick={onHideModal}>
        <ModalTitle>아티스트 등록하기</ModalTitle>
        <ModalCloseButton type="button" onClick={onHideModal}>
          <img src={closeIcon} />
        </ModalCloseButton>
        <TypeTitle>아티스트 타입</TypeTitle>
        <TypeWrapper>{content}</TypeWrapper>
        <ImageNameWrapper>
          <ImagePreview htmlFor="artistImage" previewimage={previewImage}>
            <img src={photoIcon} alt="아티스트 이미지 선택" />
          </ImagePreview>
          <StyledInput
            type="file"
            id="artistImage"
            accept="image/png, image/jpeg"
            onChange={onChangeArtistImage}
          />
          <div>
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
              아티스트 이름을 입력해 주세요.
            </NameLabel>
            <NameInput
              type="text"
              id="artistName"
              value={artistName}
              onChange={onChangeArtistName}
              placeholder="아티스트 이름"
            />
          </div>
        </ImageNameWrapper>
        <SubmitButton type="button" onClick={onClickAddArtistBtn}>
          완료
        </SubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default AddArtistModal;
